import { h, render, Component, svg, g } from 'preact';
/** @jsx h */

const Bar = ({
  x,
  y,
  width,
  height,
  offsetY,
  margin,
  node
}) => {
  let childXPointer = 0
  const children = node.children && node.children.map(child => {
    let childWidth = child.value / node.value * width
    if (childWidth < margin) {
      childWidth = 0
    }

    const childX = childXPointer
    childXPointer = childXPointer + childWidth
    return (
      <Bar node={ child }
        x={ childX } y={ -offsetY } offsetY={ offsetY }
        width={ childWidth } height={ height } margin={ margin } />
    )
  })
  return (
    <g class="bar" transform={ `translate(${x}, ${y})` }
      width={ width }
      title={ node.name } value={ node.value } >
      <rect width={ width > margin ? width - margin : 0 } height={ height } />
      <text x="2" y="16" width={width} className="label">{ node.name }</text>
      <foreignObject width={ width } height={ height }>
        <div className="label">{ node.name }</div>
      </foreignObject>
      { children }
    </g>
  )
}

export default Bar
