# ojs-plot-jsdom

How to use server-side Observable Plot with just vanilla Node.js.

The example in `index.js` adds a title and subtitle to the plot as SVG `text` elements to keep the whole thing self-contained. Support for auto-adapting to dark mode appearance is also included.

### Normal Run

```bash
npm run --silent plot > roci.svg
```

![roci](roci.svg)

### [Svgo](https://github.com/svbg/svgo) optimized:

```bash
# install svgo if necessary
npm install -g svgo

npm run --silent plot | svgo --pretty --indent 2 -i - -o roci-svgo.svg 
```

![roci](roci-svgo.svg)
