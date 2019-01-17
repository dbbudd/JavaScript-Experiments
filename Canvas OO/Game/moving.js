	var context = document.getElementById('canvas').getContext('2d');
	canvas.width = 800;
	canvas.height = 600;
        
	//create a sprite class
	function Sprite(x, y, width, height, speed, colour, Key_Bindings){
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.speed = speed;
	    this.colour = colour;
	    this.Key_Bindings = Key_Bindings;

	    //Method to move the Sprite when keys are pressed
	    this.Move = function(mod){
		//context.clearRect(x , y, width, height);
		if (Key_Bindings.LEFT in keysDown){x -= speed * mod;}
		if (Key_Bindings.UP in keysDown){y -= speed * mod;}
		if (Key_Bindings.RIGHT in keysDown){x += speed * mod;}
		if (Key_Bindings.DOWN in keysDown){y += speed * mod;}
	    };
	    
	    //method to draw sprites on the Canvas
	    this.DrawSprite = function(){
		context.beginPath();
		context.fillStyle = colour;
		context.fillRect(x, y, width, height);
	    };
	}
	
	//create a new instance of Sprite object
	//One player is bound to arrow keys and the other is bound to WSAD keys
	var Player = new Sprite(200, 200, 50, 50, 500, '#c00',{'LEFT':37, 'UP':38, 'RIGHT':39, 'DOWN':40});
	var Enemy = new Sprite(300, 300, 50, 50, 500, '#000',{'LEFT':65, 'UP':87, 'RIGHT':68, 'DOWN':83});
	
	//create event listener
	var keysDown = {};
	window.addEventListener('keydown', function(e){keysDown[e.keyCode] = true;});
	window.addEventListener('keyup', function(e){delete keysDown[e.keyCode];});
	
	function update(mod){
	    Player.Move(mod);
	    Enemy.Move(mod);
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