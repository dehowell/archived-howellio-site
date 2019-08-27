---
title: "How to Build a Low-tech Internet"
date: 2016-01-18T20:35:55-05:00
---

If you enjoyed Maciej Ceglowski's ["Website Obesity Crisis"][1], you'll want to read Low-Tech Magazine's [article on building a decentralized low-tech network][2]. Low-power Wi-Fi routers and cleverness can go a long way, especially if we're parsimonious with our design.

> Nevertheless, even in such conditions, the internet could work perfectly fine. The technical issues can be solved by moving away from the always-on model of traditional networks, and instead design networks based upon asynchronous communication and intermittent connectivity. These so-called "delay-tolerant networks" (DTNs) have their own specialized protocols overlayed on top of the lower protocols and do not utilize TCP. They overcome the problems of intermittent connectivity and long delays by using store-and-forward message switching.
>
> Information is forwarded from a storage place on one node to a storage place on another node, along a path that eventually reaches its destination. In contrast to traditional internet routers, which only store incoming packets for a few milliseconds on memory chips, the nodes of a delay-tolerant network have persistent storage (such as hard disks) that can hold information indefinitely.

We assume that ever closer to real time is the only reasonable direction to take our networks, but an email that takes a few hours to arrive is still faster than the physical post - and it would also probably be better for both peace of mind and productivity than real time messaging.

I remember the nineties. Going back to only getting email once per day sounds peaceful[^1].

[1]: http://idlewords.com/talks/website_obesity.htm
[2]: http://www.lowtechmagazine.com/2015/10/how-to-build-a-low-tech-internet.html

[^1]: Although it's easy to say that from the privileged position of 20 Mbps down and 5 Mbps up.
