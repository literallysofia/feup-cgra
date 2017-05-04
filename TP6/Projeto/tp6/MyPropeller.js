/**
 * MyPropeller
 * @constructor
 */

function MyPropeller(scene) {
    CGFobject.call(this, scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();

    this.cylinder = new MyCylinder(this.scene, 20, 20, true);
    this.cylinder.initBuffers();

    this.semiSphere = new MySemiSphere(this.scene, 20, 20);
    this.semiSphere.initBuffers();

    this.quadRotation = 0;
};

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor = MyPropeller;

MyPropeller.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.rotate(this.quadRotation, 0, 0, 1);
    this.scene.translate(0, 0, 0.375)
    this.scene.scale(1.7, 0.25, 0.25);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 0.75);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.38)
    this.scene.scale(0.3, 0.3, 0.3);
    this.semiSphere.display();
    this.scene.popMatrix();

};

MyPropeller.prototype.updateRotation = function(ang) {

  this.quadRotation = (this.quadRotation + ang) % 360;

};
