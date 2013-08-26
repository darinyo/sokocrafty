//Constantes mapa
var EMPTY           = 0;
var WALL            = 1;
var FINISH          = 2;
var BOX             = 3;
var BOX_FINISH      = 4;
var PLAYER_UP       = 5;
var PLAYER_DOWN     = 6;
var PLAYER_LEFT     = 7;
var PLAYER_RIGHT    = 8;

var MARGIN          = 0;

//MAPA INICIAL
var map = new Array();
map[0]  = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
map[1]  = new Array(0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0);
map[2]  = new Array(0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0);
map[3]  = new Array(0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0);
map[4]  = new Array(0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0);
map[5]  = new Array(0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0);
map[6]  = new Array(0,1,1,1,3,1,0,1,1,0,1,0,0,0,1,1,1,1,1,1,0);
map[7]  = new Array(0,1,0,0,0,1,0,1,1,0,1,1,1,1,1,0,0,2,2,1,0);
map[8]  = new Array(0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,1,0);
map[9]  = new Array(0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,0,0,2,2,1,0);
map[10] = new Array(0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0);
map[11] = new Array(0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0);
map[12] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

var $text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }


Game = {
    map_grid: {
        width:  21,
        height: 13,
        tile: {
          width:  32, // 48
          height: 32  // 32
        }
    },


    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('url("assets/Blue.png")');

        // Simply start the "Game" scene to get things going
        Crafty.scene('Loading');

    }
}



/*
// GAME SKINS
var img_wall=new Image();
img_wall.src='assets/Bwall.png';
var img_finish=new Image();
img_finish.src='assets/Bstore.png';
var img_player_up=new Image();
img_player_up.src='assets/Bmover_up.png';
var img_player_left=new Image();
img_player_left.src='assets/Bmover_left.png';
var img_player_right=new Image();
img_player_right.src='assets/Bmover_right.png';
var img_player_down=new Image();
img_player_down.src='assets/Bmover_down.png';
var img_box=new Image();
img_box.src='assets/Bobject.png';
var img_box_stored=new Image();
img_box_stored.src='assets/Bobject_store.png';

const MARGIN = 10;
const TILE_WIDTH = 32;
const TILE_HEIGTH = 24;
const MAP_WIDTH = 160;
const MAP_HEIGTH = 160;



//Keycodes
const LEFT=37;
const UP=38;
const RIGHT=39;
const DOWN=40;



function cloneMap(ini_map) {
	var copy = new Array();
	for (i in ini_map){
		copy[i]=new Array();
		for(j in ini_map[i]){
			copy[i][j]=ini_map[i][j];
		}
	}
	return copy;
}

var map = new cloneMap(empty_map);

var boxes = new Array();
boxes.push(new object(2,5));
boxes.push(new object(3,7));
boxes.push(new object(4,5));
boxes.push(new object(4,7));
boxes.push(new object(7,2));
boxes.push(new object(7,5));

/************************************ /
/*		OBJETO OBJECT				* /
/************************************ /
function object(x_pos,y_pos){
	this.x=x_pos;
	this.y=y_pos;
}
/************************************ /
/*		OBJETO PLAYER				* /
/************************************ /

function player_obj(x,y,init_pos){
	this.inheritFrom = object;
	this.inheritFrom(x,y);
	this.movements=0;
	this.rendered=false;
	map[this.y][this.x]=init_pos;

	this.move=function(direction,ctx){
		this.movements++;
		switch(direction){
		case UP:
			if(this.evalPosition(this.y-1,this.x,this.y-2,this.x)){
				map[this.y][this.x]=empty_map[this.y][this.x];
				this.y--;
				if(map[this.y][this.x]==BOX || map[this.y][this.x]==BOX_FINISH)
					(map[this.y-1][this.x]==EMPTY)?map[this.y-1][this.x]=BOX:map[this.y-1][this.x]=BOX_FINISH;
				map[this.y][this.x]=PLAYER_UP;
			}
			break;
		case LEFT:
			if(this.evalPosition(this.y,this.x-1,this.y,this.x-2)){
				map[this.y][this.x]=empty_map[this.y][this.x];
				this.x--;
				if(map[this.y][this.x]==BOX || map[this.y][this.x]==BOX_FINISH)
					(map[this.y][this.x-1]==EMPTY)?map[this.y][this.x-1]=BOX:map[this.y][this.x-1]=BOX_FINISH;
				map[this.y][this.x]=PLAYER_LEFT;
				}
			break;
		case RIGHT:
			if(this.evalPosition(this.y,this.x+1,this.y,this.x+2)){
				map[this.y][this.x]=empty_map[this.y][this.x];
				this.x++;
				if(map[this.y][this.x]==BOX || map[this.y][this.x]==BOX_FINISH)
					(map[this.y][this.x+1]==EMPTY)?map[this.y][this.x+1]=BOX:map[this.y][this.x+1]=BOX_FINISH;
				map[this.y][this.x]=PLAYER_RIGHT;
			}
			break;
		case DOWN:
			if(this.evalPosition(this.y+1,this.x,this.y+2,this.x)){
				map[this.y][this.x]=empty_map[this.y][this.x];
				this.y++;
				if(map[this.y][this.x]==BOX ||map[this.y][this.x]==BOX_FINISH)
					(map[this.y+1][this.x]==EMPTY)?map[this.y+1][this.x]=BOX:map[this.y+1][this.x]=BOX_FINISH;
				map[this.y][this.x]=PLAYER_DOWN;
			}
			break;
		}

		ctx.clearRect(0,0,700,350);
		renderMap(ctx);
	}

	this.evalPosition=function(x,y,x2,y2){
		if(map[x][y]==EMPTY) return true;
		if(map[x][y]==FINISH) return true;
		if(map[x][y]==BOX && map[x2][y2]==EMPTY) return true;
		if(map[x][y]==BOX && map[x2][y2]==FINISH) return true;
		if(map[x][y]==BOX_FINISH && map[x2][y2]==EMPTY) return true;
		if(map[x][y]==BOX_FINISH && map[x2][y2]==FINISH) return true;
		return false;
	}
}
/************************************ /
/*		RENDER MAP					* /
/************************************ /
function renderMap(ctx){
	if(ctx){
	   var tmp_img;
	   for(var i=0;i<map.length;i++){
		   for(var j=0;j<map[i].length;j++){
			   switch(map[i][j]){
			   case WALL:
				   tmp_img = img_wall;
				   break;
			   case FINISH:
				   tmp_img = img_finish;
				   break;
			   case BOX:
				   tmp_img = img_box;
				   break;
			   case BOX_FINISH:
				   tmp_img = img_box_stored;
				   break;
			   case PLAYER_UP:
				   tmp_img = img_player_up;
				   break;
			   case PLAYER_DOWN:
				   tmp_img = img_player_down;
				   break;
			   case PLAYER_LEFT:
				   tmp_img = img_player_left;
				   break;
			   case PLAYER_RIGHT:
				   tmp_img = img_player_right;
				   break;
			   }
			   if(tmp_img)
				   ctx.drawImage(tmp_img,MARGIN+j*TILE_WIDTH,MARGIN+i*TILE_HEIGTH);
			   tmp_img = false;
		   }
	   }
   }
}

function renderBoxes(ctx){
	if(ctx){
		for(i in boxes){
			var box=boxes[i];
			map[box.x][box.y]=3;
		}
	}
}

window.onload = function(){

	var player=new player_obj(11,8,PLAYER_UP);

	function cargaContextoCanvas(idCanvas){
	   var elemento = document.getElementById(idCanvas);
	   if(elemento && elemento.getContext){
	      var contexto = elemento.getContext('2d');
	      if(contexto){
	         return contexto;
	      }
	   }
	   return false;
	}

   //Recibimos el elemento canvas
   var ctx = cargaContextoCanvas('micanvas');
   renderBoxes(ctx);
   renderMap(ctx);

   window.onkeyup = function(e){
	   player.move(e.keyCode,ctx);
   }
}
*/
