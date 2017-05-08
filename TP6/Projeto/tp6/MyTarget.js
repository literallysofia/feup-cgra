/**
 * MyTarget
 * @constructor
 */

function MyTarget(scene, x, z) {
    CGFobject.call(this, scene);

    this.x=x;
    this.y=0;
    this.z=z;

    this.cube = new MyUnitCubeQuad(this.scene);
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(this.x+0.5,0.5,this.z+0.5);
    this.cube.display();
    this.scene.popMatrix();

}
