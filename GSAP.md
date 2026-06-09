# GSAP — GreenSock Animation Platform

## What is GSAP?

GSAP stands for GreenSock Animation Platform.

GSAP is a JavaScript animation library that animates anything JavaScript can touch — DOM elements, SVG, canvas, WebGL, React state, plain objects — with precise timing control and consistent cross-browser behavior.

Instead of manually writing complex CSS animations and keyframes, GSAP lets you animate anything with JavaScript

**Core strengths:**

- Animate any numeric property on any object
- Timeline sequencing for complex, multi-step animations
- ScrollTrigger for scroll-linked and scroll-triggered animations
- Extremely performant (uses `requestAnimationFrame`, avoids layout thrash)
- Works with any framework or no framework

---

## Setup

GSAP and `@gsap/react` are already installed. Register plugins once at the module level:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
```

> Always call `registerPlugin` before any tween that uses the plugin. Safe to call multiple times.

---

## Core Concepts

### Tween

A **tween** is a single animation from point A to point B. GSAP's three tween methods:

| Method                                  | What it does                                            |
| --------------------------------------- | ------------------------------------------------------- |
| `gsap.to(target, vars)`                 | Animate **to** the given values (start = current state) |
| `gsap.from(target, vars)`               | Animate **from** the given values (end = current state) |
| `gsap.fromTo(target, fromVars, toVars)` | Explicit start and end — no hidden state                |

**Always prefer `fromTo`** — `from` relies on the element's current CSS state, which can cause flash-of-content on page load or when re-triggering.

```ts
// to — animate to x:100 from wherever it currently is
gsap.to(".box", { x: 100, duration: 1 });

// from — animate from y:100 to wherever it currently is
gsap.from(".box", { y: 100, opacity: 0, duration: 1 });

// fromTo — explicit, predictable, preferred
gsap.fromTo(
  ".box",
  { y: 100, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
);
```

### Timeline

A **timeline** is a container for sequencing multiple tweens. Tweens added to a timeline play one after another by default.

```ts
const tl = gsap.timeline();

tl.fromTo(".title", { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
  .fromTo(
    ".subtitle",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
  )
  .fromTo(".btn", { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out" });
```

### Target types

GSAP accepts any of these as a target:

```ts
gsap.to(".class", ...)          // CSS selector string
gsap.to(element, ...)           // DOM element ref
gsap.to([el1, el2], ...)        // Array of elements
gsap.to(ref.current, ...)       // React ref
gsap.to({ value: 0 }, ...)      // Plain object (animate any numeric property)
```

---

## Tween Properties (vars)

### Timing

```ts
gsap.to(".box", {
  x: 100,
  duration: 1, // seconds (default 0.5)
  delay: 0.5, // wait before starting
  ease: "power2.out", // easing function
});
```

### Repeat & Yoyo

```ts
gsap.to(".box", {
  x: 100,
  duration: 1,
  repeat: 3, // play 3 more times (total 4 plays). -1 = infinite
  repeatDelay: 0.5, // pause between repeats
  yoyo: true, // reverse direction each repeat
});
```

### Callbacks

```ts
gsap.to(".box", {
  x: 100,
  onStart: () => console.log("started"),
  onUpdate: () => console.log("updating"),
  onComplete: () => console.log("done"),
  onRepeat: () => console.log("repeating"),
  onReverseComplete: () => console.log("reversed to start"),
});
```

### Stagger — animate multiple elements with offset

```ts
// Simple stagger
gsap.from(".card", { y: 50, opacity: 0, stagger: 0.1 });

// Advanced stagger
gsap.from(".card", {
  y: 50,
  opacity: 0,
  stagger: {
    amount: 0.6, // total stagger time spread across all elements
    from: "center", // "start" | "center" | "end" | "edges" | "random" | index
    ease: "power1.in",
    grid: "auto", // for grid layouts — [rows, cols] or "auto"
    axis: "y", // stagger along x or y axis only (for grids)
  },
});
```

### Other tween vars

```ts
gsap.to(".box", {
  x: 100,
  paused: true, // create without playing
  overwrite: "auto", // kill conflicting tweens on same target: true | false | "auto"
  immediateRender: false, // don't apply start values immediately
  id: "myTween", // assign an id to retrieve it later
  keyframes: [
    // animate through multiple states
    { x: 100, duration: 0.5 },
    { y: 50, duration: 0.5 },
    { opacity: 0, duration: 0.3 },
  ],
});
```

---

## Eases

GSAP includes a full library of easing functions:

```
none / linear

power1.in / power1.out / power1.inOut
power2.in / power2.out / power2.inOut    ← good default
power3.in / power3.out / power3.inOut
power4.in / power4.out / power4.inOut

back.in / back.out / back.inOut          ← slight overshoot
bounce.in / bounce.out / bounce.inOut
circ.in / circ.out / circ.inOut
elastic.in / elastic.out / elastic.inOut
expo.in / expo.out / expo.inOut
sine.in / sine.out / sine.inOut
```

**Variants:**

- `.in` — slow start, fast end
- `.out` — fast start, slow end (most natural for appearing elements)
- `.inOut` — slow start and end

```ts
// Custom ease
gsap.registerEase("myEase", (progress) => progress * progress);
gsap.to(".box", { x: 100, ease: "myEase" });
```

---

## Animation Control Methods

Every tween and timeline shares these control methods:

```ts
const anim = gsap.to(".box", { x: 100, paused: true });

anim.play(); // play forward from current position
anim.play(0); // play from time 0
anim.pause(); // pause at current position
anim.pause(0.5); // pause at 0.5s
anim.resume(); // continue in current direction
anim.reverse(); // play backward
anim.restart(); // jump to start and play forward
anim.restart(true); // restart including delay
anim.seek(1.5); // jump to 1.5s without playing
anim.kill(); // stop, remove, allow garbage collection
anim.revert(); // stop and remove all applied inline styles

// Getters/setters
anim.progress(); // get 0–1
anim.progress(0.5); // set to halfway
anim.time(); // get current time in seconds
anim.time(1); // set current time
anim.duration(); // get duration
anim.timeScale(); // get speed multiplier
anim.timeScale(2); // run at 2× speed
anim.paused(); // get paused state (boolean)
anim.reversed(); // get reversed state (boolean)
anim.isActive(); // true if actively animating right now

// Promise support
await anim.then(); // resolves when animation completes
```

---

## Paused Animations (manual control)

Create paused animations and control them explicitly with callbacks:

```ts
const anim = gsap.fromTo(
  element,
  { x: -200, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, ease: "power2.out", paused: true },
);

anim.play(); // play forward
anim.reverse(); // play backward to start
anim.restart(); // reset to start and play forward
```

---

## Timeline

### Basic sequencing

```ts
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" }, // shared defaults for all children
  repeat: -1, // repeat the entire timeline
  yoyo: true,
  delay: 0.5,
  onComplete: () => console.log("timeline done"),
  paused: true,
});

tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }) // starts after .a finishes
  .to(".c", { opacity: 0 });
```

### Position parameter

The **position** (3rd argument on timeline methods) controls when a child starts:

```ts
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, 1) // absolute: start at 1s
  .to(".c", { opacity: 0 }, "+=0.5") // relative: 0.5s after previous ends
  .to(".d", { scale: 2 }, "-=0.3") // 0.3s before previous ends (overlap)
  .to(".e", { x: 0 }, "<") // same start time as previous
  .to(".f", { y: 0 }, "<0.2") // 0.2s after start of previous
  .to(".g", { opacity: 1 }, "myLabel"); // at a label
```

### Timeline methods

```ts
tl.add(myTween, 1); // add at 1s
tl.add("myLabel", 2); // add a label at 2s
tl.addLabel("intro", 0); // same as above
tl.addPause(1.5, callback); // pause at 1.5s, optionally with callback
tl.call(myFunc, ["arg"], 2); // call a function at 2s
tl.set(".box", { opacity: 0 }, 1); // set properties at 1s (instant)
tl.clear(); // remove all children
tl.remove(myTween); // remove a specific tween
tl.getChildren(); // get all tweens/timelines
tl.tweenTo("myLabel"); // animate playhead to label
tl.tweenFromTo("start", "end"); // animate playhead between labels
tl.currentLabel(); // get nearest label before playhead
tl.nextLabel(); // get next label
tl.previousLabel(); // get previous label
```

---

## `gsap.set` — instant property setting

```ts
gsap.set(".box", { x: 100, opacity: 0, display: "none" });
```

Equivalent to a zero-duration `gsap.to`. Useful for setting initial states before animating.

---

## `gsap.context` — scoped animations (React)

Groups animations for easy bulk revert — the React-recommended pattern:

```ts
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
  ScrollTrigger.create({ ... });
}, scopeElement); // optional: scope querySelector to this element

// later (e.g. cleanup):
ctx.revert(); // reverts ALL animations/triggers created inside
ctx.kill();   // same but does not revert to original styles
```

---

## `gsap.matchMedia` — responsive animations

Run different animations based on media queries, with automatic cleanup on breakpoint change:

```ts
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.to(".box", { x: 200 });
  return () => {
    /* cleanup on breakpoint exit */
  };
});

mm.add("(max-width: 767px)", () => {
  gsap.to(".box", { y: 100 });
});

// Multiple conditions at once
mm.add(
  { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
  (context) => {
    const { isDesktop, isMobile } = context.conditions!;
    gsap.to(".box", { x: isDesktop ? 200 : 50 });
  },
);
```

---

## `gsap.utils`

Utility functions for common math and array operations:

```ts
// Clamp a value to a range
gsap.utils.clamp(0, 100, 150); // 100
const clamper = gsap.utils.clamp(0, 100); // reusable
clamper(150); // 100

// Map from one range to another
gsap.utils.mapRange(-10, 10, 0, 100, 5); // 75
const mapper = gsap.utils.mapRange(0, 1, 0, 500);
mapper(0.5); // 250

// Normalize — map range to 0–1
gsap.utils.normalize(0, 100, 50); // 0.5

// Interpolate between values
gsap.utils.interpolate(0, 500, 0.5); // 250
gsap.utils.interpolate("red", "blue", 0.5); // mid-color

// Wrap — cycle through a range or array
gsap.utils.wrap(0, 10, 12); // 2
gsap.utils.wrap(["a", "b", "c"], 4); // "b"

// Snap — snap to nearest value
gsap.utils.snap(10, 23); // 20
gsap.utils.snap([0, 50, 100], 65); // 50

// Random
gsap.utils.random(0, 100); // random 0–100
gsap.utils.random(["red", "blue"]); // random pick

// Scoped selector
const q = gsap.utils.selector(containerRef.current);
gsap.to(q(".card"), { y: 20 });

// Convert to flat array
const elements = gsap.utils.toArray(".class");

// Pipe — compose functions left-to-right
const transform = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.mapRange(0, 100, 0, 500),
);

// Distribute values across elements (useful for staggers/grids)
gsap.utils.distribute({ base: 0, amount: 1, from: "center", ease: "power1" });

// Split color to RGB/HSL array
gsap.utils.splitColor("red"); // [255, 0, 0]
gsap.utils.splitColor("#6fb936", true); // [94, 55, 47] HSL

// Unitize — add a unit to the output of a function
const clampPx = gsap.utils.unitize(gsap.utils.clamp(0, 100), "px");
clampPx(130); // "100px"
```

---

## Performance utilities

### `gsap.quickSetter` — high-frequency property updates

More performant than `gsap.set` for things like mouse-follow. Use in event listeners:

```ts
const setX = gsap.quickSetter(".cursor", "x", "px");
const setY = gsap.quickSetter(".cursor", "y", "px");

window.addEventListener("mousemove", (e) => {
  setX(e.clientX);
  setY(e.clientY);
});
```

### `gsap.quickTo` — smooth value redirection

Creates a tween that can be retargeted mid-animation. Best for mouse-follow with smooth easing:

```ts
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.6, ease: "power3" });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.6, ease: "power3" });

window.addEventListener("mousemove", (e) => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

---

## Global utilities

```ts
gsap.defaults({ ease: "power2.out", duration: 0.8 }); // set global defaults
gsap.config({ force3D: "auto", nullTargetWarn: false }); // configure GSAP

gsap.getById("myTween"); // retrieve tween by id
gsap.getTweensOf(element); // get all tweens on a target
gsap.killTweensOf(element); // kill all tweens on target
gsap.killTweensOf(element, "x,opacity"); // kill only specific properties
gsap.isTweening(element); // check if element is animating

gsap.delayedCall(1, myFunc, ["arg"]); // call function after delay
gsap.getProperty(element, "x"); // read current animated value
```

### Ticker

GSAP's internal RAF loop — hook into it for frame-by-frame logic:

```ts
gsap.ticker.add((time, deltaTime, frame) => {
  // runs every frame
  myObject.update(deltaTime);
});

gsap.ticker.fps(30); // cap to 30fps
gsap.ticker.lagSmoothing(500, 33); // handle tab-freeze recovery
```

---

## ScrollTrigger

Links animations to scroll position. Attach to any tween/timeline via `scrollTrigger:`, or create standalone with `ScrollTrigger.create()`.

### Basic usage

```ts
gsap.fromTo(
  ".box",
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".box", // element that triggers
      start: "top 80%", // "triggerEdge scrollerEdge"
      end: "bottom 20%",
      toggleActions: "play none none reset",
      markers: true, // debug markers — remove for production
    },
  },
);
```

### start / end syntax

`"triggerEdge scrollerEdge"` — both parts accept:

```
"top"    / "center" / "bottom"  — element edges
"0%"     / "50%"    / "100%"    — percentage of element/viewport
"200px"                          — absolute pixels from top
"+=200"                          — relative offset
```

Examples:

```
"top 80%"        — when top of trigger hits 80% down viewport
"center center"  — when centers align
"bottom top"     — when bottom of trigger reaches top of viewport
"top top+=100"   — 100px past the top of the viewport
```

### `toggleActions`

`"onEnter onLeave onEnterBack onLeaveBack"`

```
"play none none none"           — play once, no re-trigger
"play none none reset"          — play on enter, reset when scrolling back up
"play reverse play reverse"     — play/reverse on every crossing
"restart pause resume none"     — restart on enter, pause on leave
```

### `scrub` — link animation to scroll position

```ts
gsap.to(".parallax", {
  y: -200,
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true, // true = direct link; number = seconds to catch up
    scrub: 1, // 1 second lag — smoother feel
  },
});
```

### `pin` — pin an element during scroll

```ts
gsap.to(".panel", {
  x: "-100vw",
  scrollTrigger: {
    trigger: ".panel",
    start: "top top",
    end: "+=500", // stay pinned for 500px of scroll
    pin: true, // pin the trigger element
    scrub: true,
    anticipatePin: 1, // avoids jump when pin activates (for fast scroll)
  },
});
```

### `snap` — snap to positions after scroll

```ts
scrollTrigger: {
  snap: 1 / 4,             // snap to every 25% of progress
  snap: [0, 0.25, 0.5, 1], // snap to specific progress values
  snap: "labels",           // snap to timeline labels
  snap: {
    snapTo: [0, 0.5, 1],
    duration: { min: 0.2, max: 0.5 },
    ease: "power1.inOut",
  },
}
```

### Manual callbacks (best for snap scroll)

`toggleActions` can miss transitions when elements jump into view via CSS snap. Use manual callbacks with a paused animation:

```ts
const anim = gsap.fromTo(
  element,
  { x: 200, opacity: 0 },
  { x: 0, opacity: 1, duration: 1, paused: true },
);

ScrollTrigger.create({
  trigger: element,
  start: "top 90%",
  onEnter: () => anim.restart(),
  onEnterBack: () => anim.restart(),
  onLeave: () => anim.reverse(),
  onLeaveBack: () => anim.reverse(),
});
```

### Custom scroller (snap scroll containers)

When the scrollable element is a `div` (not `window`):

```ts
ScrollTrigger.defaults({ scroller: containerRef.current });

// Cleanup:
return () => {
  ScrollTrigger.defaults({ scroller: window });
  ScrollTrigger.getAll().forEach((t) => t.kill());
};
```

### `ScrollTrigger.batch` — efficient multi-element entrance

```ts
ScrollTrigger.batch(".card", {
  interval: 0.1, // max seconds between grouped callbacks
  batchMax: 5, // max elements per batch
  onEnter: (elements) =>
    gsap.to(elements, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }),
  onLeave: (elements) => gsap.set(elements, { opacity: 0, overwrite: true }),
  onEnterBack: (elements) =>
    gsap.to(elements, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }),
  onLeaveBack: (elements) =>
    gsap.set(elements, { opacity: 0, overwrite: true }),
  start: "top 90%",
});
```

### ScrollTrigger static methods

```ts
ScrollTrigger.refresh(); // recalculate all positions (after layout change)
ScrollTrigger.getAll(); // array of all ScrollTrigger instances
ScrollTrigger.getById("id"); // get one by id
ScrollTrigger.killAll(); // kill all ScrollTriggers
ScrollTrigger.isInViewport(el, 0.2); // true if 20% of el is visible
ScrollTrigger.maxScroll(window); // max scroll distance
ScrollTrigger.isScrolling(); // currently scrolling?

// Events
ScrollTrigger.addEventListener("scrollStart", fn);
ScrollTrigger.addEventListener("scrollEnd", fn);
ScrollTrigger.addEventListener("refresh", fn);
ScrollTrigger.removeEventListener("scrollStart", fn);

// Config
ScrollTrigger.config({
  limitCallbacks: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
});
```

---

## Using with React

### `useGSAP` hook (recommended)

GSAP's official React integration — handles cleanup automatically:

```tsx
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const containerRef = useRef<HTMLDivElement>(null);

useGSAP(
  () => {
    // runs after mount, re-runs when dependencies change
    gsap.fromTo(
      ".box",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
    );

    ScrollTrigger.create({
      trigger: ".box",
      start: "top 80%",
      onEnter: () => console.log("entered"),
    });
    // no cleanup needed — useGSAP handles it on unmount/re-run
  },
  { scope: containerRef, dependencies: [someValue] },
);
```

- `scope` — limits CSS selector lookups to that element (avoids targeting elements in other components)
- `dependencies` — re-runs the effect when these change (like `useEffect`)
- Automatically calls `.revert()` and kills all ScrollTriggers on unmount

### `useEffect` (use when `useGSAP` causes timing issues)

```tsx
useEffect(() => {
  const anim = gsap.fromTo(
    ref.current,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 }
  );

  const trigger = ScrollTrigger.create({ ... });

  return () => {
    anim.kill();
    trigger.kill();
  };
}, []);
```

---

## Common Pitfalls

### Animation doesn't run on page refresh

ScrollTrigger calculates positions before the DOM is fully laid out after hydration. Fix:

```ts
useEffect(() => {
  ScrollTrigger.refresh();
}, []);
```

Or defer with `requestAnimationFrame` for elements already in view on load:

```ts
requestAnimationFrame(() => {
  anim.restart();
});
```

### Element in view on load doesn't animate

ScrollTrigger considers it already "past" the trigger point. Use `requestAnimationFrame` to manually trigger after the first paint.

### Snap scroll — only animates once

`toggleActions` doesn't fire `onEnterBack` reliably with CSS snap scroll. Use the manual callbacks pattern (`onEnter`, `onEnterBack`, `onLeave`, `onLeaveBack`) with a paused animation.

### ScrollTrigger using wrong scroller

If your scroll container is a `div` with `overflow-y: scroll`, ScrollTrigger defaults to watching `window`. Set `ScrollTrigger.defaults({ scroller })`.

### Conflicting tweens on the same target

Two tweens fighting over the same property will cause jank. Use `overwrite: "auto"` or `overwrite: true` on the newer tween, or `gsap.killTweensOf(element, "x")` before creating a new one.

### `from` flash-of-content

`gsap.from` sets properties to their "from" values only at animation time. If the animation is delayed or ScrollTrigger hasn't fired yet, elements appear at their final CSS state first, then snap. Use `gsap.fromTo` or `gsap.set` to initialize state before animating.

---

## Cleanup

Always kill animations and triggers on unmount to avoid memory leaks:

```ts
// Kill all ScrollTriggers
ScrollTrigger.getAll().forEach((t) => t.kill());

// Kill a specific tween
anim.kill();

// Kill all tweens on a target
gsap.killTweensOf(element);

// Revert a context (kills + removes inline styles)
ctx.revert();
```

---

## Custom Effects (reusable named animations)

```ts
gsap.registerEffect({
  name: "fadeIn",
  effect: (targets: Element[], config: { duration: number }) => {
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: config.duration },
    );
  },
  defaults: { duration: 0.8 },
  extendTimeline: true, // lets you call tl.fadeIn(".box")
});

// Use it
gsap.effects.fadeIn(".box");

// Or on a timeline
const tl = gsap.timeline();
tl.fadeIn(".box").fadeIn(".title", { duration: 1.2 }, "-=0.5");
```

---

## Available Plugins

| Plugin               | What it does                                                |
| -------------------- | ----------------------------------------------------------- |
| `ScrollTrigger`      | Scroll-linked and scroll-triggered animations               |
| `ScrollSmoother`     | Smooth scroll (Club GSAP)                                   |
| `Flip`               | Animate between layout states (FLIP technique)              |
| `Draggable`          | Drag and drop with inertia                                  |
| `Observer`           | Detect scroll/swipe/pointer gestures                        |
| `MotionPathPlugin`   | Animate along SVG paths                                     |
| `MorphSVGPlugin`     | Morph between SVG shapes (Club GSAP)                        |
| `SplitText`          | Split text into chars/words/lines for animation (Club GSAP) |
| `DrawSVGPlugin`      | Animate SVG stroke drawing (Club GSAP)                      |
| `TextPlugin`         | Animate text content character by character                 |
| `CustomEase`         | Create any custom easing curve                              |
| `CustomBounce`       | Create custom bounce eases                                  |
| `CustomWiggle`       | Create wiggle eases                                         |
| `ScrambleTextPlugin` | Scramble text during animation (Club GSAP)                  |
| `InertiaPlugin`      | Decelerate any property with momentum                       |
| `Physics2DPlugin`    | Physics-based 2D animation                                  |
| `PixiPlugin`         | Animate Pixi.js display objects                             |
| `EaselPlugin`        | Animate EaselJS display objects                             |
| `CSSRulePlugin`      | Animate CSS rules (`:before`, `:after`)                     |
| `GSDevTools`         | Visual animation debugger UI                                |
