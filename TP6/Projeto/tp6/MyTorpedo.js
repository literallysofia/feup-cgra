/**
 * MyTorpedo
 * @constructor
 */

function MyTorpedo(scene, x, y, z) {
    CGFobject.call(this, scene);

    this.x = x;
    this.y = y - 0.5;
    this.z = z;

    this.target;

    this.t = 0;

    this.radius = 0;
    this.angz = 0;
    this.angxy = 0;
    this.destroyed = false;


    this.cylinder = new MyCylinder(this.scene, 20, 20);
    this.frontSemiSphere = new MySemiSphere(this.scene, 20, 20);
    this.backSemiSphere = new MySemiSphere(this.scene, 20, 20);
    this.horizontalTrapeze = new MyTrapeze(this.scene);
    this.verticalTrapeze = new MyTrapeze(this.scene);
};



MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1);
    this.scene.scale(0.4, 0.4, 2);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.scene.scale(0.4, 0.4, 0.4);
    this.frontSemiSphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.scale(0.4, 0.4, 0.4);
    this.frontSemiSphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1);
    this.scene.scale(0.3, 0.05, 0.3);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.horizontalTrapeze.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, -1);
    this.scene.scale(0.05, 0.3, 0.3);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.horizontalTrapeze.display();
    this.scene.popMatrix();

};

MyTorpedo.prototype.setPoints = function() {

    if (this.target != null) {
        this.p1x = this.x;
        this.p1y = this.y;
        this.p1z = this.z;

        this.p2x = this.x + 6 * Math.sin(this.scene.submarine.subAngle);
        this.p2y = this.y + 5 * Math.sin(this.scene.submarine.subSlope);
        this.p2z = this.z + 6 * Math.cos(this.scene.submarine.subAngle);

        this.p3x = this.target.x;
        this.p3y = this.target.y + 3;
        this.p3z = this.target.z;

        this.p4x = this.target.x;
        this.p4y = this.target.y;
        this.p4z = this.target.z;
    }
};

MyTorpedo.prototype.moveToTarget = function(delta) {


    var time = delta / 1000;
    var distance = Math.sqrt(Math.pow(this.target.x - this.p1x, 2) + Math.pow(this.target.y - this.p1y, 2) + (Math.pow(this.target.z - this.p1z, 2)));

    var inc = time / distance;

    if (this.t < 1) {
        var newX, newY, newZ;
        newX = Math.pow(1 - this.t, 3) * this.p1x + 3 * this.t * Math.pow(1 - this.t, 2) * this.p2x + 3 * Math.pow(this.t, 2) * (1 - this.t) * this.p3x + Math.pow(this.t, 3) * this.p4x;
        newY = Math.pow(1 - this.t, 3) * this.p1y + 3 * this.t * Math.pow(1 - this.t, 2) * this.p2y + 3 * Math.pow(this.t, 2) * (1 - this.t) * this.p3y + Math.pow(this.t, 3) * this.p4y;
        newZ = Math.pow(1 - this.t, 3) * this.p1z + 3 * this.t * Math.pow(1 - this.t, 2) * this.p2z + 3 * Math.pow(this.t, 2) * (1 - this.t) * this.p3z + Math.pow(this.t, 3) * this.p4z;

        var a, b, c;
        a = Math.abs(this.x - newX);
        b = this.y - newY;
        c = this.z - newZ;

        this.radius = Math.sqrt(a * a + b * b + c * c);
        this.angz = Math.atan(b / a);
        this.angxy = Math.acos(c / this.radius);

        this.x = newX;
        this.y = newY;
        this.z = newZ;

        this.t = this.t + inc;
    } else {
        this.target.destroyed = true;
        this.destroyed = true;
    }

};
