/**
 * Created with PyCharm.
 * User: Dani
 * Date: 17/08/13
 * Time: 14:40
 * To change this template use File | Settings | File Templates.
 */

Crafty.scene('Level', function() {

    //MAPA INICIAL
    var map = new Array();
    map[0]  = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    map[1]  = new Array(0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
    map[2]  = new Array(0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0);
    map[3]  = new Array(0,0,0,0,0,1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0);
    map[4]  = new Array(0,0,0,1,1,1,0,0,3,0,1,0,0,0,0,0,0,0,0,0,0);
    map[5]  = new Array(0,0,0,1,0,0,3,0,3,0,1,0,0,0,0,0,0,0,0,0,0);
    map[6]  = new Array(0,1,1,1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1,0);
    map[7]  = new Array(0,1,0,0,0,1,0,1,1,0,1,1,1,1,1,0,0,2,2,1,0);
    map[8]  = new Array(0,1,0,3,0,0,3,0,0,0,0,0,0,0,0,0,0,2,2,1,0);
    map[9]  = new Array(0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,0,0,2,2,1,0);
    map[10] = new Array(0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0);
    map[11] = new Array(0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0);
    map[12] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    map['boxes'] = 6;
    map['time'] = 90;
    map['level'] = 1;

    Crafty.background('url("assets/Blue.png")');
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

        $('#lives').html('0'+LIVES);
        $('#boxsOnFinish').html(0);
        $('#total_boxs').html(map['boxes']);
        $('#time').html(map['time']);
        $('#level').html('0'+map['level']);

    }

    // Situamos al jugador
    Crafty.e('PlayerCharacter').at(12, 9);
});


// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.background('url("assets/Blue.png")');
    Crafty.e('2D, DOM, Text, Tween')
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
        'assets/box_finish.png'
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


        // Now that our sprites are ready to draw, start the game
        setTimeout("Crafty.scene('Level')",2000);
    })
});
