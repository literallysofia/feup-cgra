/**
 * MyTrapeze
 * @constructor
 */

function MyTrapeze(scene) {
    CGFobject.call(this, scene);


    this.triangularPrismRight = new MyTriangularPrism(this.scene);
    this.triangularPrismRight.initBuffers();

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();

    this.triangularPrismLeft = new MyTriangularPrism(this.scene);
    this.triangularPrismLeft.initBuffers();

};

MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;

MyTrapeze.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(2,0,0);
    this.triangularPrismRight.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2,0,1);
    this.scene.rotate(-Math.PI, 0,1,0);
    this.triangularPrismLeft.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0.5,0.5)
    this.scene.scale(4,1,1);
    this.cube.display();
    this.scene.popMatrix();

}
