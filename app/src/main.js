/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Surface = require('famous/core/Surface');
  var Engine = require('famous/core/Engine');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  var mainContext = Engine.createContext();

  var container = new ContainerSurface({});

  var zoomed = false;

  var panelCount = 25;

  var zoomOutScale = 1 / Math.sqrt(panelCount);

  var scaleModifier = new Modifier({
    transform: Transform.scale(zoomOutScale, zoomOutScale, 1)
  });

  mainContext.add(scaleModifier).add(container);

  var size = [window.innerWidth, window.innerHeight];


  for (var i=0; i < panelCount; i++) {
    var col = Math.floor(i % 5);
    var row = Math.floor(i / 5);

    var panel = new Surface({
      content: '<div class="panel color' + (i % 3 + 1) + '" title="Panel ' + (i + 1) + '">' +
      '<h1>Panel ' + (i + 1) + '</h1>' +
      '</div>'
    });

    var panelModifier = new Modifier({
      transform: Transform.translate(col * size[0], row * size[1])
    });

    container.add(panelModifier).add(panel);

    (function(i, panel, col, row) {
      panel.on('dblclick', function(e) {
        var transform;

        if (zoomed) {
          transform = Transform.scale(zoomOutScale, zoomOutScale, 1);
        } else {
          panel.setContent(
            '<div class="panel zoomed color' + (i % 3 + 1) + '" title="Panel ' + (i + 1) + '">' +
            '<h1>Panel ' + (i + 1) + '</h1>' +
            '<div class="panel-content">' +
            '<ul><li>One</li><li>Two</li></ul>' +
            '</div>' +
            '</div>'
          );

          transform = Transform.multiply(
            Transform.scale(1, 1, 1),
            Transform.translate(-col * size[0], -row * size[1])
          );
        }

        zoomed = !zoomed;

        scaleModifier.setTransform(transform, {
          duration: 250
        });
      });
    })(i, panel, col, row);
  }

  function zoomTo(row, col, scale) {

  }
});
