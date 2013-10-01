//Constantes mapa
var MOVEMENT_UNITS  = 4;

var EMPTY           = 0;
var WALL            = 1;
var FINISH          = 2;
var BOX             = 3;
var FINISH_AND_BOX  = 4;

var MARGIN          = 0;

var LIVES           = 3;
var SECONDS         = 100;

/**
 * Contador del tiempo de juego
 */
var TOTAL_LEVELS    = 100;
var CURRENT_LEVEL   = 1;
var level_timer;

var text_css = { 'text-align': 'center' }


Game = {
    map_grid: {
        width:  35,
        height: 35,
        tile: {
          width:  32, // 48
          height: 32  // 32
        }
    },



    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function() {
         // return this.map_grid.width * this.map_grid.tile.width;

        return 640;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function() {
        // return this.map_grid.height * this.map_grid.tile.height;

        return 480;
    },

    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height(), 'game');

        //Add Canvas Element
        Crafty.canvas.init();
        //Set canvas under interface
        Crafty.canvas._canvas.style.zIndex = '0';

        // Simply start the "Game" scene to get things going
        Crafty.scene('Loading');

    }
}