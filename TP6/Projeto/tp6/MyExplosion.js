/**
 * MyExplosion
 * @constructor
 */

function MyExplosion(scene,x,y,z) {
    CGFobject.call(this, scene);

    this.x=x;
    this.y=y;
    this.z=z;

    this.bubble1= new MyBubble(this.scene,0,0,0);
    this.bubble2= new MyBubble(this.scene,1,0,0);
    this.bubble3= new MyBubble(this.scene,0,0,1);
    this.bubble4= new MyBubble(this.scene,-1,0,0);
    this.bubble5= new MyBubble(this.scene,0,0,-1);
    this.bubble6= new MyBubble(this.scene,1,0,1);
    this.bubble7= new MyBubble(this.scene,-1,0,-1);
    this.bubble8= new MyBubble(this.scene,1.5,0,0);
    this.bubble9= new MyBubble(this.scene,0,0,1.5);
    this.bubble10= new MyBubble(this.scene,-1.5,0,-1.5);
    this.bubble11= new MyBubble(this.scene,0,0,0);
    this.bubble12= new MyBubble(this.scene,1,0,0);
    this.bubble13= new MyBubble(this.scene,0,0,1);
    this.bubble14= new MyBubble(this.scene,-1,0,0);
    this.bubble15= new MyBubble(this.scene,0,0,-1);
    this.bubble16= new MyBubble(this.scene,1,0,1);
    this.bubble17= new MyBubble(this.scene,-1,0,-1);
    this.bubble18= new MyBubble(this.scene,1.5,0,0);
    this.bubble19= new MyBubble(this.scene,0,0,1.5);
    this.bubble20= new MyBubble(this.scene,-1.5,0,-1.5);

    this.bubbles=[this.bubble1, this.bubble2, this.bubble3, this.bubble4, this.bubble5,
      this.bubble6, this.bubble7, this.bubble8, this.bubble9, this.bubble10
    , this.bubble11, this.bubble12, this.bubble13, this.bubble14, this.bubble15
  , this.bubble16, this.bubble17, this.bubble18, this.bubble19, this.bubble20];

  this.bubbleAppearance = new CGFappearance(this.scene);
  this.bubbleAppearance.setAmbient(1,1, 1, 1);
  this.bubbleAppearance.setDiffuse(24/255, 50/255, 71/255, 1);
  this.bubbleAppearance.setSpecular(1, 1, 1, 1);
  this.bubbleAppearance.setShininess(100);


};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyExplosion;

MyExplosion.prototype.display = function() {

  for(let i =0; i < this.bubbles.length; i++){
    this.scene.pushMatrix();
    this.scene.translate(this.bubbles[i].x,this.bubbles[i].y,this.bubbles[i].z);
    this.scene.translate(this.x,this.y,this.z);
    this.scene.scale(0.3,0.3,0.3);
    this.bubbleAppearance.apply();
    this.bubbles[i].display();
    this.scene.popMatrix();
  }

};

MyExplosion.prototype.move=function(delta){

  var time=delta/1000;

  for(let i =0; i < this.bubbles.length-1; i++){
    this.bubbles[i].x=this.bubbles[i].x+(i+1)/50;
    this.bubbles[i+1].x=this.bubbles[i+1].x-(i+1)/50;
    this.bubbles[i].y=this.bubbles[i].x*this.bubbles[i].x;
    this.bubbles[i+1].y=this.bubbles[i+1].x*this.bubbles[i+1].x;
    i++;
  }
};
