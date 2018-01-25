---
layout: post
title: "The Robots Will Find You"
date: "2016-12-07 06:11:37 -0500"
---

This morning, I started a new web server at a previously unused domain. Google and Bing crawlers found and started crawling it **within an hour**. Shortly after, the Wordpress attacks started.

<!-- break -->

```
198.1.74.103 - - [07/Dec/2016:11:06:53 +0000] "GET /news/wp-login.php HTTP/1.1" 404 178 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```

I'm not running anything but NGINX serving static files, but let this be a lesson. Never, ever think that you can run your own Wordpress server (or anything else) and not care about security. Robots will find you and start trying exploits, almost as soon as you've finished setup.


The DNS entry for the site is about twelve hours old&mdash;I wonder if that's how word got out that my new domain popped up.
