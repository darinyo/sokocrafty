/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:56
 * To change this template use File | Settings | File Templates.
 */


var ini_x = 100;
var ini_y = 450;
var ini_w = 300;
var ini_h = 60;

Crafty.scene('About', function() {

    setTimeout(function () { addCreditsAuthor("Marius Armenteras")}, 1000);
    setTimeout(function () { addCreditsAuthor("Jose Luis Santos")}, 2000);
    setTimeout(function () { addCreditsAuthor("El Puto")}, 3000);
    setTimeout(function () { addCreditsAuthor("Sergio Cabrera")}, 4000);

});

function addCreditsAuthor(name)
{
    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text(name)
        .attr({ x: ini_x , y: ini_y, w: ini_w, h: ini_h })
        .textFont({ size:'42px', family: 'font-menu' })
        .textColor('#000',1)
        .css(text_css)
        .unselectable()
        .tween({alpha: 0.0, x: 100, y: 100}, 200);

    setInterval(function() {
            Crafty.e('2D, DOM, Mouse, Text, Tween')
            .text(name)
            .attr({ x: ini_x , y: ini_y, w: ini_w, h: ini_h })
            .textFont({ size:'42px', family:'font-menu' })
            .textColor('#000',1)
            .css(text_css)
            .unselectable()
            .tween({alpha: 0.0, x: 100, y: 100}, 200);
    }, 5000);
}
