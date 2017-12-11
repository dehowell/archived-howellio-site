---
layout: post
title: "Event Source Yourself a Hash Map"
date: 2016-09-12T19:15:30-04:00
tags:
  - favorite
---

[Event sourcing][5] is an architectural pattern where you persist _commands_ to mutate your data instead of overwriting the old values. Readers are responsible for building their own _view_ of the data from the sequence of edits.

This sounds cool, but I haven't implemented a system with event sourcing yet. I started hearing the term tossed around a few years ago, alongside some other buzzwords that sound exciting like "actors systems", "domain-driven design", and "CQRS".

We software developers sure love our acronyms! That last one is ["command query responsibility segregation"][6]. It means that a system should accept _commands_ (which can make changes but provide no feedback) or _queries_ (which return data but don't change anything), but there should be no way to combine a request for data with changes to state.

CQRS has its origins in old-school object-oriented programming, but it's having a hipster resurgence as a distributed architectural pattern. In its modern incarnation, a CQRS system is likely to use different data stores for serving commands and queries. Writes go to the datastore of record (something like MySQL) and reads go to some derived view (perhaps a full-text search index like Solr). Background processing of some kind keeps the view up-to-date with the source of record. In 2007[^1], it was all the rage to do everything in MySQL until your app can't scale anymore, then denormalize to various NoSQL stores in a panic. Now that the pattern has an acronym, we can calmly design towards it!

Event sourcing fits right in with CQRS because instead of mutating the current state-of-the-world, you can just persist the change commands directly to a _changelog_. Once the changelog is your source of record, there's no privileged view, just multiple consuming views that know how to rebuild themselves from history. You have freedom to easily change how you represent your data, since each view can do so independently. Event sourcing also gives you a _time machine_ -- you can just replay the changelog and stop early to see what your views looked like yesterday.

I started hearing about all of this a lot more this past year, in the context of [Apache Kafka][4] -- which is billed explicitly as a distributed changelog. We're already using Kafka at Dealer.com for analytics-style event stream processing[^2], but my team has recently started exploring Kafka as a way to synchronize application data.

We have an application which needs to respond to HTTP requests _very quickly_. Not stock exchange fast, but ad exchange fast -- less than 100 milliseconds. In that time frame, you can't reliably do a whole lot with database queries or service calls. In the past, we've kept a lot of application data in memory and then polled the database to bring it up-to-date. There are a lot of reasons that this sucks (which I won't go into here).

So we're starting a new feature -- we're going to add blacklist functionality to this application, which will let us quickly reject requests that come from IP ranges with suspicious activity. The blacklist needs to be in memory (for low-latency access) and we want updates to get picked up fast. Instead of following our tried-and-sort-of-true pattern (that none of us like), we're going to take a swing at sharing this data with event sourcing and Kafka.

That sounded good to me in theory, but it wasn't until today that I started _really_ thinking about how to do it. Building the in-memory blacklist from the commands seemed straightforward, but I wasn't sure how we'd get around replaying the entire history of edit commands on every application start-up. A little Googling for "kafka event sourcing" brought me to an article on the Confluent blog about Kafka Streams[9] that set me straight.

A Kafka topic is a strictly-ordered sequence of key-value pairs. I was thinking that we would store edits to the blacklist as timestamp-keyed commands on a topic, which will be consumed by all the applications that need the blacklist.

| message # | key (time)          | value (command)           |
|-----------|---------------------|---------------------------|
| 0         | 2016-09-12 15:32:00 | `BLACKLIST 10.0.0.0/24`   |
| 1         | 2016-09-12 16:01:13 | `WHITELIST 10.0.0.100/32` |


When the application pulls message 0, it parses the blacklist command and adds the whole range from `10.0.0.1` to `10.0.0.255`. Message 1 causes it to split that range into two, leaving `10.0.0.100` as a gap in the middle. This topic has the semantics of a stream of events, but -- according to [Jay Kreps][9] -- a stream can always be viewed as a table (or a series of tables at different moments in time). This has to be true, because an event-sourcing application is using the change events to build its view. That view is at least conceptually a table, though it may be backed by all kinds of data structures[^3].

But here was my revelation from this morning, once I got what Kafka Streams article was saying. **You can cache the view in another topic.**

My first exposure to messaging was RabbitMQ, where applications deal with _queues_. I had gotten so hung up on the queue model for messaging that I was forgetting that a Kafka topic is a _transaction log_, not a queue. The keys don't need to be timestamps. Whenever the blacklist is edited, we can publish the changed records to another topic. In order to handle this topic with table-like semantics, we just take the highest numbered message for a key as the truth.

| message # | key (start IP) | value (end IP) |
|-----------|----------------|----------------|
| 0         | `10.0.0.1`     | `10.0.0.255`   |
| 1         | `10.0.0.1`     | `10.0.0.99`    |
| 2         | `10.0.0.101`   | `10.0.0.255`   |

On this topic, message 0 isn't relevant any more because it's been superseded by message 1. Even though this topic might end up with more messages than the original stream, many of them can be safely deleted (which Kafka supports via [log compaction][10]). The application should be able to bootstrap from this table-like topic efficiently, then stay up to date by following the stream.

We haven't implemented this yet, so I'm not sure if it's going to work. There are probably thorny details that we'll find out about the hard way, but it feels promising.

----

Julia Evans [wrote a thing][3] about why she blogs about new things as she learns them, rather than waiting until she's an expert.

> When I started doing this I discovered a really surprising thing. At the time I was writing blog posts every day about what I'd learned that day.
>
> And even though I was a beginner to both Rust and operating systems development, it turned out that some of these blog posts were really popular! People were learning from them!

So in that spirit, I thought I'd share. Besides, today is an [eep day][1] for my Beeminder goal to [blog more][2]. It was this or cough up $10!

[^1]:
    I remember this coming up a lot on [Hacker News][7] that year.

[^2]:
    My friend Josh Dickerson is talking more about [how we use Kafka][8] at VT Code Camp this year.

[^3]:
    We're using a [Scala TreeMap](http://www.scala-lang.org/api/2.11.8/#scala.collection.immutable.TreeMap) to store the blacklist.

[1]: http://blog.beeminder.com/glossary/#e
[2]: https://www.beeminder.com/dehowell/publish
[3]: http://jvns.ca/blog/2016/09/11/rustconf-keynote/
[4]: http://kafka.apache.org
[5]: http://www.martinfowler.com/eaaDev/EventSourcing.html
[6]: https://en.wikipedia.org/wiki/Command–query_separation
[7]: https://news.ycombinator.com
[8]: http://vtcodecamp.org/2016/sessions#persistent-distributed-messaging-with-apache-kafka
[9]: http://www.confluent.io/blog/introducing-kafka-streams-stream-processing-made-simple/
[10]: http://kafka.apache.org/documentation.html#compaction
