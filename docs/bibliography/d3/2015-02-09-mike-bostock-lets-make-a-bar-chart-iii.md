---
title: "Mike Bostock: \"Let's Make a Bar Chart, III\""
date: 2015-02-09 20:20:00
source:
  author: Mike Bostock
  url: http://bost.ocks.org/mike/bar/3/
  title: "Let's Make a Bar Chart, III"
---

Part three of the bar chart tutorial introduces **ordinal scales**. In an ordinal scale, the input data set takes one of a discrete set of values. Unless we're mapping an ordinal variable to colors, the geometric parameters of SVG elements need to be numerical. Setting up an ordinal scale is more involved than a linear scale because there are simply more ways you might want to map a single value to a range of numbers.

You can either be completely explicit:

```javascript
var x = d3.scale.ordinal()
    .domain(["A", "B", "C", "D", "E", "F"])
    .range([0, 1, 2, 3, 4, 5]);
```

Or use `rangeBands` or `rangePoints` to generate the output values for you from a provided range. Bostock describes the differences between these:

> The rangeBands method computes range values so as to divide the chart area into evenly-spaced, evenly-sized bands, as in a bar chart. The similar rangePoints method computes evenly-spaced range values as in a scatterplot.

Each of these methods has a corresponding rounded version, which forces the values to be nearest integers for the sake of pixel-kindness. Using these to try and understand the difference between bands and points:

```javascript
var data = ["A", "B", "C", "D", "E", "F"],
    scale = d3.scale.ordinal() .domain(data);

_.map(data, scale.rangeRoundBands([0, 100])  // => [2, 18, 34, 50, 66, 82]
_.map(data, scale.rangeRoundPoints([0, 100]) // => [0, 20, 40, 60, 80, 100]
```


It really does come down to bands requiring some width, so the range is subdivided into evenly-spaced regions. Points are assumed to not have width, so the start and of the range can themselves be used for positioning data.

Part three also introduces axes, a convention for handling margins, and gives a hat tip to the `ggplot` library for R.
