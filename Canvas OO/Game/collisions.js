	var context = document.getElementById('canvas').getContext('2d');
	canvas.width = 800;
	canvas.height = 600;
	
	//declare a method to extend the class
	Number.prototype.clamp = function(min, max) {
	  return Math.min(Math.max(this, min), max);
	};

	//create a sprite class
	function Sprite(x, y, width, height, speed, colour, Key_Bindings){

	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.speed = speed;
	    this.colour = colour;
	    this.Key_Bindings = Key_Bindings;

	    //remember starting position in case of explosion!
	    var start_x = x;
	    var start_y = y;

	    //Method to move the Sprite when keys are pressed
	    this.Move = function(mod){
		//context.clearRect(x , y, width, height);
		if (Key_Bindings.LEFT in keysDown){x -= speed * mod;}
		if (Key_Bindings.UP in keysDown){y -= speed * mod;}
		if (Key_Bindings.RIGHT in keysDown){x += speed * mod;}
		if (Key_Bindings.DOWN in keysDown){y += speed * mod;}

		//Ensure players can't move off screen
		x = x.clamp(0, canvas.width - this.width);
		y = y.clamp(0, canvas.height - this.height);
	    };
	    
	    //method to draw sprites on the Canvas
	    this.DrawSprite = function(){
		context.beginPath();
		context.fillStyle = colour;
		context.fillRect(x, y, width, height);
	    };

	    //Ruh roh
	    this.explode = function(){
		    x = start_x;
		    y = start_y;
	    };

	    //GET ALL THE VARIABLES
	    this.getx = function(){return x;}
	    this.gety = function(){return y;}
	    this.getwidth = function(){return width;}
	    this.getheight = function(){return height;}
	}

	//create a new instance of Sprite object
	//One player is bound to arrow keys and the other is bound to WSAD keys
	var Player = new Sprite(200, 200, 50, 50, 500, '#c00',{'LEFT':37, 'UP':38, 'RIGHT':39, 'DOWN':40});
	var Enemy = new Sprite(300, 300, 50, 50, 500, '#000',{'LEFT':65, 'UP':87, 'RIGHT':68, 'DOWN':83});
	
	//create event listener
	var keysDown = {};
	window.addEventListener('keydown', function(e){keysDown[e.keyCode] = true;});
	window.addEventListener('keyup', function(e){delete keysDown[e.keyCode];});

	//Returns true or false. Replaced direct property access with getter methods.
	//Object properties are private. 
	function collides(a, b) {
    	return 	a.getx() < b.getx() + b.getwidth() &&
            	a.getx() + a.getwidth() > b.getx() &&
            	a.gety() < b.gety() + b.getheight() &&
            	a.gety() + a.getheight() > b.gety();
    };

	
	function update(mod){
	    Player.Move(mod);
	    Enemy.Move(mod);

	    //See above comment for 'collides' function
	    if (collides(Player, Enemy)) {
	    	Player.explode();
	    	Enemy.explode();
	    }
	};
	
	function draw() {
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    Player.DrawSprite();
	    Enemy.DrawSprite();
	};
	
	function run(){
	    update((Date.now() - time) / 1000);
	    draw();
	    time = Date.now();
	};
	 
	var time = Date.now();
	setInterval(run, 5);