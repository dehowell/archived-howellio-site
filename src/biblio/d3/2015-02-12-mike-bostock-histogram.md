---
title: "Mike Bostock: \"Histogram\""
layout: biblio
tags:
  - d3
source:
  author: Mike Bostock
  url: http://bl.ocks.org/mbostock/3048450
  title: "Histogram"
---

D3 provides several "layout" objects, each of which restructures a data set to match the requirements of a particular presentation style. The first of these I've tried to wrap my head around is the histogram, which groups a flat data set into bins. Although the [documentation][11a] describes the resulting structure, I had to see it for myself in the console to wrap my head around what to do with the result.

I find adapting D3 examples to my own needs sometimes tricky and Bostock's own histogram example has a gotcha in it that I stumbled over. When he sets the width of the bars, he uses the x scale to translate it into pixels.

```javascript
bar.append("rect")
    .attr("x", 1)
    .attr("width", x(data[0].dx) - 1)
    .attr("height", function(d) { return height - y(d.y); });
```

That makes sense - the `dx` property on the bin is in units of the data set and needs to translated into pixels, right? When I tried this out on my own data (weight measurements collected from a wireless scale), the width came out as a negative number. A *really* negative number. The sample above contains a little shortcut - because the domain of the x scale starts at 0, it can be used to translate a difference in the data into a difference in pixels. But the domain of my weight data started well above zero, so any number less than the lower bound on my data (like the width of the bins) therefore comes out negative. My solution was to offset the width by the lower end of the domain on the scale first:

```javascript
bar.append("rect")
    .attr("x", 1)
    .attr("width", x(data[0].dx + x.domain()[0]) - 1)
    .attr("height", function(d) { return height - y(d.y); });
```

Yes, the x coordinate of the bar is a constant. That works here because Bostock wraps the bar and a text label in a `<g>` tag and then positions the group. Everything within can be relatively positioned.

```javascript
var bar = svg.selectAll(".bar")
    .data(data)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
```


[11a]: https://github.com/mbostock/d3/wiki/Histogram-Layout#_histogram "Histogram Layout"
