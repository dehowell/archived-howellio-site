---
title: "Mike Bostock: \"General Update Pattern, I\""
layout: biblio
tags:
  - d3
source:
  author: Mike Bostock
  url: http://bl.ocks.org/mbostock/3808218
  title: "General Update Pattern, I"
---

Bostock explains the different types of selection, using just text elements for a barebones example. D3 binds data to DOM nodes by setting the datum as the `__data__` property of the node. Whenever you call `data(dataset)` on a D3 selection, the provided dataset is matched up with the DOM nodes in the selection. In the example, `text` is the _update selection_.

```javascript
var text = svg.selectAll("text").data(data);
```

A DOM node bound to a datum that is also present in the new dataset supplied here is part of this selection. Any elements in `data` that aren't already bound to the DOM go to `text.enter()`. Elements that were bound to a DOM node, but aren't in `data` are returned in the `text.exit()` selection.
