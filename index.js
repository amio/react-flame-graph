// write ES2015 code and import modules from npm
// and then press "Execute" to run your program

import { h, render, Component, svg, g } from 'preact'
import Graph from './src/Graph.js'
/** @jsx h */

render(
  <Graph data={window.dataJSON} direction="down"
    width={ window.innerWidth } height="400" />,
  document.getElementById('flame-graph')
)
