/** @jsx h */
import { h, render, Component, svg, g } from 'preact'
import Bar from './Bar.js'

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
    startY = 0
    offsetY = -offsetY
  }
  return (
    <svg class="flame-graph"
      onmouseover={ onmouseover }
      onmouseout={ onmouseout }
      width={ width } height={ height }
      viewBox={`0 0 ${ width } ${ height }`} style="font-size: 14px" >
      <Bar node={ data }
        x={ 0 } y={ startY } offsetY={ offsetY }
        width={ width + barMargin } height={ barHeight } margin={ barMargin } />
    </svg>
  )
}

function onmouseover (e) {
  if (e.target.tagName === 'svg') return
  const parentG = findParentG(e.target)
  parentG.classList.add('hover')
  // console.log(parentG.getAttribute('value'))
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
      return undefined
    default:
      return findParentG(el.parentNode)
  }
}

export default Graph
