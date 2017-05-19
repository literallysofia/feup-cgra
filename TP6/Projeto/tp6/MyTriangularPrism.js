/**
 * MyTriangularPrism
 * @constructor
 */

function MyTriangularPrism(scene) {
    CGFobject.call(this, scene);


    this.triangleFront = new MyTriangle(this.scene);
    this.triangleFront.initBuffers();

    this.triangleBack = new MyTriangle(this.scene);
    this.triangleBack.initBuffers();

    this.quadDown = new MyQuad(this.scene);
    this.quadDown.initBuffers();

    this.quadTop = new MyQuad(this.scene);
    this.quadTop.initBuffers();

};

MyTriangularPrism.prototype = Object.create(CGFobject.prototype);
MyTriangularPrism.prototype.constructor = MyTriangularPrism;

MyTriangularPrism.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.triangleFront.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.triangleBack.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.translate(0.5, 0.5, 0);
    this.quadDown.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, 0, 1);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(1, Math.sqrt(2), 1);
    this.scene.translate(0.5, 0.5, 0);
    this.quadTop.display();
    this.scene.popMatrix();
}
