---
title: The Force
description: My thoughts on Mortis, the Force, and grey jedi
date: '2023-08-29'
tags:
  - star-wars
published: true
---

<script lang="ts" context="module">
import Accordion from '$components/Accordion.svelte';
import ahsokaImage from '$images/ahsoka/ahsoka-image.jpg?h=100;200;400&w=200;400;700&fit=cover&as=run';
import ahsokaOGImage from '$images/ahsoka/ahsoka-image.jpg?b64';
import ahsoka from '$images/ahsoka/character-poster-ahsoka.jpg?as=run';
import hera from '$images/ahsoka/character-poster-hera.jpg?as=run';
import sabine from '$images/ahsoka/character-poster-sabine.jpg?as=run';
import baylan from '$images/ahsoka/character-poster-baylan.jpg?as=run';
import shin from '$images/ahsoka/character-poster-shin.jpg?as=run';
import morgan from '$images/ahsoka/character-poster-morgan.jpg?as=run';
metadata.featuredImage = ahsokaImage;
metadata.ogImage = ahsokaOGImage;

const panels = [
  { panelSrc: ahsoka, alt: `Ahsoka's character poster`, title: 'Ahsoka', text: 'Ahsoka is perfectly realized by Rosario Dawson' },
  { panelSrc: hera, alt: `Hera character poster`, title: 'Hera', text: 'Hera is such a team mom. Her lekku look a bit fake though.' },
  { panelSrc: sabine, alt: `Sabine's character poster`, title: 'Sabine', text: `I think the actress does a great job. I wish she hadn't cut her hair, but I understand why she did.` },
  { panelSrc: baylan, alt: `Baylan's character poster`, title: 'Baylan', text: `Rip Ray. He's done a great job and will be missed.` },
  { panelSrc: shin, alt: `Shin's character poster`, title: 'Shin', text: `She looks a bit how I imagine Zannah.` },
  { panelSrc: morgan, alt: `Lady Morgan's character poster`, title: 'Lady Morgan', text: `I love seeing the return of Lady Morgan` },
  ]

</script>

<Accordion {panels} containerAspectRatio={`6 / 5`} blockSize={`auto`} inlineSize={`80ch`} />

## Live Reaction

The Force has a yin yan relationship with life and death as illustrated on Mortis. The dark side used by the sith and so-called grey jedi is bending the force to their will whether by seeking immortality or causing destruction.
