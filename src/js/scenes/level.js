/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:56
 * To change this template use File | Settings | File Templates.
 */

Crafty.scene('Level', function() {

    var player;
    var current_level = levels[CURRENT_LEVEL];
    var timeOutFruits;
    BOXS_ON_FINISH = 0;

    printBackground();
    printCurrentMap();
    printStadistics();
    printPlayer();
    initTimer();
    initEvents();
    centerMap();

    /*************************************************/
    /**                HELPERS                      **/
    /*************************************************/
    function printBackground() {
        Crafty.background('url("assets/images/bg2.jpg")');
        $('#scoreboard').show();
        $('#ingameMenu').show();
    }

    function printCurrentMap() {
        for( var i=current_level['height']-1; i>=0; i--){
            for( var j=current_level['width']-1; j>=0; j--){
                var element = '';
                var boxOnFinish = false;
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
                    case FINISH_AND_BOX:
                        Crafty.e('StoreBox').at(j, i);
                        boxOnFinish = Crafty.e('Box').at(j, i);
                        boxOnFinish.updateFinishTexture(false);
                }
                if (element != ''){
                    Crafty.e(element).at(j, i);
                }
            }
        }
    }

    function printStadistics() {
        $('#lives').html('0'+LIVES);
        $('#boxsOnFinish').html(0);
        $('#total_boxs').html(current_level['boxes']);
        $('#time').html(current_level['time']);
        $('#level').html('0'+current_level['level']);
    }

    function printPlayer() {
        // Print player
        player = Crafty.e('PlayerCharacter');
        player.at(current_level['player'][0], current_level['player'][1]);
        Crafty.viewport.centerOn(player);
        Crafty.viewport.follow(player);
        Crafty.viewport.y = 25;
    }

    function initTimer() {
        // Init time interval
        SECONDS = current_level['time'];
        level_timer = window.setInterval(function(){
            SECONDS --;
            $('#time').html(SECONDS);
            if (SECONDS == 0) {
                LIVES--;
                $('#lives').html('0'+LIVES);
                clearTimeout(timeOutFruits);
                window.clearInterval(level_timer);
                if (LIVES == 0) {
                    Crafty.scene('Game Over');
                } else {
                    Crafty.scene('Time Over');
                }
            }
        },1000);
    }

    function initEvents() {

        timeOutFruits = setTimeout(createFruits, 2000);

        function createFruits() {

            function getTimeTickets() {

                var totalMapTime = current_level['time'];
                var UMBRAL_NO_TICKETS = 70;
                var UMBRAL_UN_TICKET = 50;
                var UMBRAL_DOS_TICKETS = 30;
                var UMBRAL_TRES_TICKETS = 15;

                var percentualTime = Math.round(( SECONDS * 100 ) / totalMapTime);

                if (percentualTime >  UMBRAL_NO_TICKETS) {
                    return 0;
                }
                if (percentualTime >  UMBRAL_UN_TICKET) {
                    return 1;
                }
                if (percentualTime >  UMBRAL_DOS_TICKETS) {
                    return 2;
                }
                if (percentualTime >  UMBRAL_TRES_TICKETS) {
                    return 3;
                }

                return 4;
            }

            function getBoxesTickets() {

                var totalBoxes = current_level['boxes'];

                var UMBRAL_NO_TICKETS = 80;
                var UMBRAL_UN_TICKET = 50;
                var UMBRAL_DOS_TICKETS = 30;

                var percentualBoxes =  Math.round(( BOXS_ON_FINISH * 100 ) / totalBoxes);

                if (percentualBoxes >  UMBRAL_NO_TICKETS) {
                    return 0;
                }

                if (percentualBoxes >  UMBRAL_UN_TICKET) {
                    return 1;
                }

                if (percentualBoxes >  UMBRAL_DOS_TICKETS) {
                    return 2;
                }
                return 3;
            }

            function getLifeTickets() {
                if (LIVES > 5) return 0;
                if (LIVES > 3) return 1; // 4- 5
                if (LIVES > 2) return 2; // 3
                if (LIVES > 1) return 3; // 2
                return 4; // 1 vida
            }

            function getLemonTickets(timetickets, boxstickets) {
                return Math.round( (timetickets + boxstickets) / 2);
            }

            // variable tickets
            var timeTickets = getTimeTickets();
            var lifeTickets = getLifeTickets();
            var boxTickets = getBoxesTickets();

            // Fruit tickets
            var strawberrytickets = timeTickets;
            var orangeTickets = lifeTickets;
            var lemonTickets = getLemonTickets(timeTickets, boxTickets);
            var noFruitTickets = 2;

            var totalTickets = strawberrytickets + orangeTickets + lemonTickets + noFruitTickets;
            var randomFruit = Math.floor(Math.random()*totalTickets)+1;

            var fruit;
            if (randomFruit > 0 && randomFruit <= strawberrytickets ) {
                fruit = 'Strawberry';
            } else if (randomFruit <= (strawberrytickets + orangeTickets)) {
                fruit = 'Orange';
            } else if (randomFruit <= (strawberrytickets + orangeTickets + lemonTickets)) {
                fruit = 'Lemon';
            } else {
                fruit = '';
            }

            if (fruit) {
                Crafty.e(fruit);
            }


            var minWaitTime = 15;
            var maxWaitTime = 20; // Don't include the min time  -> max time = (15 + 20)
            var newFruitTime = minWaitTime + Math.floor( Math.random() * maxWaitTime ) + 1;

            timeOutFruits = setTimeout(createFruits, newFruitTime*1000);
        }

        $('#restart').click(function(e) {
            LIVES--;
            printStadistics();
            clearTimeout(timeOutFruits);
            if (LIVES > 0) {
                Crafty.scene('Level');
            } else {
                Crafty.scene('Game Over');
            }
        });

        $('#return').click(function(e) {
            LIVES--;
            printStadistics();
            clearTimeout(timeOutFruits);
            Crafty.viewport.x = 0;
            Crafty.viewport.y = 0;
            Crafty.scene('Menu');
        });
    }

    function centerMap() {
        window.setTimeout(function(){
            Crafty.viewport.centerOn(player, 1);
            Crafty.viewport.follow(player);
        }, 1);
    }
});