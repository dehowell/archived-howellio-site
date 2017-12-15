---
title: "Mike Bostock: \"Let's Make a Bar Chart, II\""
layout: biblio
tags:
  - d3
date: 2015-02-09 20:10:00
source:
  author: Mike Bostock
  url: http://bost.ocks.org/mike/bar/2/
  title: "Let's Make a Bar Chart, II"
---

On to part two, which introduces basic SVG, loading data from external files,
and data structured as an array of objects instead of just an array of values.
Bostock also introduces the use of a `<g>` tag to wrap multiple visual elements
that need to be positioned together. But this is a little bit of a subtle
technique, because it involves positioning the group relative to the SVG and
then positioning its children _relative to the `<g>` tag_.

In the previous "Let's Make a Bar Chart", Bostock didn't save a reference to the
enter selection where he added the `<div>` bars. In the SVG example, he starts
with the `<g>` and saves the selection of all these elements, positioned along
the y-axis according to their order in the data set.

```javascript
var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) {
        return "translate(0," + i * barHeight + ")";
    });
```

The `bar` variable now references the selection of `<g>` nodes. Each new chain
off this selection can add a new child element to each `<g>`, inheriting the
same datum as its parent.

```javascript
bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
```
