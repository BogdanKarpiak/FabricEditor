var canvas = new fabric.Canvas();
canvasField = {
    init: function() {
        var container = $(".canvasField");
        this.canvas = new fabric.Canvas("myCanvas");
        this.canvas.setDimensions({
            width: container.width(),
            height: container.height()
        });
        this.textObjectsArr = [];
    }
};

canvasField.init();