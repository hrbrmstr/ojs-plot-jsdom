import * as Plot from "@observablehq/plot"
import { JSDOM } from "jsdom"

const jsdom = new JSDOM()

const rociCrewCoffeConsumption = [
	{ cups: 30, member: "Holden" },
	{ cups: 5, member: "Amos" },
	{ cups: 3, member: "Alex" },
	{ cups: 1, member: "Naomi" },
];

const plotClass = "plot-roci"

// NOTE
// - setting `color` in `style` here breaks dark mode support in this example
// - same for `background` if it is not none
// - use `className` to your own advantage
const plotSVG = Plot.plot({
	document: jsdom.window.document,
	className: plotClass,
	marginTop: 8,
	marginLeft: 50,
	width: 500,
	style: {
		background: "none"
	},
	x: {
		grid: true,
		tickSize: 0,
		label: "Cups of coffee consumed, per-day"
	},
	y: {
		tickSize: 0,
		label: null
	},
	marks: [
		Plot.barX(
			rociCrewCoffeConsumption,
			{
				x: "cups",
				y: "member",
				sort: {
					y: "x", 
					reverse: true
				},
				fill: "steelblue"
			})
	]
})

// MODIFY title and subtitle here
//
// Both need to fit into the width of the SVG.
//
// This is a single line example.
// Use the <foreignObject> hack or
// <tspan>s to get multi-line SVGs text
//
// REMEMBER to update `spaceForTitles` if you 
// use different `font-size` values.
const titleText = "Jitters On The Rocinante"
const subtitleText = "How is it possible there is so much coffee in space in The Expanse universe?"
const spaceForTitles = 30

const titleGroup = jsdom.window.document.createElementNS("http://www.w3.org/2000/svg", "g");

const title = jsdom.window.document.createElementNS("http://www.w3.org/2000/svg", "text")
title.setAttribute("x", "0")
title.setAttribute("y", "-16")
title.setAttribute("font-size", "16")
title.setAttribute("font-weight", "700")
title.setAttribute("text-anchor", "start")
title.setAttribute("aria-label", "title")
title.textContent = titleText

const subtitle = jsdom.window.document.createElementNS("http://www.w3.org/2000/svg", "text")
subtitle.setAttribute("x", "0")
subtitle.setAttribute("y", "0")
subtitle.setAttribute("font-size", "12")
subtitle.setAttribute("text-anchor", "start")
subtitle.setAttribute("aria-label", "subtitle")
subtitle.textContent = subtitleText

titleGroup.appendChild(title)
titleGroup.appendChild(subtitle)

plotSVG.insertBefore(titleGroup, plotSVG.firstChild.nextSibling)

const updatedHeight = parseInt(plotSVG.getAttribute("height")) + spaceForTitles
plotSVG.setAttribute("height", updatedHeight)

const updatedViewBox = `0 -${spaceForTitles} ${plotSVG.getAttribute("width")} ${updatedHeight}`
plotSVG.setAttribute("viewBox", updatedViewBox)

const plotStyle = plotSVG.querySelector("style")

const darkModeCSS = `
@media (prefers-color-scheme: dark) {
  :root {
    color: #ffffff;
  }
}`

plotStyle.textContent += darkModeCSS

plotSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg")
plotSVG.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")

console.log(plotSVG.outerHTML)
