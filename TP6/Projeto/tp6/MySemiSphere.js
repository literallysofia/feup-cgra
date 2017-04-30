/**
 * MySemiSphere
 * @constructor
 */
 function MySemiSphere(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;


 	this.initBuffers();
 };

 MySemiSphere.prototype = Object.create(CGFobject.prototype);
 MySemiSphere.prototype.constructor = MySemiSphere;

 MySemiSphere.prototype.initBuffers = function() {

   this.vertices =[];
   this.indices=[];
   this.normals=[];
   this.texCoords=[];

   var theta=2*Math.PI/this.slices;
   var fi= (Math.PI / 2)/this.stacks;

    for(let j =0; j <= this.stacks; j++){

      for(let i=0; i < this.slices; i++){
          this.vertices.push(Math.cos(theta*i)*Math.cos(fi*j),Math.sin(theta*i)*Math.cos(fi*j),Math.sin(fi*j));
          this.normals.push(Math.cos(theta*i)*Math.cos(fi*j),Math.sin(theta*i)*Math.cos(fi*j),Math.sin(fi*j));
          this.texCoords.push(i*1/this.slices,j*1/this.stacks);
         }
     }


 var numPontos=this.stacks*this.slices;

 for (let i =0; i < numPontos; i++ ){
    if((i+1)%this.slices==0){
     this.indices.push(i,i+1-this.slices, i+1);
     this.indices.push(i,i+1, i+this.slices);
   }
   else {
     this.indices.push(i, i+1, i+1+this.slices);
     this.indices.push(i, i+1+this.slices, i+this.slices);
   }
 }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
