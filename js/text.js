textTab = {
    init: function() {
        var $opacitySlider = $("#opacitySlider");
        var $brightnessSlider = $("#brightnessSlider");
        var $textAddInput = $("#textAddInput");
        var $addButton = $("#addButton");
        var $delButton = $("#delButton");
        var $accordion = $("#accordion");
        var $fontStyleGroup = $("#fontStyleGroup");
        var panelWidth = $accordion.find(".ui-accordion-content").width();

        $opacitySlider.slider({
            value: 1,
            step: 0.05,
            max: 1,
            min: 0,
            orientation: "horizontal",
            range: "min",
            animate: true
        });
        $brightnessSlider.slider({
            value: 1,
            step: 0.05,
            max: 1,
            min: 0,
            orientation: "horizontal",
            range: "min",
            animate: true
        });
        $textAddInput.css({
            width: 100 * panelWidth / 100 + "px",
            height: 40 + "px"
            //margin: "" + 80 * panelWidth / 100,
        });
        $opacitySlider.css({
            margin: "10px 0 10px 0"
        });
        $brightnessSlider.css({
            margin: "10px 0 10px 0"
        });
        $addButton.css({
            width: "50%",//15 * panelWidth / 100,
            //height: 40 + "px",
            marginTop: "15px"
        });
        $delButton.css({
            width: "50%",
            marginTop: "15px"
        });
        $fontStyleGroup.buttonset();

        $addButton.on("click", function() {
            var canvas = canvasField.canvas;
            var color = "black";
            var text = $textAddInput.val();
            var textObj = new fabric.Text(text, {
                fontSize: 30,
                fill: color,
                textAlign: "center",
                top: canvas.getHeight()/2
            });
            textObj.set("left", canvas.getWidth()/2 - textObj.getBoundingRectWidth()/2);
            textObj.set("top", canvas.getHeight()/2 - textObj.getBoundingRectHeight()/2);
            canvas.add(textObj);
            //canvas.renderAll();
            canvasField.textObjectsArr.push(textObj);
        })
    }
};
