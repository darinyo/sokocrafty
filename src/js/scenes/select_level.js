/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:56
 * To change this template use File | Settings | File Templates.
 */
Crafty.scene('Select Level', function() {

    Crafty.background('url("assets/images/bg2.jpg")');

    if(typeof(Storage)!=="undefined") {
        var levels_completed = localStorage.levels_completed;
        if (!levels_completed) {
            levels_completed = 1;
        }
    }

    var loadLevel = function() {
        CURRENT_LEVEL = this.attr('level');
        Crafty.scene('Level');
    };

    var levelBlocked = function() {
        alert('Sorry, level blocked');
    }


    for (var i=0; i<TOTAL_LEVELS; i++) {
        var x_col = i%3;
        var y_row = Math.floor(i/3);
        var y_pos = 100 + y_row*160;
        var x_pos = 30 + x_col*200;


        Crafty.e('2D, DOM, Text')
            .text('Select Level')
            .attr({ x:140 , y: 30, w: 400, h: 30})
            .textFont({ size: '32px', family: 'font-menu' })
            .textColor('#adadad')
            .css(text_css)
            .unselectable()



        if ( i==0 || levels_completed > i) {
            var image = "assets/images/level"+(i+1)+".png";
            var attr = { x:x_pos + 30 , y: y_pos + 30, w: 100, h: 58, level: i+1};
            var onclick = loadLevel;

        } else {
            var image = "assets/images/candado.png";
            var attr = { x:x_pos + 75 , y: y_pos + 30, w: 100, h: 58, level: i+1};
            // var onclick = levelBlocked;
            var onclick = levelBlocked;
        }

        // TEXT NUM LEVEL
        Crafty.e('2D, DOM, Mouse, Text')
            .text('Level ' + ((i*1)+1))
            .attr({ x:x_pos , y: y_pos, w: 200, h: 25, level: i+1})
            .textFont({ size: '24px', family: 'Faster One' })
            .textColor('#adadad')
            .css(text_css)
            .unselectable()
            .bind('Click', onclick);

        // IMAGE LEVEL
        Crafty.e('2D, DOM, Mouse, Image')
            .attr(attr)
            .image(image)
            .bind('Click', onclick);
    }

    var ARROW_X_DELTA = 580;
    var ARROW_UP_Y_DELTA = 30;
    var ARROW_DOWN_Y_DELTA = 390;

    Crafty.e('2D, DOM, Mouse, Image, Arrow')
        .image("assets/images/FlechaUp.png")
        .bind('MouseDown', function() {
            scrollup = true;
        })
        .bind('MouseUp', function() {
            scrollup = false;
        })
        .bind('EnterFrame', function(){
            this.attr({ x:Math.abs(Crafty.viewport._x) + ARROW_X_DELTA , y: Math.abs(Crafty.viewport._y) + ARROW_UP_Y_DELTA, z:2, w: 50, h: 50});
            if (scrollup && !scrolling) {
                scrolling = true;
                moveViewport('y', -60, 10);
                scrolling = false;
            }
        });

    Crafty.e('2D, DOM, Mouse, Image, Arrow')
        .image("assets/images/FlechaDown.png")
        .bind('MouseDown', function() {
            scrolldown = true;
        })
        .bind('MouseUp', function() {
            scrolldown = false;
        })
        .bind('EnterFrame', function(){
            this.attr({ _x:Math.abs(Crafty.viewport._x) + ARROW_X_DELTA , _y: Math.abs(Crafty.viewport._y) + ARROW_DOWN_Y_DELTA, z:2, w: 50, h: 50});
            if (scrolldown && !scrolling) {
                scrolling = true;
                moveViewport('y', 60, 10);
                scrolling = false;
            }
        });

    var scrolldown = false;
    var scrollup = false;
    var scrolling = false;

    function moveViewport(axis, pixels, frames) {
        Crafty.viewport.pan(axis, pixels, frames);
    }
});
