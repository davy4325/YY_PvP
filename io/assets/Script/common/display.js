
cc.Class({
    extends: cc.Component,

    properties: {
        type: 'center',
        ins: 1,
        canvasHeight: 1138,
        canvasWidth: 640
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var sun = this;
        var viewHeight = window.innerHeight;
        var viewWidth = window.innerWidth;
        var canvasProportion = 1138 / 640;
        var viewProportion = viewHeight / viewWidth;

        // var sun = this;
        // var windowHeight = window.innerHeight;
        // var windowWidth = window.innerWidth;
        // var x = sun.canvasHeight / sun.canvasWidth;
        // var y = windowHeight / windowWidth;
        // sun.ins = x / y;
        // sun.portrait = ((sun.canvasHeight - sun.canvasHeight * sun.ins) / 2) / sun.ins;
        switch (sun.type) {
            case 'top':
                console.log(((1138 - 1138 * (canvasProportion / viewProportion)) / 2) / (canvasProportion / viewProportion));
                sun.node.y += ((1138 - 1138 * (canvasProportion / viewProportion)) / 2) / (canvasProportion / viewProportion);
            case 'bottom':
                sun.node.y -= ((1138 - 1138 * (canvasProportion / viewProportion)) / 2) / (canvasProportion / viewProportion);
                break;
            case 'center':

                break;

            default:
                break;
        }
        sun.node.scale *= (canvasProportion / viewProportion);
    },
});
