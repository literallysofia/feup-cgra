var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 1;
var BOARD_B_DIVISIONS = 100;

var CLOCKPAUSE;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    this.table = new MyTable(this);
    this.wall = new Plane(this);
    this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
    this.floor = new MyQuad(this, 0, 10, 0, 12);
    this.ocean = new Plane(this, 100, 0, 5, 0, 5);
    this.stake = new MyCylinder(this, 8, 20);

    this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
    this.boardB = new Plane(this, BOARD_B_DIVISIONS);

    this.cylinder = new MyCylinder(this, 8, 20);
    this.clock = new MyClock(this);

    this.submarine = new MySubmarine(this);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0.2, 0.2, 0.2, 1);
    this.materialA.setShininess(10);

    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);

    this.materialSubDefault = new CGFappearance(this);
    this.materialSubDefault.setAmbient(0, 0, 0, 1);
    this.materialSubDefault.setDiffuse(0.1, 0.1, 0.1, 1);
    this.materialSubDefault.setSpecular(1, 1, 1, 1);
    this.materialSubDefault.setShininess(100);

    //textures
    this.enableTextures(true);

    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.loadTexture("../resources/images/floor.png");
    this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");
    this.floorAppearance.setAmbient(0.5, 0.5, 0.5, 1);

    this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.loadTexture("../resources/images/window.png");
    this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    this.windowAppearance.setAmbient(0.5, 0.5, 0.5, 1);

    this.slidesAppearance = new CGFappearance(this);
    this.slidesAppearance.loadTexture("../resources/images/slides.png");
    this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
    this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.slidesAppearance.setShininess(10);
    this.slidesAppearance.setAmbient(0.5, 0.5, 0.5, 1);

    this.boardAppearance = new CGFappearance(this);
    this.boardAppearance.loadTexture("../resources/images/board.png");
    this.boardAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
    this.boardAppearance.setSpecular(0.6, 0.6, 0.6, 1);
    this.boardAppearance.setShininess(120);
    this.boardAppearance.setAmbient(0.5, 0.5, 0.5, 1);

    this.cylinderAppearance = new CGFappearance(this);
    this.cylinderAppearance.loadTexture("../resources/images/cylinderTexture.jpg");
    this.cylinderAppearance.setAmbient(0.5, 0.5, 0.5, 1);

    this.oceanAppearance = new CGFappearance(this);
    this.oceanAppearance.loadTexture("../resources/images/ocean.png");
    this.oceanAppearance.setTextureWrap("REPEAT", "REPEAT");
    this.oceanAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
    this.oceanAppearance.setSpecular(0.6, 0.6, 0.6, 1);
    this.oceanAppearance.setShininess(10);
    this.oceanAppearance.setAmbient(0.5, 0.5, 0.5, 1);


    //time
    this.firstTime = 1;
    this.setUpdatePeriod(100);

    //tp6
    this.luz0 = true;
    this.luz1 = true;
    this.speed = 3;
    CLOCKPAUSE = false;

    //submarine data
    this.subAngle = 180 * degToRad;
    this.subX = 8;
    this.subZ = 8;
};

LightingScene.prototype.animacaoRelogio = function() {
    console.log("Changed animation...");

    if (CLOCKPAUSE)
        CLOCKPAUSE = false;
    else CLOCKPAUSE = true;
};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)
    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.update = function(currTime) {

    if (this.firstTime == 1) {
        this.lastTime = currTime;
        this.firstTime = 0;
    }

    if (this.luz0)
        this.lights[0].enable();
    else this.lights[0].disable();

    if (this.luz1)
        this.lights[1].enable();
    else this.lights[1].disable();

    this.lastTime = this.lastTime || 0.0;
    this.deltaTime = currTime - this.lastTime || 0.0;
    this.lastTime = currTime;

    if (!CLOCKPAUSE) {
        this.clock.update(this.deltaTime);
    }

}

LightingScene.prototype.displaySub = function() {
    this.pushMatrix();
    this.translate(this.subX, 0, this.subZ);
    this.rotate(this.subAngle, 0, 1, 0);
    this.submarine.display();
    this.popMatrix();
}

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);


    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup


    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section


    // ---- BEGIN Primitive drawing section

    //PROJECT
    this.gl.clearColor(0.047, 0.086, 0.156, 1);


    //Clock
    this.pushMatrix();
    this.translate(8, 5, 0);
    this.scale(0.7, 0.7, 0.17);
    this.clock.display();
    this.popMatrix();

    //Submarine
    this.pushMatrix();
    this.translate(this.subX, 0, this.subZ);
    this.rotate(this.subAngle, 0, 1, 0);
    this.materialSubDefault.apply();
    this.submarine.display();
    this.popMatrix();

    //Ocean
    this.pushMatrix();
    this.translate(8, 0, 8);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(16, 16, 0.2);
    this.oceanAppearance.apply();
    this.ocean.display();
    this.popMatrix();

    //stake
    this.pushMatrix();
    this.translate(8, 0, 0.05);
    this.scale(0.05, 5, 0.05);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.materialDefault.apply();
    this.stake.display();
    this.popMatrix();
};

LightingScene.prototype.move = function(keycode) {

    switch (keycode) {
        case (97): //a
            this.subAngle += (2 * Math.PI) / 100;
            break;
        case (115): //s
            this.subX = this.subX - 0.1 * Math.sin(this.subAngle);
            this.subZ = this.subZ - 0.1 * Math.cos(this.subAngle);
            break;
        case (100): //d
            this.subAngle -= (2 * Math.PI) / 100;
            break;
        case (119): //w
            this.subX = this.subX + 0.1 * Math.sin(this.subAngle);
            this.subZ = this.subZ + 0.1 * Math.cos(this.subAngle);
            break;
    };

    this.displaySub();
};
