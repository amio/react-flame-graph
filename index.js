/** @jsx h */
import { h, render, Component, svg, g } from 'preact'
import Graph from './src/Graph.js'

const graphWrapper = document.getElementById('flame-graph')
console.log(graphWrapper.scrollWidth)

const graph = (
  <Graph direction="down"
    width={ graphWrapper.scrollWidth }
    height={ graphWrapper.scrollHeight }
    data={ window.dataJSON } />
)

render(graph, graphWrapper)
