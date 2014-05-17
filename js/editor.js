
  (function() {

     var getElem = function(id){return document.getElementById(id)};

     var canvas = new fabric.Canvas('myCanvas', {
        isDrawingMode: false
     });

     fabric.Object.prototype.transparentCorners = false;

     var drawingModeEl = getElem('drawing-mode'),
         drawingOptionsEl = getElem('drawing-mode-options'),
         drawingColorEl = getElem('drawing-color'),
         drawingShadowColorEl = getElem('drawing-shadow-color'),
         drawingLineWidthEl = getElem('drawing-line-width'),
         drawingShadowWidth = getElem('drawing-shadow-width'),
         drawingShadowOffset = getElem('drawing-shadow-offset'),
         clearEl = getElem('clear-canvas'),
         loadSvg = getElem('loadSvgButton'),
         svgConsole = getElem('svgConsole'),
         background = getElem('setBackgroundColor'),
         setOverlay = getElem('overlay'),
         deleteOverlay = getElem('deleteOverlay'),
         imageSource = getElem('imageSource'),
         deleteSvg = getElem('deleteSvg');

     clearEl.onclick = function() { canvas.clear() };

     drawingOptionsEl.style.display = 'none';
     drawingModeEl.onclick = function() {
         canvas.isDrawingMode = !canvas.isDrawingMode;
         if (canvas.isDrawingMode) {
             drawingModeEl.innerHTML = 'Cancel drawing mode';
             drawingOptionsEl.style.display = '';
         }
         else {
             drawingModeEl.innerHTML = 'Enter drawing mode';
             drawingOptionsEl.style.display = 'none';
         }
     };

     if (!fabric.PatternBrush) {
     } else {

     var vLinePatternBrush = new fabric.PatternBrush(canvas);
     vLinePatternBrush.getPatternSrc = function () {

         var patternCanvas = fabric.document.createElement('canvas');
         patternCanvas.width = patternCanvas.height = 10;
         var ctx = patternCanvas.getContext('2d');

         ctx.strokeStyle = this.color;
         ctx.lineWidth = 5;
         ctx.beginPath();
         ctx.moveTo(0, 5);
         ctx.lineTo(10, 5);
         ctx.closePath();
         ctx.stroke();

         return patternCanvas;
     };

     var hLinePatternBrush = new fabric.PatternBrush(canvas);
     hLinePatternBrush.getPatternSrc = function () {

         var patternCanvas = fabric.document.createElement('canvas');
         patternCanvas.width = patternCanvas.height = 10;
         var ctx = patternCanvas.getContext('2d');

         ctx.strokeStyle = this.color;
         ctx.lineWidth = 5;
         ctx.beginPath();
         ctx.moveTo(5, 0);
         ctx.lineTo(5, 10);
         ctx.closePath();
         ctx.stroke();

         return patternCanvas;
     };

     var squarePatternBrush = new fabric.PatternBrush(canvas);
     squarePatternBrush.getPatternSrc = function () {

         var squareWidth = 10, squareDistance = 2;

         var patternCanvas = fabric.document.createElement('canvas');
         patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
         var ctx = patternCanvas.getContext('2d');

         ctx.fillStyle = this.color;
         ctx.fillRect(0, 0, squareWidth, squareWidth);

         return patternCanvas;
     };

     var diamondPatternBrush = new fabric.PatternBrush(canvas);
     diamondPatternBrush.getPatternSrc = function () {

         var squareWidth = 10, squareDistance = 5;
         var patternCanvas = fabric.document.createElement('canvas');
         var rect = new fabric.Rect({
             width: squareWidth,
             height: squareWidth,
             angle: 45,
             fill: this.color
         });

         var canvasWidth = rect.getBoundingRectWidth();

         patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
         rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

         var ctx = patternCanvas.getContext('2d');
         rect.render(ctx);

         return patternCanvas;
     };

     var img = new Image();
        img.src = "http://upload.wikimedia.org/wikipedia/en/archive/3/35/20140115022931!Front_Row_Icon.png";
        img.onload = function(){
            texturePatternBrush = new fabric.PatternBrush(canvas);
            texturePatternBrush.source = img;
        }
        var texturePatternBrush;
     }

     getElem('drawing-mode-selector').onchange = function() {

         if (this.value === 'hline') {
            canvas.freeDrawingBrush = vLinePatternBrush;
         }
         else if (this.value === 'vline') {
            canvas.freeDrawingBrush = hLinePatternBrush;
         }
         else if (this.value === 'square') {
            canvas.freeDrawingBrush = squarePatternBrush;
         }
         else if (this.value === 'diamond') {
            canvas.freeDrawingBrush = diamondPatternBrush;
         }
         else if (this.value === 'texture') {
            canvas.freeDrawingBrush = texturePatternBrush;
         }
         else {
            canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
         }

         if (canvas.freeDrawingBrush) {
             canvas.freeDrawingBrush.color = drawingColorEl.value;
             canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
             canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
             canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
             canvas.freeDrawingBrush.shadowColor =  drawingShadowColorEl.value;
             canvas.freeDrawingBrush.shadowOffsetX =
             canvas.freeDrawingBrush.shadowOffsetY = parseInt(drawingShadowOffset.value, 10) || 0;

         }
     };

     drawingColorEl.onchange = function() {
        canvas.freeDrawingBrush.color = this.value;
     };
     drawingShadowColorEl.onchange = function() {
        canvas.freeDrawingBrush.shadowColor = this.value;
     };
     drawingLineWidthEl.onchange = function() {
         canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
         this.previousSibling.innerHTML = this.value;
     };
     drawingShadowWidth.onchange = function() {
         canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
         this.previousSibling.innerHTML = this.value;
     };
     drawingShadowOffset.onchange = function() {
         canvas.freeDrawingBrush.shadowOffsetX =
         canvas.freeDrawingBrush.shadowOffsetY = parseInt(this.value, 10) || 0;
         this.previousSibling.innerHTML = this.value;
     };
      background.onchange = function(){
          console.log(this.value);
          canvas.backgroundColor = this.value;
          canvas.renderAll();
      }

     if (canvas.freeDrawingBrush) {
         canvas.freeDrawingBrush.color = drawingColorEl.value;
         canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
         canvas.freeDrawingBrush.shadowBlur = 0;
     }

     svgConsole.value = ('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"' +
     ' "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" version="1.1"' +
     ' xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>');

     loadSvg.onclick = function(){
        _loadSVG(svgConsole.value);
     }
     deleteSvg.onclick = function(){
         if( canvas.getActiveObject() && canvas.getActiveObject().isSvg ){
         canvas.remove(canvas.getActiveObject());
        }
     };

     var _loadSVG = function(svg) {
     fabric.loadSVGFromString(svg, function(objects, options) {
         var obj = fabric.util.groupSVGElements(objects, options);
         obj.isSvg = true;
         canvas.add(obj).centerObject(obj).renderAll();
         obj.setCoords();
        });
     };

     $('h3:not(#drawBox)').click(function(){
         if (canvas.isDrawingMode){
             canvas.isDrawingMode = false;
             drawingModeEl.innerHTML = 'Enter drawing mode';
             drawingOptionsEl.style.display = 'none';
         }
     });

      setOverlay.onclick = function(){
          if (imageSource){
              canvas.controlsAboveOverlay = true;
              canvas.setOverlayImage(imageSource.value, canvas.renderAll.bind(canvas));
          }
      };
      deleteOverlay.onclick = function(){
          canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));
      }

  })();
