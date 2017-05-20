var degToRad = Math.PI / 180.0;
var CLOCKPAUSE;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    this.ocean = new Plane(this, 100, 0, 6, 0, 6);
    this.stake = new MyCylinder(this, 8, 20);
    this.clock = new MyClock(this);
    this.submarine = new MySubmarine(this);
    this.explosion = new MyExplosion(this);

    this.target1 = new MyTarget(this, -10, 0.5, 8);
    this.target2 = new MyTarget(this, 5, 0.5, 14);
    this.target3 = new MyTarget(this, -6, 0.5, -6);
    this.targets = [this.target1, this.target2, this.target3];
    this.targetIndex = 0;

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialSubDefault = new CGFappearance(this);
    this.materialSubDefault.setAmbient(0, 0, 0, 1);
    this.materialSubDefault.setDiffuse(0.1, 0.1, 0.1, 1);
    this.materialSubDefault.setSpecular(1, 1, 1, 1);
    this.materialSubDefault.setShininess(100);

    // Textures
    this.enableTextures(true);

    this.oceanAppearance = new CGFappearance(this);
    this.oceanAppearance.loadTexture("../resources/images/ocean2.png");
    this.oceanAppearance.setTextureWrap("REPEAT", "REPEAT");
    this.oceanAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
    this.oceanAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.oceanAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.oceanAppearance.setShininess(10);

    this.woodAppearance = new CGFappearance(this);
    this.woodAppearance.loadTexture("../resources/images/wood.jpg");
    this.woodAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
    this.woodAppearance.setSpecular(0.4, 0.4, 0.4, 1);
    this.woodAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.woodAppearance.setShininess(10);

    this.targetAppearance = new CGFappearance(this);
    this.targetAppearance.setAmbient(0, 0, 0, 1);
    this.targetAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
    this.targetAppearance.setSpecular(1, 1, 1, 1);
    this.targetAppearance.setShininess(100);

    this.blueMetal = new CGFappearance(this);
    this.blueMetal.loadTexture("../resources/images/sub1.jpg");
    this.blueMetal.setAmbient(0.8, 0.8, 0.8, 1);
    this.blueMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.blueMetal.setSpecular(1, 1, 1, 1);

    this.darkMetal = new CGFappearance(this);
    this.darkMetal.loadTexture("../resources/images/sub2.jpg");
    this.darkMetal.setTextureWrap("REPEAT", "REPEAT");
    this.darkMetal.setAmbient(0.8, 0.8, 0.8, 1);
    this.darkMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.darkMetal.setSpecular(1, 1, 1, 1);

    this.greyMetal = new CGFappearance(this);
    this.greyMetal.loadTexture("../resources/images/sub3.jpg");
    this.greyMetal.setAmbient(0.8, 0.8, 0.8, 1);
    this.greyMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.greyMetal.setSpecular(1, 1, 1, 1);

    this.lightMetal = new CGFappearance(this);
    this.lightMetal.loadTexture("../resources/images/sub4.jpg");
    this.lightMetal.setAmbient(0.8, 0.8, 0.8, 1);
    this.lightMetal.setDiffuse(0.5, 0.5, 0.5, 1);
    this.lightMetal.setSpecular(1, 1, 1, 1);

    this.sky = new CGFappearance(this);
    this.sky.loadTexture("../resources/images/sky.png");
    this.sky.setAmbient(0.8, 0.8, 0.8, 1);
    this.sky.setDiffuse(0.5, 0.5, 0.5, 1);
    this.sky.setSpecular(1, 1, 1, 1);

    this.submarineAppearances = [this.blueMetal, this.darkMetal, this.greyMetal, this.lightMetal, this.sky];
    this.submarineAppearancesList = {
        'blueMetal': 0,
        'darkMetal': 1,
        'greyMetal': 2,
        'lightMetal': 3,
        'sky': 4
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
    this.speed = 2;
    CLOCKPAUSE = false;

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

    this.lights[0].setPosition(-16, 6, -16, 1.0);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(0, 6, 0, 1);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(16, 6, 0, 1.0);
    this.lights[2].setVisible(true); // show marker on light position (different from enabled)

    this.lights[3].setPosition(0, 6, 16, 1.0);
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

    //Submarine
    this.submarine.updatePropeller(this.deltaTime, this.submarine.subVelocity, this.speed);

    if (this.submarine.subSlopeMove)
        this.submarine.updateSubmarineSlope();

    this.submarine.updateSubmarine();

    this.currSubmarineAppearance = this.submarineAppearancesList[this.submarineTexture];

    //Torpedo and Torget
    if (this.torpedo != null) this.torpedo.moveToTarget(this.deltaTime);

    if (this.target1.destroyed) this.target1.explosion.move(this.deltaTime);
    if (this.target2.destroyed) this.target2.explosion.move(this.deltaTime);
    if (this.target3.destroyed) this.target3.explosion.move(this.deltaTime);
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
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(32, 32, 0.2);
    this.oceanAppearance.apply();
    this.ocean.display();
    this.popMatrix();

    //Submarine
    this.pushMatrix();
    this.translate(this.submarine.subX, this.submarine.subY, this.submarine.subZ);
    this.rotate(this.submarine.subAngle, 0, 1, 0);
    this.rotate(-this.submarine.subSlope, 1, 0, 0);
    this.translate(0, 0, -2);
    this.submarineAppearances[this.currSubmarineAppearance].apply();
    this.submarine.display();
    this.popMatrix();

    //Targets
    this.pushMatrix();
    this.woodAppearance.apply();
    this.target1.display();
    this.target2.display();
    this.target3.display();
    this.popMatrix();

    //Torpedo
    if (this.torpedo != null && !this.torpedo.destroyed) {
        this.pushMatrix();
        this.translate(this.torpedo.x, this.torpedo.y, this.torpedo.z);
        this.rotate(this.torpedo.angy, 0, 1, 0);
        this.rotate(-this.torpedo.angx, 1, 0, 0);
        this.rotate(Math.PI, 1, 0, 0);
        this.submarineAppearances[this.currSubmarineAppearance].apply();
        this.torpedo.display();
        this.popMatrix();
    }
};

LightingScene.prototype.move = function(keycode) {

    if (keycode == 97 || keycode == 65) { //a || A
        if (this.submarine.subVelocity != 0) {
            this.submarine.subAngle += (2 * Math.PI) / 100;
            this.submarine.activateVerticalTrapezes(1);
        }
    }

    if (keycode == 115 || keycode == 83) { //s || S
        this.submarine.subVelocity -= 0.01 * this.speed;
    }

    if (keycode == 100 || keycode == 68) { //d || D
        if (this.submarine.subVelocity != 0) {
            this.submarine.subAngle -= (2 * Math.PI) / 100;
            this.submarine.activateVerticalTrapezes(2);
        }
    }

    if (keycode == 119 || keycode == 87) { //w || W
        this.submarine.subVelocity += 0.01 * this.speed;
    }

    if (keycode == 112 || keycode == 80) { //p || P
        this.submarine.updatePeriscopeMove(keycode);
    }

    if (keycode == 108 || keycode == 76) { //l || L
        this.submarine.updatePeriscopeMove(keycode);
    }

    if (keycode == 113 || keycode == 81) { //q || Q
        this.submarine.applySlope(1);
        this.submarine.activateHorizontalTrapezes(1);
    }

    if (keycode == 101 || keycode == 69) { //e || E
        this.submarine.applySlope(-1);
        this.submarine.activateHorizontalTrapezes(2);
    }

    if (keycode == 102 || keycode == 70) { //f || F
        if (this.targetIndex < 3) {
            this.torpedo = new MyTorpedo(this, this.submarine.subX, this.submarine.subY, this.submarine.subZ);
            this.torpedo.target = this.targets[this.targetIndex];
            this.torpedo.setPoints();
            this.targetIndex += 1;
        }
    }
};
