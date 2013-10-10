/**
 * Created with PyCharm.
 * User: Dani
 * Date: 24/09/13
 * Time: 10:56
 * To change this template use File | Settings | File Templates.
 */

Crafty.scene('Options', function() {

    Crafty.background('url("assets/images/bg-options.png")');

    var txtSound = Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text("Sounds: " + getOnOffByValue(SOUND))
        .attr({ x:0 , y:150, w:640, h:70 })
        .textFont({ size:'64px', family: 'font-menu' })
        .textColor(getColorByValue(SOUND),getColorStrengByValue(SOUND))
        .css(text_css)
        .unselectable()
        .bind('Click', function(e) {
            changeSound();
            txtSound.text("Sounds: " + getOnOffByValue(SOUND));
            txtSound.textColor(getColorByValue(SOUND), getColorStrengByValue(SOUND));
        });

    var txtMusic = Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text("Music: " + getOnOffByValue(MUSIC))
        .attr({ x:0 , y:210, w:640, h:70 })
        .textFont({ size:'64px', family: 'font-menu' })
        .textColor(getColorByValue(MUSIC),getColorStrengByValue(MUSIC))
        .css(text_css)
        .unselectable()
        .bind('Click', function(e) {
            changeMusic();
            txtMusic.text("Music: " + getOnOffByValue(MUSIC));
            txtMusic.textColor(getColorByValue(MUSIC), getColorStrengByValue(MUSIC));
        });

    var txtDifficulty = Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text("Difficulty: " + getTextDifficulty())
        .attr({ x:0 , y:270, w:640, h:70 })
        .textFont({ size:'64px', family: 'font-menu' })
        .textColor('#ffff00',1)
        .css(text_css)
        .unselectable()
        .bind('Click', function(e) {
            changeDifficulty();
            txtDifficulty.text("Difficulty: " + getTextDifficulty());
        });

    var txtMenuAtras = Crafty.e('2D, DOM, Mouse, Text, Tween')
        .text("<< Volver")
        .attr({ x:425 , y:395, w:200, h:70 })
        .textFont({ size:'64px', family: 'font-menu' })
        .textColor('#ffffff',1)
        .css(text_css)
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


    function getOnOffByValue(varialbe)
    {
        var txtOnOff = '';
        if (varialbe == 1) {
            txtOnOff = 'ON';
        } else {
            txtOnOff = 'OFF';
        }

        return txtOnOff;
    }

    function getColorStrengByValue(variable)
    {
        if (variable == 1) {
            return 1;
        } else {
            return 0.4;
        }
    }

    function getColorByValue(variable)
    {
        if (variable == 1) {
            return '#ffff00';
        } else {
            return '#505050';
        }
    }


    function changeSound()
    {
        if (SOUND == 1) {
            SOUND=0;
        } else {
            SOUND=1;
        }
    }

    function changeMusic()
    {
        if (MUSIC == 1) {
            MUSIC=0;
        } else {
            MUSIC=1;
        }
    }

    function changeDifficulty()
    {
        DIFFICULTY++;
        if (DIFFICULTY > 2) {
            DIFFICULTY = 0;
        }
    }

    function getTextDifficulty()
    {
        return TXT_DIFFICULTY[DIFFICULTY];
    }




});

