# Creative Web Experiments

This repository is a collection of small, experimental web projects focused on creative coding, interaction design, and visual storytelling. Each project serves as a focused exploration of what is possible within the browser.

## Let's Collaborate

If you are interested in working together or would like a creative website tailored to your specific needs, I would be happy to discuss your ideas.

Visit [my website](https://nandordevai.net/contact) to get in touch.

## Technologies & Tools

<!-- This showcase is built using a variety of web technologies, focusing on performance and visual fidelity: -->

- Languages: HTML, CSS, JavaScript
- Graphics & Animation: Canvas API

## The experiments

**[Analog-style buttons](/experiments/buttons.html)**

I’ve been experimenting with more tactile web UI. This first piece is inspired by old analog equipment (because the web could use more “clicky” buttons).

The goal was to see how much realism I could pull out of the browser using 100% CSS. No images, no canvas, and no external assets, just code.

The Breakdown:
- OKLCH Color: Used for consistent luminance so the "glow" feels like real light.
- Mechanical Physics: A `cubic-bezier` transition gives the toggle a weighted, physical snap.
- Specular Highlights: Tiny `radial-gradients` simulate an overhead light source hitting the edges.
- Modern Logic: Using `:has(:checked)` to manage state without heavy JavaScript.
