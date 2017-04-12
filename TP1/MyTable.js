/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
  CGFobject.call(this,scene);
  this.cube=new MyUnitCubeQuad(this.scene);
  this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;


MyTable.prototype.display = function (){


  //PERNAS
  //perna 1
  this.scene.pushMatrix();
  this.scene.translate(-2.5+0.15,3.5/2,1.5-0.15);
  this.scene.scale(0.3,3.5,0.3);
  this.cube.display();
  this.scene.popMatrix();

  //perna 2
  this.scene.pushMatrix();
  this.scene.translate(2.5-0.15,3.5/2,1.5-0.15);
  this.scene.scale(0.3,3.5,0.3);
  this.cube.display();
  this.scene.popMatrix();

  //perna 3
  this.scene.pushMatrix();
  this.scene.translate(2.5-0.15,3.5/2,-1.5+0.15);
  this.scene.scale(0.3,3.5,0.3);
  this.cube.display();
  this.scene.popMatrix();

  //perna 4
  this.scene.pushMatrix();
  this.scene.translate(-2.5+0.15,3.5/2,-1.5+0.15);
  this.scene.scale(0.3,3.5,0.3);
  this.cube.display();
  this.scene.popMatrix();

  //TAMPO
  this.scene.pushMatrix();
  this.scene.translate(0,3.5+0.15,0);
  this.scene.scale(5,0.3,3);
  this.cube.display();
  this.scene.popMatrix();


}
