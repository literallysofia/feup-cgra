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
    this.ocean = new Plane(this, 100, 0, 4, 0, 4);
    this.stake = new MyCylinder(this, 8, 20);
    this.clock = new MyClock(this);
    this.submarine = new MySubmarine(this);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialSubDefault = new CGFappearance(this);
    this.materialSubDefault.setAmbient(0, 0, 0, 1);
    this.materialSubDefault.setDiffuse(0.1, 0.1, 0.1, 1);
    this.materialSubDefault.setSpecular(1, 1, 1, 1);
    this.materialSubDefault.setShininess(100);

    // Textures
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
    this.oceanAppearance.loadTexture("../resources/images/ocean2.png");
    this.oceanAppearance.setTextureWrap("REPEAT", "REPEAT");
    this.oceanAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
    this.oceanAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.oceanAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.oceanAppearance.setShininess(10);

    this.blueMetal = new CGFappearance(this);
    this.blueMetal.loadTexture("../resources/images/sub1.jpg");
    this.blueMetal.setTextureWrap("REPEAT", "REPEAT");
    this.blueMetal.setAmbient(0.5, 0.5, 0.5, 1);
    this.blueMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.blueMetal.setSpecular(1, 1, 1, 1);

    this.darkMetal = new CGFappearance(this);
    this.darkMetal.loadTexture("../resources/images/sub2.jpg");
    this.darkMetal.setTextureWrap("REPEAT", "REPEAT");
    this.darkMetal.setAmbient(0.5, 0.5, 0.5, 1);
    this.darkMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.darkMetal.setSpecular(1, 1, 1, 1);

    this.greyMetal = new CGFappearance(this);
    this.greyMetal.loadTexture("../resources/images/sub3.jpg");
    this.greyMetal.setTextureWrap("REPEAT", "REPEAT");
    this.greyMetal.setAmbient(0.5, 0.5, 0.5, 1);
    this.greyMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.greyMetal.setSpecular(1, 1, 1, 1);

    this.lightMetal = new CGFappearance(this);
    this.lightMetal.loadTexture("../resources/images/sub4.jpg");
    this.lightMetal.setTextureWrap("REPEAT", "REPEAT");
    this.lightMetal.setAmbient(0.5, 0.5, 0.5, 1);
    this.lightMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.lightMetal.setSpecular(1, 1, 1, 1);

    this.friends = new CGFappearance(this);
    this.friends.loadTexture("../resources/images/joey-chandler.jpg");
    this.friends.setTextureWrap("REPEAT", "REPEAT");
    this.friends.setAmbient(0.5, 0.5, 0.5, 1);
    this.friends.setDiffuse(0.5, 0.5, 0.5, 1);
    this.friends.setSpecular(1, 1, 1, 1);



    this.submarineAppearances = [this.blueMetal, this.darkMetal, this.greyMetal, this.lightMetal, this.friends];
    this.submarineAppearancesList = {
        'blueMetal': 0,
        'darkMetal': 1,
        'greyMetal': 2,
        'lightMetal': 3,
        'friends': 4
    }
    this.submarineTexture = 'darkMetal';
    this.currSubmarineAppearance = this.submarineAppearancesList[this.submarineTexture];

    //time
    this.firstTime = 1;
    this.setUpdatePeriod(20);

    //gui
    this.luz0 = true;
    this.luz1 = true;
    this.luz2 = true;
    this.luz3 = true;
    this.speed = 3;
    CLOCKPAUSE = false;



    //submarine data
    this.subAngle = 180 * degToRad;
    this.subX = 8;
    this.subY = 1.1;
    this.subZ = 8;
    this.subVelocity = 0;
    this.subSlope = 0;
    this.resetSlope = false;
    this.subVerticalDirection = 0;
    this.subSlopeMove = false;
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

    this.lights[0].setPosition(0, 0.3, 0, 1.0);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(0, 6, 0, 1);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(16, 6, 0, 1.0);
    this.lights[2].setVisible(true); // show marker on light position (different from enabled)

    this.lights[3].setPosition(0, 6, 15, 1.0);
    this.lights[3].setVisible(true); // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();

    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].enable();
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

    if (this.luz2)
        this.lights[2].enable();
    else this.lights[2].disable();

    if (this.luz3)
        this.lights[3].enable();
    else this.lights[3].disable();

    this.lastTime = this.lastTime || 0.0;
    this.deltaTime = currTime - this.lastTime || 0.0;
    this.lastTime = currTime;

    if (!CLOCKPAUSE) {
        this.clock.update(this.deltaTime);
    }

    this.currSubmarineAppearance = this.submarineAppearancesList[this.submarineTexture];

    this.submarine.updatePropeller(this.deltaTime, this.subVelocity);

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




    // ---- BEGIN Primitive drawing section

    //this.gl.clearColor(0.047, 0.086, 0.156, 1); //dark blue
    this.gl.clearColor(0.094, 0.196, 0.278, 1); //light blue

    //Clock
    this.pushMatrix();
    this.translate(8, 5, 0);
    this.scale(1, 1, 0.17);
    this.clock.display();
    this.popMatrix();

    //Stake
    this.pushMatrix();
    this.translate(8, 0, 0.05);
    this.scale(0.05, 5, 0.05);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.materialDefault.apply();
    this.stake.display();
    this.popMatrix();

    //Ocean
    this.pushMatrix();
    this.translate(8, 0, 8);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(16, 16, 0.2);
    this.oceanAppearance.apply();
    this.ocean.display();
    this.popMatrix();

    //Submarine
    if (this.subSlopeMove)
        this.updateSubmarineSlope();

    this.updateSubmarine();

    this.pushMatrix();
    this.translate(this.subX, this.subY, this.subZ);
    this.rotate(this.subSlope, 1, 0, 0);
    this.rotate(this.subAngle, 0, 1, 0);
    this.materialSubDefault.apply();
    this.translate(0,0,-2);
    this.submarineAppearances[this.currSubmarineAppearance].apply();
    this.submarine.display();
    this.popMatrix();

};

LightingScene.prototype.move = function(keycode) {

    switch (keycode) {
        case (97): //a
            this.subAngle += (2 * Math.PI) / 100;
            this.submarine.activateVerticalTrapezes(1);
            break;
        case (115): //s
            this.subVelocity -= 0.05;
            //this.subX = this.subX - 0.1 * Math.sin(this.subAngle);
            //this.subZ = this.subZ - 0.1 * Math.cos(this.subAngle);
            break;
        case (100): //d
            this.subAngle -= (2 * Math.PI) / 100;
            this.submarine.activateVerticalTrapezes(2);
            break;
        case (119): //w
            this.subVelocity += 0.05;
            //this.subX = this.subX + 0.1 * Math.sin(this.subAngle);
            //this.subZ = this.subZ + 0.1 * Math.cos(this.subAngle);
            break;
        case (112): //p
            this.submarine.updatePeriscopeMove(keycode);
            break;
        case (108): //l
            this.submarine.updatePeriscopeMove(keycode);
            break;
        case (113): //q
            this.subY += 0.1;
            this.startSlope(1);
            this.submarine.activateHorizontalTrapezes(1);
            break;
        case (101): //e
            this.subY -= 0.1;
            this.startSlope(-1);
            this.submarine.activateHorizontalTrapezes(2);
            break;
    };

};

LightingScene.prototype.updateSubmarine = function() {

    this.subX += this.subVelocity * Math.sin(this.subAngle);
    this.subZ += this.subVelocity * Math.cos(this.subAngle);

};

LightingScene.prototype.startSlope = function(direction) {

    this.resetSlope = false;
    this.subVerticalDirection = direction;
    this.subSlopeMove = true;

};

LightingScene.prototype.activateResetSlope = function() {

    this.resetSlope = true;
    this.subSlopeMove = true;

};

LightingScene.prototype.updateSubmarineSlope = function() {

    if (this.resetSlope) {

        switch (this.subVerticalDirection) {
            case (1): //sobe

                if (this.subSlope < 0) {
                    this.subSlopeMove = false;
                    this.subSlope = 0;
                } else
                    this.subSlope -= (2 * Math.PI) / 100;

                break;
            case (-1): //desce

                if (this.subSlope > 0) {
                    this.subSlopeMove = false;
                    this.subSlope = 0;
                } else
                    this.subSlope += (2 * Math.PI) / 100;

                break;
        };

    } else {

        switch (this.subVerticalDirection) {
            case (1): //sobe

                if (this.subSlope > (Math.PI / 10))
                    this.subSlopeMove = false;
                else
                    this.subSlope += (2 * Math.PI) / 100;

                break;
            case (-1): //desce

                if (this.subSlope < -(Math.PI / 10))
                    this.subSlopeMove = false;
                else
                    this.subSlope -= (2 * Math.PI) / 100;

                break;
        };

    }

};
