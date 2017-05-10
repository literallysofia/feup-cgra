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

    this.cube = new MyUnitCubeQuad(this.scene);
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.x,this.y,this.z);
    this.cube.display();
    this.scene.popMatrix();

};
