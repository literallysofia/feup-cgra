/**
 * MySphere
 * @constructor
 */

function MySphere(scene) {
    CGFobject.call(this, scene);

    this.semiSphereFront= new MySemiSphere(this.scene,20,20);
    this.semiSphereBack= new MySemiSphere(this.scene,20,20);
};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor = MySphere;

MySphere.prototype.display = function() {

    this.scene.pushMatrix();
    this.semiSphereFront.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,1,0,0);
    this.semiSphereBack.display();
    this.scene.popMatrix();

};
