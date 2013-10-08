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
    setInterval( creditsAll, 22000);

});

function creditsAll() {

    setTimeout(function () { addCreditsAuthor("Direccion y Programacion", "#000", "32px");}, 1000);
    setTimeout(function () { addCreditsAuthor("Jose Luis Santos", "#ffff00", "22px");}, 1800);

    setTimeout(function () {addCreditsAuthor("Grafismo y Logica", "#000", "32px");}, 4000);
    setTimeout(function () {addCreditsAuthor("Jose Luis Santos", "#ffff00", "22px");}, 4800);

    setTimeout(function () {addCreditsAuthor("Idea original", "#000", "32px");}, 7000);
    setTimeout(function () {addCreditsAuthor("Jose Luis Santos", "#ffff00", "22px");}, 7800);

    setTimeout(function () {addCreditsAuthor("Creacion de Bugs", "#000", "32px");}, 10000);
    setTimeout(function () {addCreditsAuthor("Daniel la Patino", "#ffff00", "22px");}, 10800);

    setTimeout(function () {addCreditsAuthor("El del 30%", "#000", "32px");}, 13000);
    setTimeout(function () {addCreditsAuthor("Mario Armenteras", "#ffff00", "22px");}, 13800);

}

function addCreditsAuthor(name, color, fontsize)
{
    Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text(name)
        .attr({ x: ini_x , y: ini_y, w: ini_w, h: ini_h })
        .textFont({ size:fontsize, family: 'font-messages' })
        .textColor(color,1)
        .css(text_css)
        .unselectable()
        .tween({alpha: 0.0, y: 80}, 250)
        .bind('TweenEnd', function(e) {
           this.destroy();
        });
}
