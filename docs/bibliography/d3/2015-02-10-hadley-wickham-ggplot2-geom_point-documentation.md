---
title: "Hadley Wickham: ggplot2 geom_point documentation"
date: 2015-02-10
source:
  author: Hadley Wickham
  url: http://docs.ggplot2.org/current/geom_point.html
  title: "ggplot2: geom_point documentation"
---

Although `ggplot2` is higher level library (and, *I know*, for R and not the web), there's some conceptual similarity between it and D3 that I think can help illuminate the latter.

The anatomy of a simple scatter plot in ggplot, using R's built-in mtcars sample data set, demonstrates some of the major building blocks:

```r
# Bind the mtcars dataset to the chart.
#
# Maps each element of the dataset to a point,
# using the wt variable for the x position
# and the mpg variable for the y position.

ggplot(mtcars) + geom_point(aes(x = wt, y = mpg))

```

There are also pluggable scales in ggplot, although this example is using
implicit linear scales.


```javascript
svg.selectAll("circle")
    // Bind the mtcars dataset to the SVG.
    .data(mtcars)
    .enter()
        // Represent each observation with a point.
        .append("circle")
        .attr({
            // Use the wt variable for the x position.
            cx: function(d) { return x(d.wt); },
            // And the mpg variable for the y.
            cy: function(d) { return y(d.mpg); }
        });
```

ggplot is higher-level here primarily because it encapsulates the visual options in its `geom_*` function, each of which represents a different layer you can add on to the chart. D3 has no such nicety so that you work directly with DOM nodes and SVG nodes.
