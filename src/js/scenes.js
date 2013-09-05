/**
 * Created with PyCharm.
 * User: Dani
 * Date: 17/08/13
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

var text_css = { 'text-align': 'center', 'border': '1px solid red' }

Crafty.scene('Level', function() {

    Crafty.background('url("assets/Blue.png")');
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
    Crafty.audio.play("bgMusic", -1);

    $('#scoreboard').hide();

    Crafty.background('url("assets/Blue.png")');
    Crafty.e('2D, DOM, Mouse, btn_play')
        .attr({ x:250 , y: 200, w: 200, h: 60 })
        .bind('Click', function() {alert('hola');})


});



// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.background('url("assets/Blue.png")');
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
    Crafty.background('url("assets/Blue.png")');
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
    Crafty.background('url("assets/Blue.png")');
    Crafty.e('2D, DOM, Text')
        .text('Game Over!!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

});


Crafty.scene('Level complete', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.background('url("assets/Blue.png")');
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
