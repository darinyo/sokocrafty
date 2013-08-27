/**
 * Created with PyCharm.
 * User: Dani
 * Date: 17/08/13
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

Crafty.scene('Game', function() {

    // Pintamos el mapa
    for( var i=12; i>=0; i--){
        for( var j=21; j > 0; j--){
            var element = '';
            switch (map[i][j]) {
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

    // Situamos al jugador
    Crafty.e('PlayerCharacter').at(16, 9);
});


// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Loading...')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .css($text_css);




    // Load our sprite map image
    Crafty.load([
        'assets/wall2.png',
        'assets/Bstore2.png',
        'assets/hunter.png',
        'assets/box.png'
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
        Crafty.sprite(16, 16, 'assets/hunter.png', {
          spr_player:  [0, 2]
        }, 0, 2);

        Crafty.sprite(32, 'assets/box.png', {
            spr_box:  [0, 0]
        });


        // Now that our sprites are ready to draw, start the game
        setTimeout("Crafty.scene('Game')",10);
    })
});
