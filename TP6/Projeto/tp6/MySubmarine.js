/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
     CGFobject.call(this, scene);

     this.mainCylinder = new MyCylinder (this.scene,20,8);
     this.mainCylinder.initBuffers();

     this.topCylinder = new MyCylinder (this.scene,20,8);
     this.topCylinder.initBuffers();

     this.topCircle = new MyCircle (this.scene, 20);
     this.topCircle.initBuffers();

     this.mainPeriscope = new MyCylinder (this.scene, 20, 8);
     this.mainPeriscope.initBuffers();

     this.topPeriscope = new MyCylinder(this.scene, 20,8);
     this.topPeriscope.initBuffers();

     this.frontSemiSphere= new MySemiSphere(this.scene,20,20);
     this.frontSemiSphere.initBuffers();

     this.backSemiSphere= new MySemiSphere(this.scene,20,20);
     this.backSemiSphere.initBuffers();


 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {

    //main cylinder
    this.scene.pushMatrix();
    this.scene.translate(0,1,0);
    this.scene.scale(0.73, 1,4.08);
    this.mainCylinder.display();
    this.scene.popMatrix();

    //top cylinder
    this.scene.pushMatrix();
    this.scene.scale(0.65, 1.3,0.88);
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.translate(0,3.2,-2.1);
    this.topCylinder.display();
    this.scene.popMatrix();

    //top circle
    this.scene.pushMatrix();
    this.scene.scale(0.65, 1.3,0.88);
    this.scene.rotate(3*Math.PI/2, 1, 0, 0);
    this.scene.translate(0,-3.2,2.1);
    this.topCircle.display();
    this.scene.popMatrix();

    //main periscope
    this.scene.pushMatrix();
    this.scene.scale(0.1, 2,0.1);
    this.scene.translate(0,2,33);
    this.scene.rotate(Math.PI/2,1,0,0)
    this.mainPeriscope.display();
    this.scene.popMatrix();

    //top periscope
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.1,0.3);
    this.scene.translate(0,39,10.68);
    this.topPeriscope.display();
    this.scene.popMatrix();

    //front semiSphere
    this.scene.pushMatrix();
    this.scene.translate(0,1,4.05);
    this.scene.scale(0.73, 1,1);
    this.frontSemiSphere.display();
    this.scene.popMatrix();

    //back semiSphere
    this.scene.pushMatrix();
    this.scene.translate(0,1,0);
    this.scene.scale(0.73, 1,1);
    this.scene.rotate(Math.PI, 1,0,0)
    this.backSemiSphere.display();
    this.scene.popMatrix();

}
