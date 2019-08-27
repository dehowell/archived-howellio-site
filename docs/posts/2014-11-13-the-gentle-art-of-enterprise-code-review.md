---
title: "The Gentle Art of Enterprise Code Review"
date: 2014-11-13
---

Sage Sharp, [The Gentle Art of Patch Review][ref1]:

> [&hellip;] I propose a three-phase review process for maintainers:
>
> 1. Is the idea behind the contribution sound?
> 2. Is the contribution architected correctly?
> 3. Is the contribution polished?
>
> You can compare these contribution review phases to the phases of building a new house or taking on a remodeling project. The first phase is a simple yes or no on the architectural diagram, the big idea of the contribution. The second phase is getting all the structural issues correct and making sure the plumbing and electrical all connect properly. The third phase is making everything polished, sanding off the rough corners, and slapping on a coat of paint to match whatever color the bike shed is currently painted.

Code review at its best has been one of the best avenues I've found for my own learning, from both the feedback to my own code and seeing how other developers articulate their thought process.

Reviewers may not feel empowered to question the idea of the contribution or radically challenge the architecture when reviewing code in a business context. Any work done is likely to be a dependency for some business commitment and no one wants delays in their schedule. Nitpicking polish is easy; but doing so without raising architectural concerns undermines the value of code reviews without helping quality. I think the three phase feedback approach probably still makes sense within The Enterprise&trade;, with slight modifications:

1. Does the contribution represent a reasonable solution to the business problem, following the standards of your company's architecture?
2. Will the code scale appropriately, handle errors sanely, and does it follow the relevant architecture standards?
3. Is the code polished?

Resolving issues found in phase one or phase two requires courage on the part of the reviewer: you have to be willing to challenge stakeholders' schedules and speak their language. Software can fix style issues for you. It takes a human to do the hard stuff.

But once you get the architecture ironed out, please do push for more semantic naming. It really does make life easier in long run!

[ref1]: http://sage.thesharps.us/2014/09/01/the-gentle-art-of-patch-review/
