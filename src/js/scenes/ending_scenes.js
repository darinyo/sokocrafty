/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 11:01
 * To change this template use File | Settings | File Templates.
 */
Crafty.scene('Time Over', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Time Over!! Try Again')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

    // Now that our sprites are ready to draw, start the game
    setTimeout("Crafty.scene('Level')",2000);
});


Crafty.scene('Game Over', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Game Over!!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

});


Crafty.scene('Level completed', function(){

    // Crafty.background('url("assets/loading.gif")');
    // Draw some text for the player to see in case the file
    //  takes a noticeable amount of time to load
    Crafty.e('2D, DOM, Text')
        .text('Level completed!!')
        .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
        .textFont({ size: '24px', family: 'Faster One' })
        .textColor('#adadad')
        .css(text_css)
        .unselectable();

    // Now that our sprites are ready to draw, start the game
    setTimeout("Crafty.scene('Level')",2000);
});