---
title: "Chaos Engineering for Personal Productivity"
date: "2019-10-05 09:39:00"
---

Michael sat down at his desk, pulled out his new phone, and turned to me with a grin. I work in software; gadget love among my peers isn't unusual. But this phone was a chunky, off-brand Android--hardly the latest and greatest.

Over the weekend, Michael's three-year old had thrown his iPhone in the toilet. He was in no mood to pay out of pocket for a straight-up replacement and resolved instead to make do with the cheapest phone he could find. 

Choosing a different platform forced Michael to rebuild his todo list (and other tools he relied on) from scratch. When I saw him Monday, he was liberated, fresh out at sea and scraped free of barnacles.

"Children," he said, "are chaos monkey for lifehacking."

## Meet Chaos Monkey

[Chaos Monkey is an open-source application](https://github.com/Netflix/chaosmonkey) developed at Netflix. From the project README:

> Chaos Monkey randomly terminates virtual machine instances and containers that run inside of your production environment. Exposing engineers to failures more frequently incentivizes them to build resilient services.

There are dozens of failure modes that could affect a single application: What if the database is down, the network is slow, that queue is backed up, or a disk is full? A developer anticipating these errors writes code that  fails safely, but their main goal is new features in production. When the dozens of possible failure modes a developer sees in a day are rare, extra effort toward safety feels like paranoia. 

Distributed systems break because small failures cascade. Paranoia is justified. Chaos Monkey creates immediate consequences from ignored failure modes, making appropriate paranoia a social norm.

The insight behind Chaos Monkey has grown outside of Netflix into [an entire discipline called **chaos engineering**](http://principlesofchaos.org/?lang=ENcontent). A steady stream of predictable and safe failures builds an immune system against catastrophic systemic failures.

## Chaos Engineering My Calendar

I've been running my first custom version of Chaos Monkey at home for the last six years. His name is Graham.

I was afraid parenting would make it hard to keep up with basic self-care, let alone maintain other aspiration. The time constraints make everything feel harder, but when I zoom out and reflect on these years, those fears were wrong. I've made more progress on good habits and personal goals since my kids were born than in the previous child-free decade.

My children provide a steady stream of turbulent conditions that prevents me from getting away with bad habits. I go to bed earlier, knowing I might be woken up in the middle of the night. When a kid has a tantrum I need to maintain my compusure, so I've to be better at regulating my emotions. Less free time means I have to set small goals. Over time, that beats inconsisent action toward more ambitious goals.

The most Chaos Monkey-like effect of all is in how I plan my time. Little kids are sick a _lot_ -- that's how you bootstrap an immune system, after all. Hardly a month goes by where we don't have at least one week of someone being sick. Instead of terminating a random server in my data center, viruses cut random days out of my calendar.

I don't like feeling behind and I hate missing my committments, but that used to be the norm. I'd get excited about all the things I wanted to do and plan way too much in my week. Now, I've been burned too many times on losing a critical day in my plan while caring for a sick kid. Planning my week isn't done until I've imagined day-by-day what happens if I have to cancel everything. I commit to less, but do my damnedest to get the important things done. And I'm far from perfect, of course, but I'm more reliable than I was before I had kids.

Obviously, I'm not recommending fatherhood as some kind of productivity life hack. But sometimes I need to remind myself that being a dad isn't quite so zero sum with the rest of my life as it can seem. My dear catastrophes have made who I am now as much as any other experience I've had.