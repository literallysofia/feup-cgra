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

     this.trapezeTop=new MyTrapeze(this.scene);
     this.trapezeTop.initBuffers();

     this.trapezeDown=new MyTrapeze(this.scene);
     this.trapezeDown.initBuffers();

     this.backTrapezeLeft = new MyTrapeze(this.scene);
     this.backTrapezeLeft.initBuffers();

     this.backTrapezeRight = new MyTrapeze(this.scene);
     this.backTrapezeRight.initBuffers();

     this.frontTrapezeLeft = new MyTrapeze(this.scene);
     this.frontTrapezeLeft.initBuffers();

     this.frontTrapezeRight = new MyTrapeze(this.scene);
     this.frontTrapezeRight.initBuffers();

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
    this.scene.rotate(Math.PI, 1,0,0);
    this.backSemiSphere.display();
    this.scene.popMatrix();

    //trapeze top
    this.scene.pushMatrix();
    this.scene.scale(0.1,0.4,0.4);
    this.scene.translate(0,4.5,-1.2);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.trapezeTop.display();
    this.scene.popMatrix();

    //trapeze top
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.scale(0.1,0.4,0.4);
    this.scene.translate(0,-0.7,-1.2);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.trapezeDown.display();
    this.scene.popMatrix();

    //back trapeze right
    this.scene.pushMatrix();
    this.scene.translate(-0.5,1,-0.5);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.scene.scale(0.1,0.4,0.4);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.backTrapezeRight.display();
    this.scene.popMatrix();

    //back trapeze left
    this.scene.pushMatrix();
    this.scene.translate(0.5,1,-0.5);
    this.scene.rotate(-Math.PI/2,0,0,1);
    this.scene.scale(0.1,0.4,0.4);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.backTrapezeLeft.display();
    this.scene.popMatrix();

    //front trapeze right
    this.scene.pushMatrix();
    this.scene.translate(-0.5,2.2,2.5);
    this.scene.rotate(Math.PI/2,0,0,1);
    this.scene.scale(0.05,0.3,0.3);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.frontTrapezeRight.display();
    this.scene.popMatrix();

    //front trapeze left
    this.scene.pushMatrix();
    this.scene.translate(0.5,2.2,2.5);
    this.scene.rotate(-Math.PI/2,0,0,1);
    this.scene.scale(0.05,0.3,0.3);
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.rotate(Math.PI/2, 0,0,1);
    this.frontTrapezeLeft.display();
    this.scene.popMatrix();

}
