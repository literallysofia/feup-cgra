/**
 * MyTarget
 * @constructor
 */

function MyTarget(scene, x, y, z) {
    CGFobject.call(this, scene);

    this.x=x;
    this.y=y;
    this.z=z;
    this.destroyed=false;

    this.explosion= new MyExplosion(this.scene, this.x, this.y, this.z);

    this.cube = new MyUnitCubeQuad(this.scene);
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

  if(this.destroyed){
    this.scene.pushMatrix();
    this.explosion.display();
    this.scene.popMatrix();
  }
  else{
    this.scene.pushMatrix();
    this.scene.woodAppearance.apply();
    this.scene.translate(this.x,this.y,this.z);
    this.cube.display();
    this.scene.popMatrix();
  }
};
