
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
         imageLeft = getElem('imageLeft'),
         imageTop = getElem('imageTop'),
         deleteSvg = getElem('deleteSvg'),
         uploadImg = getElem('uploadImg'),
         uploadImg = getElem('uploadImg'),
         imageOpacity = getElem('imgOpacity'),
         imgShadowOffsetX = getElem('mgShadowOffsetX');


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
             canvas.freeDrawingBrush.shadow = {
                 color:drawingShadowColorEl.value,
                 blur: parseInt(drawingShadowWidth.value, 10) || 0,
                 offsetX:parseInt(drawingShadowOffset.value, 10) || 0,
                 offsetY:parseInt(drawingShadowOffset.value, 10) || 0
             }
         }
     };
      canvas.freeDrawingBrush.shadow = {};
     drawingColorEl.onchange = function() {
        canvas.freeDrawingBrush.color = this.value;
     };
     drawingShadowColorEl.onchange = function() {
        canvas.freeDrawingBrush.shadow['color'] = this.value;
     };
     drawingLineWidthEl.onchange = function() {
         canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
         this.previousSibling.innerHTML = this.value;
     };
     drawingShadowWidth.onchange = function() {
         canvas.freeDrawingBrush.shadow['blur'] = parseInt(this.value, 10) || 0;
         this.previousSibling.innerHTML = this.value;
     };
     drawingShadowOffset.onchange = function() {
         canvas.freeDrawingBrush.shadow['offsetX'] =
         canvas.freeDrawingBrush.shadow['offsetY'] = parseInt(this.value, 10) || 0;
         this.previousSibling.innerHTML = this.value;
     };
      background.onchange = function(){
          console.log(this.value);
          canvas.backgroundColor = this.value;
          canvas.renderAll();
      }
      imageOpacity.onchange = function() {
          var opacity = this.value;
          var obj = canvas.getActiveObject();
          if( obj && canvas.getActiveObject().isImg ){
              obj.setOpacity(+opacity);
              canvas.renderAll();
          }
          this.previousSibling.innerHTML = opacity;
      };
      $('#imgShadowColor, #imgShadowOffsetX,#imgShadowBlur').on('change',function(e){
          var value = this.value;
          var obj = canvas.getActiveObject();
          if( obj && canvas.getActiveObject().isImg){
              obj.setShadow({
                  color: $('#imgShadowColor').val(),
                  blur: $('#imgShadowBlur').val(),
                  offsetX: $('#imgShadowOffsetX').val()
              });
              canvas.renderAll();
          }
          this.previousSibling.innerHTML = value;
      });

     function flipImage(direction,object){
         object.on ('click',function(){
             var obj = canvas.getActiveObject();

             if( obj && canvas.getActiveObject().isImg){
                 if(!obj[direction]){
                     obj[direction] = true;
                     canvas.renderAll();
                 } else {
                     obj[direction] = false;
                     canvas.renderAll();
                 }
             }
         });
     }

     flipImage('flipX',$('#imageFlipX'));
     flipImage('flipY',$('#imageFlipY'));

     $('#deleteImage').click(function(){
         var obj = canvas.getActiveObject();
         if( obj && canvas.getActiveObject().isImg){
            canvas.remove(obj);
         }
     })

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
              fabric.overlayImageStretch = true
              canvas.setOverlayImage(imageSource.value, canvas.renderAll.bind(canvas), {
                  left: 0,
                  top: 0
              });
          }
      };

      deleteOverlay.onclick = function(){
          canvas.setOverlayImage(null, canvas.renderAll.bind(canvas));
      };

      $('#imageTop,#imageLeft').change(function(){
          if(imageSource.value){
              canvas.setOverlayImage(imageSource.value, canvas.renderAll.bind(canvas), {
                  left: +imageLeft.value,
                  top: +imageTop.value
              });
          }
          this.previousSibling.innerHTML = this.value;
      });

      uploadImg.onchange = function handleImage(e) {
          var reader = new FileReader();
          reader.onload = function (event) {
              var imgObj = new Image();
              imgObj.src = event.target.result;
              console.log(imgObj.src);
              imgObj.onload = function () {

                  var image = new fabric.Image(imgObj);
                  image.set({
                      left: 100,
                      top: 100,
                      isImg: true
                  });
                  canvas.add(image);
              }
          }
          reader.readAsDataURL(e.target.files[0]);
          console.log(e.target.files[0]);
      }
      //filters section

      function applyFilter(index, filter) {
          var obj = canvas.getActiveObject();
          obj.filters[index] = filter;
          obj.applyFilters(canvas.renderAll.bind(canvas));
      }

      var filters = ['grayscale', 'invert', 'sepia', 'sharpen'];

      $('#filterMode').change(function() {
          console.log($(this).val());
          switch ($(this).val()){
              case 'grayscale': applyFilter(0,new fabric.Image.filters.Grayscale());
                break;
              case 'invert': applyFilter(0,new fabric.Image.filters.Invert());
                break;
              case 'sepia': applyFilter(0, new fabric.Image.filters.Sepia());
                break;
              case 'sharpen': applyFilter(0, new fabric.Image.filters.Convolute({
                  matrix: [  0, -1,  0,
                      -1,  5, -1,
                      0, -1,  0 ]
              }));
                  break;
              default : alert('unrecognized');
                break;
          }
      });

  })();
