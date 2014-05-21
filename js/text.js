textTab = {
    init: function() {
        var $opacitySlider = $("#opacitySlider");
        var $textAddInput = $("#textAddInput");
        var $addButton = $("#addButton");
        var $delButton = $("#delButton");
        var $accordion = $("#accordion");
        var $bold = $("#bold").next();
        var $italic = $("#italic").next();
        var $underline = $("#underlined").next();
        var $fontStyleGroup = $("#fontStyleGroup");
        var $spinner = $("#spinner");
        var $shadowXoffset = $("#shadow-x-offset");
        var $shadowYoffset = $("#shadow-y-offset");
        var $blur = $("#shadow-blur");
        var $color = $("input[type=color]");
        var panelWidth = $accordion.find(".ui-accordion-content").width();

        function setActiveTextDecoration($thisObj, optionValue) {
            if( !!(canvasField.activeText) ) {
                if( !$thisObj.hasClass("ui-state-active")) {
                    switch (optionValue) {
                        case "underline": { canvasField.activeText.setTextDecoration(optionValue); } break;
                        case "bold": { canvasField.activeText.setFontWeight(optionValue); } break;
                        case "italic": { canvasField.activeText.setFontStyle(optionValue); } break;
                    }
                } else {
                    switch (optionValue) {
                        case "underline": { canvasField.activeText.setTextDecoration(""); } break;
                        case "bold": { canvasField.activeText.setFontWeight(""); } break;
                        case "italic": { canvasField.activeText.setFontStyle(""); } break;
                    }
                }
                canvasField.canvas.renderAll();
            }
        }

        $spinner.spinner({
            max: 70,
            min: 10,
            step: 1,
            page: 5,
            numberFormat: "n"
        });

        $opacitySlider.slider({
            value: 1,
            step: 0.05,
            max: 1,
            min: 0,
            orientation: "horizontal",
            range: "min",
            animate: true,
            slide: function( event, ui ) {
                if(canvasField.activeText) {
                    canvasField.activeText.setOpacity(ui.value);
                    canvasField.canvas.renderAll();
                } else {
                    ui.value = 1;
                }
            }
        });
        $shadowXoffset.slider({
            value: 0,
            step: 1,
            max: 20,
            min: 0,
            orientation: "horizontal",
            range: "min",
            animate: true,
            slide: function(event, ui) {
                if(canvasField.activeText) {
                    canvasField.activeText.setShadow("" + $color.val() + " " + ui.value + "px " + $shadowYoffset.slider("value") + "px " + $blur.slider("value") + "px");
                    canvasField.canvas.renderAll();
                } else {
                    ui.value = 1;
                }
            }
        });
        $shadowYoffset.slider({
            value: 0,
            step: 1,
            max: 20,
            min: 0,
            orientation: "horizontal",
            range: "min",
            animate: true
        });
        $blur.slider({
            value: 0,
            step: 1,
            max: 20,
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
                fontSize: $spinner.spinner("value"),
                fill: color,
                textAlign: "center",
                opacity: $opacitySlider.slider("value"),
                //color: $color.val(),
                shadow: "" + $color.val() + " " + $shadowXoffset.slider("value") + "px " + $shadowYoffset.slider("value") + "px " + $blur.slider("value") + "px"
            });
            canvas.on('mouse:down', function(options) {
                if (options.target && options.target.type == "text") {
                    canvasField.activeText = options.target;
                    if(canvasField.activeText.getTextDecoration()) { $underline.addClass("ui-state-active") }
                    if(canvasField.activeText.getFontStyle()) { $italic.addClass("ui-state-active") }
                    if(canvasField.activeText.getFontWeight() == "bold") { $bold.addClass("ui-state-active") }
                } else {
                    canvasField.activeText = undefined;
                    $underline.removeClass("ui-state-active");
                    $bold.removeClass("ui-state-active");
                    $italic.removeClass("ui-state-active");
                }
            });
            textObj.set("left", canvas.getWidth()/2 - textObj.getBoundingRectWidth()/2);
            textObj.set("top", canvas.getHeight()/2 - textObj.getBoundingRectHeight()/2);
            canvas.add(textObj);
            //canvas.renderAll();
            canvasField.textObjectsArr.push(textObj);
        })
        $bold.on("click", function() {
            setActiveTextDecoration($bold, "bold")
        });
        $italic.on("click", function() {
            setActiveTextDecoration($italic, "italic")
        })
        $underline.on("click", function() {
            setActiveTextDecoration($underline, "underline")
        })
        $delButton.on("click", function() {
            if(canvasField.activeText) {
                canvasField.activeText.remove();
                canvasField.canvas.renderAll();
            }
        })
    }
};
