---
title: "Mike Bostock: \"Towards Reusable Charts\""
source:
  author: Mike Bostock
  url: http://bost.ocks.org/mike/chart/
  title: "Towards Reusable Charts"
---

Bostock describes a simple implementation of a reusable charting function, which itself has getter and setter methods for adjusting its configuration. The user of the charting function would invoke it something like:

```javascript
var chart = timeSeriesChart()
    .x(function(d) { return formatDate.parse(d.date); })
    .y(function(d) { return +d.price; });

var formatDate = d3.time.format("%b %Y");

// ...

d3.csv("sp500.csv", function(data) {
  d3.select("#example")
      .datum(data)
      .call(chart);
});
```

This has the merits of a simple API for the caller, but it still feels a little bit "Excel chart wizard" to me. The article itself ends by asking the question:

> We now have a strawman convention for reusable visualization components. Yet there is far more to cover as to what should be considered configuration or even a chart. Is a traditional chart typology the best choice?

My answer is "no". If I wanted traditional chart types, I wouldn't care about D3 in the first place.
