/** @jsx h */
import { h } from 'preact'

const Bar = ({
  x,
  y,
  width,
  height,
  offsetY,
  charWidth,
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
        x={ childX } y={ -offsetY } offsetY={ offsetY } charWidth={ charWidth }
        width={ childWidth } height={ height } margin={ margin } />
    )
  })

  return (
    <g class="bar" transform={ `translate(${x}, ${y})` } width={ width } >
      <rect width={ width > margin ? width - margin : 0 } height={ height } />
      { genLabel(node.name, width - margin, charWidth) }
      { children }
    </g>
  )
}

function genLabel (labelText, width, charWidth) {
  const labelCharsWidth = Math.round((width - 8) / charWidth)

  if (labelCharsWidth >= labelText.length) {
    // output full labelText
  } else if (labelCharsWidth > 2) {
    // cut the length, add '…'
    labelText = labelText.substr(0, labelCharsWidth - 1) + '…'
  } else {
    // no label
    labelText = ''
  }

  return labelText && <text x="3" y="16" className="label">{ labelText }</text>
}

export default Bar
