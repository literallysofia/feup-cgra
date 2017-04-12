/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad=new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function (){

	this.deg2rad=Math.PI/180.0;
	var a_rad = 90.0 * this.deg2rad;
	//this.scene.rotate(a_rad,0,1,0);

  //1
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//3
	this.scene.pushMatrix();
	this.scene.rotate(2*a_rad,1,0,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//2
	this.scene.pushMatrix();
	this.scene.rotate(a_rad,0,1,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//6
	this.scene.pushMatrix();
	this.scene.rotate(a_rad,1,0,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//4
	this.scene.pushMatrix();
	this.scene.rotate(2*a_rad+a_rad,0,1,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	//5
	this.scene.pushMatrix();
	this.scene.rotate(2*a_rad+a_rad,1,0,0);
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();

}
