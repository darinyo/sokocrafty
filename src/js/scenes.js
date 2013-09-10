/**
 * Created with PyCharm.
 * User: Dani
 * Date: 17/08/13
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

var text_css = { 'text-align': 'center' }

Crafty.scene('Level', function() {

//    Crafty.background('url("assets/images/bg1.jpg")');
    $('#scoreboard').show();


    var current_level = levels[CURRENT_LEVEL];
    // Pintamos el mapa
    for( var i=12; i>=0; i--){
        for( var j=21; j > 0; j--){
            var element = '';
            switch (current_level[i][j]) {
                case WALL:
                    element = 'Wall';
                    break;
                case BOX:
                    element = 'Box';
                    break;
                case FINISH:
                    element = 'StoreBox';
                    break;
            }
            if (element != ''){
                Crafty.e(element).at(j, i);
            }
        }
    }

    $('#lives').html('0'+LIVES);
    $('#boxsOnFinish').html(0);
    $('#total_boxs').html(current_level['boxes']);
    $('#time').html(current_level['time']);
    $('#level').html('0'+current_level['level']);

    var seconds = current_level['time'];

    level_timer = window.setInterval(function(){
        seconds --;
        $('#time').html(seconds);
        if (seconds == 0) {
            LIVES--;
            $('#lives').html('0'+LIVES);
            window.clearInterval(level_timer);
            if (LIVES == 0) {
                Crafty.scene('Game Over');
            } else {
                Crafty.scene('Time Over');
            }
        }
    },1000);


    // Situamos al jugador
    Crafty.e('PlayerCharacter').at(12, 9);
});

Crafty.scene('Menu', function(){
//    Crafty.audio.play("bgMusic", -1);

    $('#scoreboard').hide();

    var player = Crafty.e('PlayerCharacterMenu').at(-1,-1);
    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('Play')
        .attr({ x:250 , y: 100, w: 200, h: 60 })
        .textFont({ size: '36px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 260;
            player.y = 115;
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
            Crafty.scene('Level');
        });

    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('Levels')
        .attr({ x:250 , y: 170, w: 200, h: 60 })
        .textFont({ size: '24px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 275;
            player.y = 170;
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
        .attr({ x:250 , y: 220, w: 200, h: 60 })
        .textFont({ size: '24px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 250;
            player.y = 220;
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




    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text('About')
        .attr({ x:250 , y: 270, w: 200, h: 60 })
        .textFont({ size: '24px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function() {

            player.x = 270;
            player.y = 270;
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


Crafty.scene('Select Level', function() {

    for (var i=0; i<TOTAL_LEVELS; i++) {
        var x_col = i%3;
        var y_row = Math.floor(i/3);
        var y_pos = 100 + y_row*160;
        var x_pos = 30 + x_col*200;


//        Crafty.viewport.mouselook(true);

        Crafty.e('2D, DOM, Text')
            .text('Select Level')
            .attr({ x:140 , y: 30, w: 400, h: 30})
            .textFont({ size: '32px', family: 'font-menu' })
            .textColor('#adadad')
            .css(text_css)
            .unselectable()

        Crafty.e('2D, DOM, Mouse, Text')
            .text('Level ' + ((i*1)+1))
            .attr({ x:x_pos , y: y_pos, w: 200, h: 25, level: i+1})
            .textFont({ size: '24px', family: 'Faster One' })
            .textColor('#adadad')
            .css(text_css)
            .unselectable()
            .bind('Click', function() {
                CURRENT_LEVEL = this.attr('level');
                Crafty.scene('Level');
            });


        Crafty.e('2D, DOM, Mouse, Image')
            .attr({ x:x_pos + 30 , y: y_pos + 30, w: 100, h: 58, level: i+1})
            .image("assets/images/level1.png")
            .bind('Click', function() {
                CURRENT_LEVEL = this.attr('level');
                Crafty.scene('Level');
            });
    }

    Crafty.e('2D, DOM, Mouse, Image')
        .attr({ x:600 , y: 50, w: 50, h: 50})
        .image("assets/images/FlechaUp.png")
        .bind('Click', function() {
            Crafty.viewport.pan('y', -25, 60);
        });

    Crafty.e('2D, DOM, Mouse, Image')
        .attr({ x:600 , y: 350, w: 50, h: 50})
        .image("assets/images/FlechaDown.png")
        .bind('Click', function() {
            Crafty.viewport.pan('y', 50, 30);
            var current_y = this.attr('y');
            this.attr('y', current_y+50);
        });


});



// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){

    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.background('url("assets/images/bg2.jpg")');


    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();


    // Load our sprite map image
    Crafty.load([
        'assets/wall2.png',
        'assets/Bstore2.png',
        'assets/spr_player_128.png',
        'assets/box.png',
        'assets/box_finish.png',
        'assets/play-button.gif'
        ], function(){
        // Once the image is loaded...

        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
            Crafty.sprite(32, 32, 'assets/wall2.png', {
          spr_wall:    [0, 0]
        });

        Crafty.sprite(32, 32, 'assets/Bstore2.png', {
          spr_store:    [0, 0]
        });

        Crafty.sprite(200, 60, 'assets/play-button.gif', {
            btn_play:    [0, 0]
        });

        // Define the PC's sprite to be the first sprite in the third row of the
        //  animation sprite map
        Crafty.sprite(32, 32, 'assets/spr_player_128.png', {
          spr_player:  [0, 2]
        }, 0, 0);

        Crafty.sprite(32, 'assets/box.png', {
            spr_box:  [0, 0]
        });

        Crafty.sprite(32, 'assets/box_finish.png', {
            spr_box_finish:  [0, 0]
        });

        Crafty.audio.add("bgMusic", "assets/sounds/bg-music.mp3");


        // Now that our sprites are ready to draw, start the game
        setTimeout("Crafty.scene('Menu')",0);
    })
});

Crafty.scene('Time Over', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Time Over!! Try Again')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

    // Now that our sprites are ready to draw, start the game
    setTimeout("Crafty.scene('Level')",2000);
});


Crafty.scene('Game Over', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Game Over!!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

});


Crafty.scene('Level completed', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Level completed!!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

    // Now that our sprites are ready to draw, start the game
    setTimeout("Crafty.scene('Level')",2000);
});
