/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene) {
     CGFobject.call(this, scene);

     this.mainCylinder = new MyCylinder (this.scene,20,20);
     this.mainCylinder.initBuffers();

     this.topCylinder = new MyCylinder (this.scene,20,20);
     this.topCylinder.initBuffers();

     this.topCircle = new MyCircle (this.scene, 20);
     this.topCircle.initBuffers();

     this.frontSemiSphere= new MySemiSphere(this.scene,20,20);
     this.frontSemiSphere.initBuffers();

     this.backSemiSphere= new MySemiSphere(this.scene,20,20);
     this.backSemiSphere.initBuffers();

     this.periscope = new MyPeriscope(this.scene);
     this.periscope.initBuffers();

     this.verticalTrapeze=new MyTrapeze(this.scene);
     this.verticalTrapeze.initBuffers();

     this.horizontalTrapeze=new MyTrapeze(this.scene);
     this.horizontalTrapeze.initBuffers();

     this.horizontalTrapezeFront = new MyTrapeze(this.scene);
     this.horizontalTrapezeFront.initBuffers();

     this.rightPropeller = new MyPropeller(this.scene);
     this.rightPropeller.initBuffers();

     this.leftPropeller = new MyPropeller(this.scene);
     this.leftPropeller.initBuffers();

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
    this.scene.rotate(Math.PI, 1,0,0);
    this.backSemiSphere.display();
    this.scene.popMatrix();

    //periscope
    this.scene.pushMatrix();
    this.scene.translate(0,2,3.3);
    this.periscope.display();
    this.scene.popMatrix();

    //vertical trapeze
    this.scene.pushMatrix();
    this.scene.translate(0,1,-0.5);
    this.scene.scale(0.1,0.6,0.4);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.verticalTrapeze.display();
    this.scene.popMatrix();

    //horizontal trapeze
    this.scene.pushMatrix();
    this.scene.translate(0,1,-0.5);
    this.scene.scale(0.6,0.1,0.4);
    this.scene.rotate(-Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI, 0,0,1);
    this.horizontalTrapeze.display();
    this.scene.popMatrix();

    //front horizontal trapeze
    this.scene.pushMatrix();
    this.scene.translate(0,2,3);
    this.scene.scale(0.4,0.05,0.4);
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.rotate(Math.PI, 0,0,1);
    this.horizontalTrapezeFront.display();
    this.scene.popMatrix();

    //rightPropeller
    this.scene.pushMatrix();
    this.scene.translate(-1,0.5,0);
    this.scene.scale(0.4,0.4,0.5);
    this.rightPropeller.display();
    this.scene.popMatrix();

    //leftPropeller
    this.scene.pushMatrix();
    this.scene.translate(1,0.5,0);
    this.scene.scale(0.4,0.4,0.5);
    this.leftPropeller.display();
    this.scene.popMatrix();

}
