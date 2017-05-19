/**
 * MyPeriscope
 * @constructor
 */

function MyPeriscope(scene) {
    CGFobject.call(this, scene);

    this.mainPeriscope = new MyCylinder(this.scene, 20, 20);
    this.mainPeriscope.initBuffers();

    this.topPeriscope = new MyCylinder(this.scene, 20, 20);
    this.topPeriscope.initBuffers();

};

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor = MyPeriscope;

MyPeriscope.prototype.display = function() {

    //main periscope
    this.scene.pushMatrix();
    this.scene.scale(0.1, 2, 0.1);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0)
    this.mainPeriscope.display();
    this.scene.popMatrix();

    //top periscope
    this.scene.pushMatrix();
    this.scene.translate(0, 1.9, -0.09);
    this.scene.scale(0.1, 0.1, 0.3);
    this.topPeriscope.display();
    this.scene.popMatrix();

}
