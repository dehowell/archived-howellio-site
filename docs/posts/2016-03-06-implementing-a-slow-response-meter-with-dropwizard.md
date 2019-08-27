---
title: "Implementing a Slow Response Meter With Dropwizard"
date: 2016-03-06T15:28:04-05:00
---

We instrument our applications with [Dropwizard Metrics](https://dropwizard.github.io/metrics/3.1.0/)[^1] at [my work](http://dealer.com) and publish our metrics into [Graphite](http://graphite.readthedocs.org/en/latest/). Whenever there are system issues, these metrics (plus application logs) are the principal source of data for tracking down the problem. But they also help us maintain situational awareness of our applications in production from day to day. Dashboards don't replace automated monitoring, but Graphite-backed[^2] information radiators give me an instinct for what normal looks like. There have been times when I caught a production issue in progress because a graph _just didn't look right_.

That all goes out the window if the dashboards raise false alarms. I've seen a lot of dashboards that use response time percentiles averaged across hosts to represent cluster-wide response time, but the results are noisy. Averaged percentiles train people to ignore their dashboards. Sure, the average ninety-ninth percentile spikes when the cluster is slow, but it also spikes when one host has a garbage collection pause (or some other transient issue). Assuming some rudimentary back pressure, a slow server should get fewer requests but will contribute equally to the average of ninety-ninth percentile response times. Even though the majority of customer traffic is handled quickly, one slow server can drag your global response time metric way out of whack!

So what should we do? Baron Schwartz of VividCortex suggests using [_banded metrics_](https://www.vividcortex.com/blog/why-percentiles-dont-work-the-way-you-think), where you pick a series of response time bands and then store the rates of requests that were handled within each band. Perhaps for the hypothetical application the healthy bands are 0-2 ms and 2-5 ms, with unhealthy bands ranging up through a few multiples of 5 ms. Rates can be sensibly added across hosts, so you can compute the global rate of requests handled within 5 ms from all the per-instance metrics.

You could certainly set up a banded metrics like this with Dropwizard, but simply tracking the rate of "slow" responses (those that exceed the healthy upper limit of 5 ms) is easy and nets most of the value from the metric. Set up appropriate metrics and your service threshold:

```java
long SLOW_THRESHOLD = TimeUnit.MILLISECONDS.toNanos(5);
MetricRegistry metrics = new MetricRegistry();
Timer responseTimer = metrics.timer("response");
Meter slowResponseMeter = metrics.meter("slow-response");
```

And then use them for tracking your request handling method:

```java
Timer.Context context = responseTimer.time();

// ... do the work

long duration = context.stop();
if (duration > SLOW_THRESHOLD) {
    slowResponseMeter.mark();
}
```

Even better, wrap this metrics boilerplate in an aspect and configure the threshold with an annotation - now you'll have fewer false alarms with hardly any extra work.

[^1]: Well, many application use an internal metrics library inspired by Dropwizard, but we use both and what I'm going to say here applies to both libraries.
[^2]: By which I mean [Grafana](http://grafana.org). I find Graphite faster for ad-hoc stuff, but it really is an eyesore.
