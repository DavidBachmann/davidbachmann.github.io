// Async load by pazguille
(function aload(nodes){
  'use strict';

  nodes = nodes || window.document.querySelectorAll('[data-aload]');

  if (nodes.length === undefined) {
    nodes = [nodes];
  }

  var i = 0;
  var len = nodes.length;
  var node;

  for (i; i < len; i += 1) {
    node = nodes[i];
    node[node.tagName !== 'LINK' ? 'src' : 'href'] = node.getAttribute('data-aload');
    node.removeAttribute('data-aload');
  }
  return nodes;
})();