
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);

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
    ctor:function () {
        this._super();
        this.inicializar();


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

