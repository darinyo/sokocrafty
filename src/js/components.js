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
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
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

Crafty.c('Fruit', {
    init: function() {
        this.requires('Actor, Color, Solid');
        this.color('rgba(20, 125, 40, 0)');

        var pos = false;
        var posValid = false;
        while (!posValid) {
            pos = this.randomizePosition();
            if (pos) {
                posValid = this.checkPosValid(pos);
            }
        }
        this.at(pos.x, pos.y);
    },

    randomizePosition: function() {
        var current_level = levels[CURRENT_LEVEL];
        var rand_y =  Math.floor((Math.random()*current_level['height']));

        var max_x = 0;
        var min_x = 0;

        for( var j=current_level['width']-1; j>=0; j--){
            if (current_level[rand_y][j] == WALL) {
                if (j > max_x) {
                    max_x = j;
                }
                if (min_x == 0 || j < min_x) {
                    min_x = j;
                }
            }
        }

        if (max_x > 0) {
            var checkMin = true;
            var checkMax = true;
            while (checkMin && checkMax) {
                if (checkMin && current_level[rand_y][min_x+1] == WALL ) {
                    min_x++;
                } else {
                    checkMin = false;
                }

                if (checkMax && current_level[rand_y][max_x-1] == WALL ) {
                    max_x--;
                } else {
                    checkMax = false;
                }
            }
            max_x--;
            min_x++;
        }

        if (min_x > max_x) {
            return false;
        }
        if (min_x == 0 && max_x==0) {
            return false;
        }

        var rand_x = Math.floor((Math.random()*(max_x - min_x))+min_x);
        return {x:rand_x, y:rand_y};
    },

    checkPosValid: function(pos) {
        var current_level = levels[CURRENT_LEVEL];

        // Si es un wall return false
        if (current_level[pos.y][pos.x] == WALL) {
            return false;
        }

        // Si hay una caja return false;
        var fruitInBox = false;
        Crafty('Box').each(function() {
            boxPos = this.at();
            if (boxPos.x == pos.x && boxPos.y == pos.y) {
                fruitInBox = true;
                console.log('fruit In box');
                return;
            }
        });

        console.log(pos);
        console.log(fruitInBox);

        // Si no esta en una caja, la posicion es valida
        return !fruitInBox;
    }
});

Crafty.c('Lemon', {
    init: function() {
        this.requires('Fruit, spr_fruit');
        this.color('rgba(20, 125, 40, 0)');
    },
    eat: function(player) {
        MOVEMENT_UNITS = 4;
        player.removeComponent('Fourway');
        player.addComponent('Fourway');
        player.fourway(MOVEMENT_UNITS);
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

    checkOnFinish: function(checkLevelFinished) {
        var box = this;
        var isOnFinish = false;

        Crafty('StoreBox').each(function() {
            if (!isOnFinish) {
                isOnFinish = box.checkOnFinishPoint(this);
            }
        });
        box._onFinish = isOnFinish;

        if(checkLevelFinished && this.checkLevelFinished()) {
            CURRENT_LEVEL++;
            if (CURRENT_LEVEL > localStorage.levels_completed) {
                localStorage.levels_completed = CURRENT_LEVEL;
            }
            window.clearInterval(level_timer);
            Crafty.scene('Level completed');
        }
    },

    checkLevelFinished: function() {
        var levelFinished = true;
        var totalBoxes = 0;
        Crafty('Box').each(function() {
            if (!this.isOnFinish()) {
                levelFinished = false;
            } else {
                totalBoxes ++;
            }
        });
        $('#boxsOnFinish').text(totalBoxes);
        return levelFinished;
    },
    resetBoxDirections: function() {
        Crafty('Box').each(function() {
            this.setDirection(null);
        });
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

        if (this.getDirection() != undefined && this.getDirection() != null ) {
            this.moveBox(this.getDirection(),-MOVEMENT_UNITS);
            this.setDirection(null);
        }
    },

    stopByBox: function() {

        if (this.getDirection()) {
            this.moveBox(this.getDirection(),-MOVEMENT_UNITS);
            this.setDirection(null);

        }
        this._speed = 0;
    },

    isMoving: function() {
        return this.getSpeed() != 0;
    },

    moveBox: function(direction, pixels) {
        this.resetBoxDirections()
        this.setDirection(direction);
        this.setSpeed(pixels);
        this.move(direction, pixels);
        this.updateFinishTexture(true);
    },

    updateFinishTexture: function(checkLevelFinished) {
        this.checkOnFinish(checkLevelFinished);
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

Crafty.c('PlayerCharacterMenu', {
    init: function() {
        this.requires('Actor, spr_player, Collision, SpriteAnimation, Tween')
            .animate('PlayerMovingUp',    0, 2, 2)
            .animate('PlayerMovingRight', 0, 3, 2)
            .animate('PlayerMovingDown',  0, 0, 2)
            .animate('PlayerMovingLeft',  0, 1, 2);
        this.attr({
            w: 24,
            h: 24
        })
    }
});

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
    init: function() {
        this.requires('Actor, Fourway, Color, spr_player, Collision, SpriteAnimation')
            .fourway(MOVEMENT_UNITS)
            .stopOnWall()
            .moveBoxs()
            .eatSomeFruit()
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

    eatSomeFruit: function() {
        this.onHit('Fruit', function(ent){
            //console.log(ent);
            var fruit = ent[0].obj;
            fruit.eat(this);
            fruit.destroy();
        });
        return this;
    },

    moveBoxs: function() {

        this.onHit('Box',  function(ent){
            //console.log(ent);
            var box = ent[0].obj;
            if (this.canMoveBox(box,this.getDirection())){
                box.moveBox(this.getDirection(), MOVEMENT_UNITS);
            }
            this.stopMovement();
        });
        return this;
    },

    canMoveBox: function(box, direction) {
        posBox = box.pos();
        posPlayer = this.pos();

        switch (direction) {
            case 'w':
                if ( this.isAtLeftBox(posBox, posPlayer) && this.isInlineBox(posBox, posPlayer) ) {
                    return true;
                } else {
                    return false;
                }
            case 'e':
                if ( this.isAtRightBox(posBox, posPlayer) && this.isInlineBox(posBox, posPlayer) ) {
                    return true;
                } else {
                    return false;
                }
        }


        return true;
    },


    isAtTopBox : function (poxBox, posPlayer) {
        return ( posPlayer['_y'] <  posBox['_y']);
    },

    isAtBottomBox : function (poxBox, posPlayer)
    {
        return ( posPlayer['_y'] >  posBox['_y']);
    },

    isAtRightBox : function (posBox, posPlayer) {

        return ( posPlayer['_x'] < posBox['_x']);
    },

    isAtLeftBox : function (posBox, posPlayer) {

        return ( posPlayer['_x'] > posBox['_x']);
    },

    isInlineBox : function (posBox, posPlayer) {

        return (  (posPlayer['_y'] > ( posBox['_y'] -  posPlayer['_h']) + MOVEMENT_UNITS)  && ( posPlayer['_y'] < (  posBox['_y'] + posBox['_h']) - MOVEMENT_UNITS));
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

