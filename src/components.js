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
    },

    setSpeed: function(s) {
        this._speed = s;
    },

    getSpeed: function() {
        return this._speed;
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
        this.attr('z', 1000);
        this._onFinish = false;
    },


    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function() {
        this.onHit('Wall', this.stopMovement);

        this.onHit('Box', this.stopByBox);

        this.onHit('StoreBox', function(ent){
            finishPoint =  ent[0].obj;
            this.checkOnFinishPoint(finishPoint);
        });

        return this;
    },

    checkOnFinish: function() {
        var box = this;
        var isOnFinish = false;

        Crafty('StoreBox').each(function() {
            if (!isOnFinish) {
                isOnFinish = box.checkOnFinishPoint(this);
            }
        });
        box._onFinish = isOnFinish;
    },

    checkOnFinishPoint: function(finishPoint) {
        posFinish = finishPoint.pos();
        posBox = this.pos();
        if (posFinish['_x'] == posBox['_x'] && posFinish['_y'] == posBox['_y']) {
           return true;
        } else {
            return false;
        }
    },

    // Stops the movement
    stopMovement: function() {
        this._speed = 0;
        if (this.getDirection() != undefined) {
            this.moveBox(this.getDirection(),-MOVEMENT_UNITS);
        }
    },

    stopByBox: function() {
        if (this.isMoving()) {
            this.moveBox(this.getDirection(),-MOVEMENT_UNITS);
        }
        this._speed = 0;
    },

    isMoving: function() {
        return this.getSpeed() != 0;
    },

    moveBox: function(direction, pixels) {
        this.move(direction, pixels);

        this.checkOnFinish();

        if (this.isOnFinish()) {
            this.addComponent('spr_box_finish');
            this.removeComponent('spr_box');
        } else {
            this.addComponent('spr_box');
            this.removeComponent('spr_box_finish');
        }
    },

    isOnFinish: function() {
        return this._onFinish;
//        if (this.is)
    }
});

Crafty.c('StoreBox', {
    init: function() {
        this.requires('Actor, Color, spr_store');
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
            w: 24,
            h: 24
        })
    },



    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnWall: function() {
        this.onHit('Wall', this.stopMovement);
        return this;
    },

    moveBoxs: function() {

        this.onHit('Box',  function(ent){
            var box = ent[0].obj;
            box.moveBox(this.getDirection(), MOVEMENT_UNITS);
            box.setDirection(this.getDirection());
            box.setSpeed(4);
            this.stopMovement();
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

});

