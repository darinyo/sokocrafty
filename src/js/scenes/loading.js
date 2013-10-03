/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:56
 * To change this template use File | Settings | File Templates.
 */


// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){

    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.background('url("assets/images/bg.png")');


    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

    Crafty.audio.add("alarm", "assets/sounds/alarm.mp3");

    // Load our sprite map image
    Crafty.load([
        'assets/images/wall2.png',
        'assets/images/box_store.png',
        'assets/images/spr_player_128.png',
        'assets/images/box.png',
        'assets/images/box_finish.png',
        'assets/images/fruits_new.png',
        ''
        ], function(){
        // Once the image is loaded...

        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
            Crafty.sprite(32, 32, 'assets/images/wall2.png', {
          spr_wall:    [0, 0]
        });

        Crafty.sprite(32, 32, 'assets/images/box_store.png', {
          spr_store:    [0, 0]
        });

        // Define the PC's sprite to be the first sprite in the third row of the
        //  animation sprite map
        Crafty.sprite(32, 32, 'assets/images/spr_player_128.png', {
          spr_player:  [0, 2]
        }, 0, 0);

        Crafty.sprite(32, 'assets/images/box.png', {
            spr_box:  [0, 0]
        });

        Crafty.sprite(32, 'assets/images/box_finish.png', {
            spr_box_finish:  [0, 0]
        });

        Crafty.sprite(24, 24, 'assets/images/fruits_new.png', {
            spr_naranja:    [0, 0],
            spr_pera:       [0, 1],
            spr_manzana:    [0, 2],
            spr_frambuesa:  [0, 3],
            spr_uva:        [0, 4],
            spr_fresa:      [0, 5],
            spr_limon:      [0, 6],
            spr_cereza:     [0, 7],
            spr_sandia:     [0, 8]
        },0,0);

        Crafty.audio.add("bgMusic", "assets/sounds/bg-music.mp3");


        // Now that our sprites are ready to draw, start the game
        setTimeout("Crafty.scene('Menu')",0);
    })
});