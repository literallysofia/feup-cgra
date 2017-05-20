/**
 * MyTriangularPrism
 * @constructor
 */

function MyTriangularPrism(scene) {
    CGFobject.call(this, scene);

    this.quadDown = new MyQuad(this.scene);
    this.quadTop = new MyQuad(this.scene);
    this.quadTopRight = new MyQuad(this.scene);
    this.quadTopLeft = new MyQuad(this.scene);
    this.trapezoidFront =  new MyTrapezoid(this.scene);
    this.trapezoidBack =  new MyTrapezoid(this.scene);

};

MyTriangularPrism.prototype = Object.create(CGFobject.prototype);
MyTriangularPrism.prototype.constructor = MyTriangularPrism;

MyTriangularPrism.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(0,0.5,1);
    this.trapezoidFront.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0.5,0);
    this.scene.rotate(Math.PI, 0,1,0);
    this.trapezoidFront.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.scene.scale(6,1,1);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quadDown.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(4,1,1);
    this.scene.translate(0, 1, 0.5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quadTop.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0.5, 0.5);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(1, Math.sqrt(2), 1);
    this.quadTopRight.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0.5, 0.5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(1, Math.sqrt(2), 1);
    this.quadTopRight.display();
    this.scene.popMatrix();
}
