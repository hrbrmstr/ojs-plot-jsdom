# ojs-plot-jsdom

How to use server-side Observable Plot with just vanilla Node.js.

### Normal Run

```bash
npm run --silent plot > roci.svg
```

![roci](roci.png)

```svg
<svg class="plot-d6a7b5" fill="currentColor" font-family="system-ui, sans-serif" font-size="10" text-anchor="middle" width="640" height="140" viewBox="0 0 640 140" style="background: none; color: rgb(74, 109, 136);"><style>.plot-d6a7b5 {
  display: block;
  background: white;
  height: auto;
  height: intrinsic;
  max-width: 100%;
}
.plot-d6a7b5 text,
.plot-d6a7b5 tspan {
  white-space: pre;
}</style><g aria-label="y-axis tick" fill="none" stroke="currentColor" transform="translate(0,9.5)"><path transform="translate(50,24)" d="M0,0L-6,0"></path><path transform="translate(50,45)" d="M0,0L-6,0"></path><path transform="translate(50,66)" d="M0,0L-6,0"></path><path transform="translate(50,87)" d="M0,0L-6,0"></path></g><g aria-label="y-axis tick label" text-anchor="end" transform="translate(-9,9.5)"><text y="0.32em" transform="translate(50,24)">Holden</text><text y="0.32em" transform="translate(50,45)">Amos</text><text y="0.32em" transform="translate(50,66)">Alex</text><text y="0.32em" transform="translate(50,87)">Naomi</text></g><g aria-label="x-grid" stroke="currentColor" stroke-opacity="0.1"><line x1="50" x2="50" y1="20" y2="110"></line><line x1="145" x2="145" y1="20" y2="110"></line><line x1="240" x2="240" y1="20" y2="110"></line><line x1="335" x2="335" y1="20" y2="110"></line><line x1="430" x2="430" y1="20" y2="110"></line><line x1="525.0000000000001" x2="525.0000000000001" y1="20" y2="110"></line><line x1="620" x2="620" y1="20" y2="110"></line></g><g aria-label="x-axis tick" fill="none" stroke="currentColor"><path transform="translate(50,110)" d="M0,0L0,6"></path><path transform="translate(145,110)" d="M0,0L0,6"></path><path transform="translate(240,110)" d="M0,0L0,6"></path><path transform="translate(335,110)" d="M0,0L0,6"></path><path transform="translate(430,110)" d="M0,0L0,6"></path><path transform="translate(525.0000000000001,110)" d="M0,0L0,6"></path><path transform="translate(620,110)" d="M0,0L0,6"></path></g><g aria-label="x-axis tick label" font-variant="tabular-nums" transform="translate(0,9)"><text y="0.71em" transform="translate(50,110)">0</text><text y="0.71em" transform="translate(145,110)">5</text><text y="0.71em" transform="translate(240,110)">10</text><text y="0.71em" transform="translate(335,110)">15</text><text y="0.71em" transform="translate(430,110)">20</text><text y="0.71em" transform="translate(525.0000000000001,110)">25</text><text y="0.71em" transform="translate(620,110)">30</text></g><g aria-label="x-axis label" text-anchor="end" transform="translate(17,27)"><text transform="translate(620,110)">Cups of coffee consumed, per-day</text></g><g aria-label="bar"><rect x="50" width="570" y="24" height="19"></rect><rect x="50" width="95" y="45" height="19"></rect><rect x="50" width="57" y="66" height="19"></rect><rect x="50" width="19" y="87" height="19"></rect></g></svg>
```

### [Svgo](https://github.com/svg/svgo) optimized:

```bash
# install svgo if necessary
npm install -g svgo

npm run --silent plot | svgo --pretty --indent 2 -i - -o roci-svgo.svg 
```

```svg
<svg width="640" height="140" fill="currentColor" font-family="system-ui, sans-serif" font-size="10" style="background:0 0;color:#4a6d88;display:block;height:intrinsic;max-width:100%" text-anchor="middle">
  <style>
    .plot-d6a7b5 text{white-space:pre}
  </style>
  <g fill="none" stroke="currentColor" aria-label="y-axis tick">
    <path d="M50 33.5h-6M50 54.5h-6M50 75.5h-6M50 96.5h-6"/>
  </g>
  <g aria-label="y-axis tick label" text-anchor="end">
    <text y=".32em" transform="translate(41 33.5)">Holden</text>
    <text y=".32em" transform="translate(41 54.5)">Amos</text>
    <text y=".32em" transform="translate(41 75.5)">Alex</text>
    <text y=".32em" transform="translate(41 96.5)">Naomi</text>
  </g>
  <g stroke="currentColor" stroke-opacity=".1" aria-label="x-grid">
    <path d="M50 20v90M145 20v90M240 20v90M335 20v90M430 20v90M525 20v90M620 20v90"/>
  </g>
  <g fill="none" stroke="currentColor" aria-label="x-axis tick">
    <path d="M50 110v6M145 110v6M240 110v6M335 110v6M430 110v6M525 110v6M620 110v6"/>
  </g>
  <g aria-label="x-axis tick label" font-variant="tabular-nums">
    <text y=".71em" transform="translate(50 119)">0</text>
    <text y=".71em" transform="translate(145 119)">5</text>
    <text y=".71em" transform="translate(240 119)">10</text>
    <text y=".71em" transform="translate(335 119)">15</text>
    <text y=".71em" transform="translate(430 119)">20</text>
    <text y=".71em" transform="translate(525 119)">25</text>
    <text y=".71em" transform="translate(620 119)">30</text>
  </g>
  <text aria-label="x-axis label" text-anchor="end" transform="translate(637 137)">Cups of coffee consumed, per-day</text>
  <g aria-label="bar">
    <path d="M50 24h570v19H50zM50 45h95v19H50zM50 66h57v19H50zM50 87h19v19H50z"/>
  </g>
</svg>
```


### Code

```javascript
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
```