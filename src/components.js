/**
 * Created with PyCharm.
 * User: Dani
 * Date: 17/08/13
 * Time: 13:43
 * To change this template use File | Settings | File Templates.
 */


// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
    init: function() {
        this.attr({
//            w: Game.map_grid.tile.width,
//            h: Game.map_grid.tile.height
            w: 32,
            h: 24
        })
    },

    // Locate this entity at the given position on the grid
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return {
                x: this.x/Game.map_grid.tile.width + MARGIN,
                y: this.y/Game.map_grid.tile.height + MARGIN
            }
        } else {
            this.attr({
                x: x * Game.map_grid.tile.width + MARGIN,
                y: y * Game.map_grid.tile.height + MARGIN
            });
            return this;
        }
    }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    },
    setDirection: function(newDirection) {
        this._direction = newDirection;
    },


    getDirection: function() {
        return this._direction;
    }
});

Crafty.c('Wall', {
    init: function() {
        this.requires('Actor, Color, Solid, spr_wall');
        this.color('rgba(20, 125, 40, 0)');
    }
});

Crafty.c('Box', {
    init: function() {
        this.requires('Actor, Color, spr_box, Solid, Collision')
            .color('rgba(20, 45, 40, 0)')
            .stopOnSolids();
    },


    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Wall', this.stopMovement);
        this.onHit('Box', this.stopMovement);
        return this;
    },

    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        this.move(this.getDirection(),-MOVEMENT_UNITS);
    }
});

Crafty.c('StoreBox', {
    init: function() {
        this.requires('Actor, Color, spr_store');
        this.color('rgba(20, 125, 40,0)');
    }
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Fourway, Color, spr_player,Collision, SpriteAnimation')
            .fourway(MOVEMENT_UNITS)
            .stopOnWall()
            .moveBoxs()
            .animate('PlayerMovingUp',    0, 2, 2)
            .animate('PlayerMovingRight', 0, 3, 2)
            .animate('PlayerMovingDown',  0, 0, 2)
            .animate('PlayerMovingLeft',  0, 1, 2);

        // Watch for a change of direction and switch animations accordingly
        var animation_speed = 8;
        this.bind('NewDirection', function(data) {
            if (data.x > 0) {
                this.setDirection('e');
                this.animate('PlayerMovingRight', animation_speed, -1);
            } else if (data.x < 0) {
                this.setDirection('w');
                this.animate('PlayerMovingLeft', animation_speed, -1);
            } else if (data.y > 0) {
                this.setDirection('s');
                this.animate('PlayerMovingDown', animation_speed, -1);
            } else if (data.y < 0) {
                this.setDirection('n');
                this.animate('PlayerMovingUp', animation_speed, -1);
            } else {
                this.stop();
            }
        });
        this.attr({
            w: 32,
            h: 32
        })
    },



    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnWall: function() {
        this.onHit('Wall', this.stopMovement);
        return this;
    },
//    stopY: function() {
//        this.onHit('StopY', this.stopMovementY);
//        return this;
//    },
//    stopX: function() {
//        this.onHit('stopX', this.stopMovementX);
//        return this;
//    },

    moveBoxs: function() {

        this.onHit('Box',  function(ent){
            var box = ent[0].obj;

            box.move(this.getDirection(), MOVEMENT_UNITS);
            this.move(this.getDirection(), -MOVEMENT_UNITS);
            box.setDirection(this.getDirection());
//            box.requires('Actor, Color, spr_box, Collision')
//            box.attr('_y', box._y + 4);
            this.stopMovement
        });
        return this;
    },

    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        if (this._movement) {
            this.x -= this._movement.x;
            this.y -= this._movement.y;
        }
    }

//    // Stops the movement
//    stopMovementY: function() {
//        if (this.getDirection() == 'n' || this.getDirection() == 's' ) {
//            this.stopMovement();
//        }
//    },
//
//    stopMovementX: function() {
//        if (this.getDirection() == 'e' || this.getDirection() == 'w' ) {
//            this.stopMovement();
//        }
//    },
});

