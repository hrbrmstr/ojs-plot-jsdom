import * as Plot from "@observablehq/plot"
import { JSDOM } from "jsdom"

const jsdom = new JSDOM(`<figure id='plt'></figure>`)

const rociCrewCoffeConsumption = [
	{ cups: 30, member: "Holden" },
	{ cups: 5, member: "Amos" },
	{ cups: 3, member: "Alex" },
	{ cups: 1, member: "Naomi" },
];

const plt = jsdom.window.document.getElementById('plt')

plt.appendChild(
	Plot.plot({
		document: jsdom.window.document,
		marginLeft: 50,
		style: {
			background: "none",
			color: "#4a6d88"
		},
		x: {
			grid: true,
			label: "Cups of coffee consumed, per-day"
		},
		y: {

			label: null
		},
		marks: [
			Plot.barX(
				rociCrewCoffeConsumption,
				{
					x: "cups", y: "member", sort:
						{ y: "x", reverse: true }
				})
		]
	})
);

console.log(plt.innerHTML)