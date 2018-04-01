---
title: "Mike Bostock: \"Margin Convention\""
source:
  author: Mike Bostock
  url: http://bl.ocks.org/mbostock/3019563
  title: "Margin Convention"

---

This article lays out a convention for specifying margins on a D3 graphic that lets you customize them per-side and then mostly ignore them in subsequent calculations - at least if you're working with SVG, where you can wrap the entire plot in a `<g>` and have that handle the margins for you:

```javascript
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
```
