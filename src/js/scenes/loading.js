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


    // Load our sprite map image
    Crafty.load([
        'assets/wall2.png',
        'assets/Bstore2.png',
        'assets/spr_player_128.png',
        'assets/box.png',
        'assets/box_finish.png',
        'assets/test.png'
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

        Crafty.sprite(32, 'assets/test.png', {
            spr_fruit:  [0, 0]
        });

        Crafty.audio.add("bgMusic", "assets/sounds/bg-music.mp3");


        // Now that our sprites are ready to draw, start the game
        setTimeout("Crafty.scene('Menu')",0);
    })
});