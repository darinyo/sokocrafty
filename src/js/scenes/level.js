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

    printBackground();
    printCurrentMap();
    printStadistics();
    printMenuButtons();
    printPlayer();
    initTimer();
    centerMap();

    /*************************************************/
    /**                HELPERS                      **/
    /*************************************************/
    function printBackground() {
        Crafty.background('url("assets/images/bg2.jpg")');
        $('#scoreboard').show();
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

    function printMenuButtons() {
        Crafty.e('2D, DOM, Mouse, Image')
        .attr({ x:400 , y: 300, w: 64, h: 64})
        .image('assets/images/icons/64px/reload.png')
        .bind('Click', function(){
            LIVES --;
            if (LIVES == 0) {
                Crafty.scene('Game Over');
            } else {
                Crafty.scene('Level');
            }
        });
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
    }

    function centerMap() {
        window.setTimeout(function(){
        Crafty.viewport.centerOn(player, 1);
        Crafty.viewport.follow(player);
        }, 1);
    }
});