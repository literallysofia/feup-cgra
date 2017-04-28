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

MyClock.prototype.update = function(deltaTime){

  let time = deltaTime/1000;

  let secAngle=(this.secPointer.angle + time * 360/60)%360;
  let minAngle=(this.minPointer.angle + time * 360/60/60)%360;
  let hourAngle=(this.hourPointer.angle + time * 360/60/60/12)%360;

  this.secPointer.setAngle(secAngle);
  this.minPointer.setAngle(minAngle);
  this.hourPointer.setAngle(hourAngle);
}
