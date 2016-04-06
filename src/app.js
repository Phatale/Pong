
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    score1:0,
    score2:0,
    Xmov:0,
    Ymov:0,
    speed:0,
    
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);

        this.Xmov = this.random(1,3);
        this.Ymov = this.random(1,3);
        this.speed = this.random(0.0001,0.001);
        // Creando los jugadores como sprites
        this.jugador1 = new cc.Sprite(res.pad_png);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 1);

        this.jugador2 = new cc.Sprite(res.pad_png);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.pelota = new cc.Sprite(res.ball_png);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 1);

        this.puntuacion1 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        
    },
    
    // mover los pads
    
     movePads: function(keyCode, event){
        
        var target = event.getCurrentTarget();

            
        if(keyCode == cc.KEY.w){
                target.jugador1.setPositionY(target.jugador1.getPositionY()+ 40)
                
        }
         
         if(keyCode == cc.KEY.s){
                target.jugador1.setPositionY(target.jugador1.getPositionY()- 40)
         }
        if(keyCode == cc.KEY.up){
                target.jugador2.setPositionY(target.jugador2.getPositionY()+ 40)
        }
         
         if(keyCode == cc.KEY.down){
                target.jugador2.setPositionY(target.jugador2.getPositionY()- 40)
         }
         
        },

    
  random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
        resetBall:function(){
        var size = cc.winSize;
        this.speed = this.random(0.0001,0.001);
        this.pelota.setPosition(size.width / 2, this.random(0, size.height - 80));
        this.Xmov = this.random(1,3);
        this.Ymov = this.random(1,3);
        this.puntuacion1.setString(this.score1);
        this.puntuacion2.setString(this.score2);
    },
    
        // Method to moves the ball
    moverPelota: function(){
        
        var position = this.pelota.getPosition();
        
        if(position.y <= 20 || position.y >= cc.winSize.height - 40){
            this.Ymov *= -1;
            
        } else if(position.x <= 0 ){
            this.score2++;
            this.resetBall();
        } else if(position.x >= cc.winSize.width){
            this.score1++;
            this.resetBall();
        } else if (cc.rectIntersectsRect(this.pelota.getBoundingBox(), this.jugador1.getBoundingBox())){
            this.Xmov *= -1;
        }
        
        else if(cc.rectIntersectsRect(this.pelota.getBoundingBox(), this.jugador2.getBoundingBox())){
            this.Xmov *= -1;       
        }
        
        var newX = this.pelota.getPosition().x + this.Xmov;
        var newY = this.pelota.getPosition().y + this.Ymov;
        
        this.pelota.setPosition(newX, newY);

    },
    
    
    
    ctor:function () {
        this._super();
        this.inicializar();

                // Schedule Moveball
        this.schedule(this.moverPelota, this.speed);
        

        cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.movePads
		}, this);
        
        return true;

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

