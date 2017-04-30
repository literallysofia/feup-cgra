/**
 * MyTrapeze
 * @constructor
 */

function MyTrapeze(scene) {
    CGFobject.call(this, scene);


    this.triangularPrism = new MyTriangularPrism(this.scene);
    this.triangularPrism.initBuffers();

    this.cubeRight = new MyUnitCubeQuad(this.scene);
    this.cubeRight.initBuffers();

    this.cubeLeft = new MyUnitCubeQuad(this.scene);
    this.cubeLeft = new MyUnitCubeQuad(this.scene);



};

MyTrapeze.prototype = Object.create(CGFobject.prototype);
MyTrapeze.prototype.constructor = MyTrapeze;

MyTrapeze.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(2,0,0);
    this.triangularPrism.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1.5,0.5,0.5)
    this.cubeRight.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.5,0.5,0.5)
    this.cubeLeft.display();
    this.scene.popMatrix();
}
