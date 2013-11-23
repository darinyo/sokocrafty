/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:56
 * To change this template use File | Settings | File Templates.
 */


var ini_x = 20;
var ini_y = 350;
var ini_w = 620;
var ini_h = 60;

Crafty.scene('About', function() {

    Crafty.background('url("assets/images/bg-about.png")');
    creditsAll();

    var txtMenuAtras = Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text("<< Volver")
        .attr({ x:425 , y:395, w:200, h:70 })
        .textFont({ size:'64px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
        .css(itemMenuPointer_css)
        .unselectable()
        .bind('Click', function(e) {
            Crafty.scene('Menu');
        })
        .bind('MouseOver', function(e) {
            this.textColor('#ff0000',1);
        })
        .bind('MouseOut', function(e) {
            this.textColor('#ffffff',1);
        });


});

function creditsAll() {

    setTimeout(function () { addCreditsAuthor("Desarrollado por:", "#000", "32px", 120, 250);}, 1000);
    setTimeout(function () { addCreditsAuthor("Jose Luis Santos", "#ffff00", "22px", 180, 220);}, 1800);
    setTimeout(function () { addCreditsAuthor("Daniel Arinyo", "#ffff00", "22px", 220, 190);}, 2800);
    setTimeout(function () { addCreditsAuthor("Marius Armenteras", "#ffff00", "22px", 260, 160);}, 3800);
}

function addCreditsAuthor(name, color, fontsize, maxY, duration)
{
    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text(name)
        .attr({ x: ini_x , y: ini_y, w: ini_w, h: ini_h })
        .textFont({ size:fontsize, family: 'font-messages' })
        .textColor(color,1)
        .css(text_css)
        .unselectable()
        .tween({y: maxY}, duration);

}
