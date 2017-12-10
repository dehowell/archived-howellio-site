---
title: "Mike Bostock: \"General Update Pattern, II\""
layout: biblio
tags:
  - d3
source:
  author: Mike Bostock
  url: http://bl.ocks.org/mbostock/3808221
  title: "General Update Pattern, II"
---

When updating a selection with new data, D3 uses a _key function_ provided with the data set to match up elements of the data set with the elements in the DOM to compute the update, enter, and exit selections.

I cloned the  [gist][7a] for this article and modified the text selection to key by index (the default behavior) to see how things break.

```diff
   var text = svg.selectAll("text")
-    .data(data, function(d) { return d; });
+    .data(data);
```

With this change, an element is included in the update selection only if the new dataset also has an element in that position. Letters of the alphabet are duplicated, along with other weird effects. It's worth [looking at][7b] with the console open to get a better feel.

[7a]: https://gist.github.com/mbostock/3808221
[7b]: http://bl.ocks.org/dehowell/e255bbd54897577b180e
