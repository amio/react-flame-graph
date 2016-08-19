'use strict';

var _preact = require('preact');

/** @jsx h */

function onmouseover(e) {
  if (e.target.tagName === 'svg') return;
  var parentG = findParentG(e.target);

  parentG.classList.add('hover');
  console.log(parentG.getAttribute('title'));
  e.stopPropagation();
} // write ES2015 code and import modules from npm
// and then press "Execute" to run your program

function onmouseout(e) {
  if (e.target.tagName === 'svg') return;
  var parentG = findParentG(e.target);
  parentG.classList.remove('hover');
}

function findParentG(el) {
  switch (el.tagName) {
    case 'g':
      return el;
    case 'svg':
      return el;
    default:
      return findParentG(el.parentNode);
  }
}

var Graph = function Graph(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var _ref$barHeight = _ref.barHeight;
  var barHeight = _ref$barHeight === undefined ? 22 : _ref$barHeight;
  var _ref$barMargin = _ref.barMargin;
  var barMargin = _ref$barMargin === undefined ? 1 : _ref$barMargin;
  var _ref$direction = _ref.direction;
  var direction = _ref$direction === undefined ? 'up' : _ref$direction;
  var data = _ref.data;

  var startY = height - barHeight;
  var offsetY = barHeight + barMargin;
  if (direction === 'down') {
    startY = 1;
    offsetY = -offsetY;
  }
  return (0, _preact.h)(
    'svg',
    { 'class': 'flame-graph',
      onmouseover: onmouseover,
      onmouseout: onmouseout,
      width: width, height: height,
      viewBox: '0 0 ' + width + ' ' + height },
    (0, _preact.h)(Bar, { node: data,
      x: 0, y: startY, offsetY: offsetY,
      width: width + barMargin, height: barHeight, margin: barMargin })
  );
};

function barMouseover(e) {
  // this.classList.add('hover')
}

function barMouseout(e) {
  // this.classList.remove('hover')
}

var Bar = function Bar(_ref2) {
  var x = _ref2.x;
  var y = _ref2.y;
  var width = _ref2.width;
  var height = _ref2.height;
  var offsetY = _ref2.offsetY;
  var margin = _ref2.margin;
  var node = _ref2.node;

  var pos = 'translate(' + x + ', ' + y + ')';
  var childXPointer = 0;
  var children = node.children && node.children.map(function (child) {
    var childWidth = child.value / node.value * width - margin;
    var childX = childXPointer;
    childXPointer = childXPointer + childWidth + margin;
    return (0, _preact.h)(Bar, { node: child,
      x: childX, y: -offsetY,
      width: childWidth, height: height });
  });
  return (0, _preact.h)(
    'g',
    { 'class': 'bar', transform: pos,
      width: width, height: height,
      title: node.name, value: node.value,
      onmouseover: barMouseover, onmouseout: barMouseout },
    (0, _preact.h)('rect', { width: width, height: height }),
    (0, _preact.h)(
      'text',
      { x: '2', y: '16', 'class': 'label' },
      node.name
    ),
    children
  );
};

(0, _preact.render)((0, _preact.h)(Graph, { data: window.dataJSON, direction: 'up',
  width: window.innerWidth, height: '400' }), document.body);