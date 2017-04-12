/**
 * MyClock
 * @constructor
 */

function MyClock(scene) {
    CGFobject.call(this, scene);

    this.time=0;

    this.cilinder = new MyCylinder(this.scene, 12, 1);
    this.cilinder.initBuffers();

    this.clockAppearance = new CGFappearance(this.scene);
    this.clockAppearance.loadTexture("../resources/images/clock.png");
    this.clockAppearance.setAmbient(0.7, 0.7, 0.7, 1);

    this.materialDefault = new CGFappearance(this.scene);

    this.circle = new MyCircle(this.scene, 12);
    this.circle.initBuffers();

    this.secPointer = new MyClockHand(this.scene, 0.015,0.8);
    this.minPointer = new MyClockHand(this.scene, 0.03,0.8);
    this.hourPointer = new MyClockHand(this.scene, 0.035,0.5);


    this.secPointer.setAngle(270);
    this.minPointer.setAngle(180);
    this.hourPointer.setAngle(90);


};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    this.scene.pushMatrix();
    this.materialDefault.apply();
    this.cilinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.clockAppearance.apply();
    this.circle.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.materialDefault.apply();
    this.scene.translate(0, 0, 0.99);
    this.secPointer.display();
    this.minPointer.display();
    this.hourPointer.display();
    this.scene.popMatrix();

}

MyClock.prototype.update = function(currTime){

  var totalSecs = currTime/1000;
  var sec = totalSecs % 60;
  var min = (totalSecs % 3600) / 60;
  var hour = (totalSecs /3600) %12;

  this.secPointer.setAngle(sec*360/60);
  this.minPointer.setAngle(min*360/60);
  this.hourPointer.setAngle(hour*360/12);

}
