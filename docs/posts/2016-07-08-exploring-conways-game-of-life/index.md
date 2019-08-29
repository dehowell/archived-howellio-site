---
title: Exploring Conway's Game of Life
date: 2016-07-08T20:39:56-04:00
tags:
  - favorite
---

<style>
img {
  margin-left: auto;
  margin-right: auto;
}

.gallery li {
  display: inline-block;
}

.gallery figure {
  text-align: center;
  font-size: medium;
}

.gallery img { margin-bottom: 0; width: 100px; }
</style>

Three computers held sway over my brothers and I during my childhood: the Commodore 64 and its games, spread across dozens of 5 &frac14; inch floppy disks; the IBM XT and the short stories I wrote in WordPerfect; and the king of them all -- the Intel 386 running DOS 5. Aside from newer games with insanely cool graphics[^1], the 386 brought [QBasic](https://en.wikipedia.org/wiki/QBasic) and a C compiler into our lives. From that point on, instead of [Ultima IV](https://en.wikipedia.org/wiki/Ultima_IV%3A_Quest_of_the_Avatar), I watched fractals, cellular automata, and homegrown computer games develop -- all from my perch behind the computer chair, watching over my brothers' shoulders[^2].

Every few years, something reminds me of cellular automata and my fascination starts all over again[^3]. A few weeks ago, reading about common patterns and problems in [Go](https://en.wikipedia.org/wiki/Go_(game)) reminded me of structures that show up in [John Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) -- especially the "Crane In the Nest":

![](crane.gif)

The similarity may not be a coincidence: according to [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), some of the early Game of Life explorations were conducted using just graph paper and Go boards.

A _cellular automaton_ is a simple simulated universe, where time moves forward in discrete steps and space is a lattice of [finite-state machines](https://en.wikipedia.org/wiki/Finite-state_machine)[^4]. In two state automaton (like Conway's Game of Life), each cell in the lattice can be alive or dead. The state of a cell at the next moment is determined by the states of its neighbors _now_. The rules for the Game of Life are:

1. A dead cell comes to life if three neighbors were alive.
2. A live cell survives if either two or three neighbors were alive.
3. A live cell dies if it has fewer than two live neighbors or greater than three live neighbors.

Some structures are stable and static:

<ul class="gallery">
  <li>
    <figure>
      <img src="block.png" alt="Block">
      <figcaption>Block</figcaption>
    </figure>
  </li>
  <li>
    <figure>
      <img src="boat.png" alt="Boat"/>
      <figcaption>Boat</figcaption>
    </figure>
  </li>
  <li>
    <figure>
      <img src="beehive.png" alt="Beehive"/>
      <figcaption>Beehive</figcaption>
    </figure>
  </li>
</ul>

Other structures are stable, but oscillate:

<ul class="gallery">
  <li>
    <figure>
      <img src="blinker.gif" alt="Blinker"/>
      <figcaption>Blinker</figcaption>
    </figure>
  </li>
  <li>
    <figure>
      <img src="toad.gif" alt="Toad"/>
      <figcaption>Toad</figcaption>
    </figure>
  </li>
  <li>
    <figure>
      <img src="beacon.gif" alt="Beacon"/>
      <figcaption>Beacon</figcaption>
    </figure>
  </li>
</ul>

And then there's the glider, a stable pattern that _moves_ across the lattice.

![](glider_motion_labeled.svg)

The three rules of the Game of Life are enough to send this little buddy exploring!

![](glider.gif)

Forty-six years after its introduction, Conway's Game of Life still has fans. [ConwayLife.com](http://www.conwaylife.com) and its associated [wiki](http://www.conwaylife.com/wiki/Main_Page) catalogue newly discovered patterns and variations. There are other shapes like the glider -- the "spaceships" -- which move across the field. There are [glider guns](http://www.conwaylife.com/wiki/Gun): oscillating structures which periodically emit new gliders. As of July 8th, there are over **eight hundred** patterns in the wiki and the [most recent pattern](http://conwaylife.com/wiki/Rich%27s_p16 "Rich's p16") was discovered just [this week](https://mathematrec.wordpress.com/2016/07/05/richs-p16/)! Among the patterns, there's even a [universal Turing machine](http://rendell-attic.org/gol/utm/index.htm)[^5]. With enough patience, you could simulate Conway's Game of Life inside Conway's Game of Life by encoding it in the initial state of the universal Turing machine pattern. Once you're at it, why not encode the Game of Life in _that_ simulation?

![](conway_turing_inception.jpg)

The beautiful thing about all these patterns is that they are _consequences_ of the rules, but they are not _in_ the rules. Inertia isn't in the rules, yet something _like_ inertia seems to drive the glider inexorably in the direction that it faces. The more complex patterns -- the so-called "engineered" patterns -- have to be hand-crafted, but the simplest arise from most initial conditions. Watch how blocks, oscillators, and gliders all show up when I seed Life with a bunch of scribbles[^6]:

<iframe src="https://player.vimeo.com/video/172388824" width="640" height="522" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/172388824">Game of Life Scribbles</a> from <a href="https://vimeo.com/user431878">David Howell</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

Think about the origins of life, in all its complexity. How did we get here, from a nuclear oven shining on a wet rock hurtling through space? The Game of Life on its own isn't quite rich enough for RNA and one-celled organisms to emerge from a prebiotic soup, but the comparison is tempting -- it is in the name, after all. Manuel DeLanda has a great explanation of the combinatoric inevitability of these structures in [_Philosophy and Simulation: The Emergence of Synthetic Reason_](https://www.goodreads.com/book/show/10393464-philosophy-and-simulation):

> Blocks, blinkers, and gliders are referred to as "natural" patterns because when one starts a Life session with a random population of live and dead cells these three patterns (and other simple ones) emerge spontaneously. This spontaneity is explained both by the fact that the patterns are small -- patterns made out of a few live cells have a higher probability of occurring than large ones -- and by the fact that they can arise following several sequences of predecessor patterns: the more numerous the sequences converging on a pattern the higher likelihood that one of them will occur by chance.

The Game of Life is the superstar among cellular automata, but even the simplest cellular automata can generate strange and unexpected behavior. Elementary cellular automata -- which are similar to Conway's Game of Life, but one-dimensional -- make for a good toy language-learning problem. In an upcoming post, I'll share my recent implementation in [Elixir](http://elixir-lang.org) and show some examples of the structures that result.

[^1]:	Two-hundred and _fifty-six_ colors!

[^2]:	To be honest, I was mostly waiting for my turn with the PC so I could play [Commander Keen](https://en.wikipedia.org/wiki/Commander_Keen) and [Secret Agent](https://en.wikipedia.org/wiki/Secret_Agent_(video_game))... I didn't really get into math and programming until years later.

[^3]:	Likewise, at least once a year I remember that [colossal squid](https://en.wikipedia.org/wiki/Colossal_squid) are a thing and that the bottom of the ocean is a vast and mysterious place. There's some kind of Wikipedia page playlist on repeat in my life...

[^4]:	A finite-state machine is a system with a finite number of well-defined states, which can transition between them only according to particular rules.

[^5]:	A universal Turing machine is effectively a _programmable computer_. Any computation that can be performed on the device you're using to read this could also be performed in any other Universal Turing Machine -- although much slower and with a lot of tedious work to read the results.

[^6]:	I recorded this using [Golly](http://golly.sourceforge.net), a great open-source Game of Life implementation.
