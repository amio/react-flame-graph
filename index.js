// write ES2015 code and import modules from npm
// and then press "Execute" to run your program

import { h, render, Component, svg, g } from 'preact';
/** @jsx h */

function onmouseover (e) {
  if (e.target.tagName === 'svg') return
  const parentG = findParentG(e.target)

  parentG.classList.add('hover')
}

function onmouseout (e) {
  if (e.target.tagName === 'svg') return
  const parentG = findParentG(e.target)
  parentG.classList.remove('hover')
}

function findParentG (el) {
  switch (el.tagName) {
    case 'g':
      return el
    case 'svg':
      return el
    default:
      return findParentG(el.parentNode)
  }
}

const Graph = ({
  width,
  height,
  barHeight = 22,
  barMargin = 1,
  direction = 'up',
  data
}) => {
  let startY = height - barHeight
  let offsetY = barHeight + barMargin
  if (direction === 'down') {
    startY = 1
    offsetY = -offsetY
  }
  return (
    <svg class="flame-graph"
      onmouseover={ onmouseover }
      onmouseout={ onmouseout }
      width={ width } height={ height }
      viewBox={`0 0 ${ width } ${ height }`} >
      <Bar node={ data }
        x={ 0 } y={ startY } offsetY = { offsetY }
        width={ width + barMargin } height={ barHeight } margin={ barMargin } />
    </svg>
  )
}

const Bar = ({
  x,
  y,
  width,
  height,
  offsetY,
  margin,
  node
}) => {
  const pos = `translate(${x}, ${y})`
  let childXPointer = 0
  const children = node.children && node.children.map(child => {
    const childWidth = child.value / node.value * width - margin
    const childX = childXPointer
    childXPointer = childXPointer + childWidth + margin
    return (
      <Bar node={ child }
        x={ childX } y={ - offsetY }
        width={ childWidth } height={ height } />
    )
  })
  return (
    <g class="bar" transform={ pos }
      width={ width } height={ height } >
      <rect width={ width } height={ height } />
      <text x="2" y="16" class="label">{node.name}</text>
      { children }
    </g>
  )
}

render(
  <Graph data={window.dataJSON} direction="up"
    width={ window.innerWidth } height="400" />,
  document.body
)