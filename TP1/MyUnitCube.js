/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            0.5,-0.5,0.5, //0
            0.5, -0.5, -0.5, //1
            -0.5, -0.5, -0.5, //2
            -0.5, -0.5, 0.5, //3
            0.5, 0.5, 0.5, //4
            0.5, 0.5, -0.5, //5
            -0.5, 0.5, -0.5, //6
						-0.5, 0.5,0.5 //7
			];

	this.indices = [
            0, 4,7,//1
						0,7,3, //1
						1,5,4, //2
						1,4,0, //2
						2,6,5, //3
						1,2,5, //3
						3,7,6, //4
						2,3,6, //4
						4,5,6, //5
						7,4,6, //5
						3,2,1, //6
						0,3,1  //6
        ];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
