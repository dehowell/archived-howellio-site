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

There are dozens of failure modes that could affect a single application: What if the database is down, the network is slow, that queue is backed up, or a disk is full? A developer anticipating these errors writes code that fails safely, but their main goal is new features in production. When the dozens of possible failure modes a developer sees in a day are rare, extra effort toward safety feels like paranoia.

Distributed systems break because small failures cascade. Paranoia is justified. Chaos Monkey creates immediate consequences from ignored failure modes, making appropriate paranoia a social norm.

The insight behind Chaos Monkey has grown outside of Netflix into [an entire discipline called **chaos engineering**](http://principlesofchaos.org/?lang=ENcontent). A steady stream of predictable and safe failures builds an immune system against catastrophic systemic failures.

## Chaos Engineering My Calendar

I've been running my first custom version of Chaos Monkey at home for the last six years. His name is Graham.

I was afraid parenting would make it hard to keep up with basic self-care, let alone maintain other aspirations. I was wrong. The time constraints make everything feel harder, but when zooming out shows that I've made more progress on good habits and personal goals since my kids were born than in the previous child-free decade.

The steady stream of turbulent conditions my children provide prevent me from getting away with bad habits. I go to bed earlier, knowing I might be woken up in the middle of the night. I need to maintain my composure in the face of tantrums, so I've gotten better at regulating my emotions. Less free time means I set smaller goals, and steady progress adds up.

The most Chaos Monkey-like effect of all is in how I plan my time. Little kids are sick a _lot_ -- that's how you bootstrap an immune system, after all. Hardly a month goes by where we don't have at least one week of someone being sick. Instead of terminating a random server in my data center, viruses cut random days out of my calendar.

I hate missing commitments I've made, but that used to be my norm. Excitement about my projects led to planning more than I could really accomplish. Now, having been burned too many times by losing a critical workday caring for a sick kid, my prep for the week isn't done until I've played out the consequences of possible sick days in my head.

What has to get done first, as insurance? What could be delegated? What nice-to-have is going to be the crumple zone in my to-do list? I'm far from perfect, but certainly more reliable than I was before having kids.

I don't actually recommend fatherhood for its life hack value. But sometimes, I need to remind myself that being a dad isn't a zero sum game against the rest of my identity.
