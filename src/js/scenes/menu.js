/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:58
 * To change this template use File | Settings | File Templates.
 */

Crafty.scene('Menu', function(){
//    Crafty.audio.play("bgMusic", -1);

    Crafty.background('url("assets/images/bg-game.png")');
    LIVES = 3;
    $('#scoreboard').hide();
    $('#ingameMenu').hide();

    var player = Crafty.e('PlayerCharacterMenu').at(-1,-1);
    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('Play')
        .attr({ x:250 , y: 110, w: 200, h: 60 })
        .textFont({ size: '100px', family: 'font-menu' })
        .textColor('#ffff00',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 265;
            player.y = 170;
            player.animate('PlayerMovingRight', 8, -1);
            player.tween({x: 700}, 150);
            this.textColor('#ff0000',1);
            this.tween({x: 700}, 155).bind('TweenEnd', function(e) {
                if (localStorage != undefined && localStorage.levels_completed){
                    CURRENT_LEVEL = localStorage.levels_completed;
                }
                Crafty.scene('Level');
            });

        })
        .bind('MouseOver', function(e) {
            this.textColor('#000000',1);
        })
        .bind('MouseOut', function(e) {
            this.textColor('#ffff00',1);
        });


    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('Levels')
        .attr({ x:250 , y: 220, w: 200, h: 60 })
        .textFont({ size: '60px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 280;
            player.y = 250;
            player.animate('PlayerMovingRight', 8, -1);
            player.tween({x: 700}, 150);
            this.textColor('#ff0000',1);
            this.tween({x: 700}, 155);

        })
        .bind('MouseOver', function(e) {
            this.textColor('#ff0000',1);
        })
        .bind('MouseOut', function(e) {
            this.textColor('#ffffff',1);
        })
        .bind('TweenEnd', function(e) {
            Crafty.scene('Select Level');
        });

    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('Options')
        .attr({ x:250 , y: 270, w: 200, h: 60 })
        .textFont({ size: '60px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 255;
            player.y = 295;
            player.animate('PlayerMovingRight', 8, -1);
            player.tween({x: 700}, 150);
            this.textColor('#ff0000',1);
            this.tween({x: 700}, 150);

        })
        .bind('MouseOver', function(e) {
            this.textColor('#ff0000',1);
        })
        .bind('MouseOut', function(e) {
            this.textColor('#ffffff',1);
        })
        .bind('TweenEnd', function(e) {
            Crafty.scene('Options');
        });




    var textAbout = Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('About')
        .attr({ x:250 , y: 320, w: 200, h: 60 })
        .textFont({ size: '60px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 275;
            player.y = 350;
            player.animate('PlayerMovingRight', 8, -1);
            player.tween({x: 700}, 150);
            this.textColor('#ff0000',1);
            this.tween({x: 700}, 155);

        })
        .bind('MouseOver', function(e) {
            this.textColor('#ff0000',1);
        })
        .bind('MouseOut', function(e) {
            this.textColor('#ffffff',1);
        })
        .bind('TweenEnd', function(e) {
            Crafty.scene('About');
        });


});