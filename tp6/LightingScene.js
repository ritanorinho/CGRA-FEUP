var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();
	};
 
	init(application) 
	{

		super.init(application);

		this.initCameras();

	 	this.initLights();
	 	
		this.axisOn=true; 
		//this.option2=false;

		this.speed=1;
		this.light0=true;
		this.light1=true;
		this.light2=true;
		this.light3=true;

		this.gl.clearColor(0, 0.5, 1.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		
		//example for nrDivs = 8 -> grid of 9x9 vertices
		this.altimetry= [
		[ 0.0 , 0.0 , 0.0, 4.0, 2.5, 2.4, 2.3, 2.3,0 ],
		[ 0.0 , 0.0 , 0.0, 2.0, 7.5, 6.4, 5.5, 3.5,0 ],
		[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 3.0,0 ],
		[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 2.0,0 ],
		[ 0.0 , 0.0 , 2.0, 2.0, 1.5, 0.0, 0.0, 1.0,0 ],
		[ 1.0 , 0.0 , 2.0, 2.0, 0.5, 0.0, 0.0, 0.0,0 ],
		[ 3.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,0 ],
		[ 4.5 , 7.0 , 3.0, 0.0, 0.0, 0.0, 0.0, 0.0,10 ],
		[ 4.0 , 5.0 , 4.0, 1.0, 2.5, 2.4, 2.3, 1.3,0 ],
		];

		this.vehicleAppearances = new Array();
		this.currVehicleAppearance = 0;

		this.car = new MyVehicle (this, this.speed);
		this.terrain= new MyTerrain (this,8, this.altimetry);
		this.crane = new MyCrane (this);

		this.wPress = false;
		this.sPress = false;
		this.aPress = false;
		this.dPress = false;

		this.enableTextures(true);
		
		this.gardenAppearance = new CGFappearance(this);
		this.gardenAppearance.loadTexture("../resources/images/mountain.jpg");
		
		this.skyAppearance = new CGFappearance(this);
		this.skyAppearance.loadTexture("../resources/images/blue.png");
		//this.skyAppearance.setTextureWrap('REPEAT','REPEAT');
	
		this.wheelTexture = new CGFappearance (this);
		this.wheelTexture.loadTexture ("../resources/images/wheel.png");

		this.carBlueTexture = new CGFappearance (this);
		this.carBlueTexture.loadTexture ("../resources/images/carBlue.png");

		this.carRainbowTexture = new CGFappearance (this);
		this.carRainbowTexture.loadTexture ("../resources/images/carRainbow.png");

		this.carRedTexture = new CGFappearance (this);
		this.carRedTexture.loadTexture ("../resources/images/carRed.jpg");
		
		this.carGreenTexture = new CGFappearance (this);
		this.carGreenTexture.loadTexture ("../resources/images/carGreen.png");

		this.carYellowTexture = new CGFappearance (this);
		this.carYellowTexture.loadTexture ("../resources/images/carYellow.png");

		this.rimTexture = new CGFappearance (this);
		this.rimTexture.loadTexture ("../resources/images/rim.png");

		this.mirrorTexture = new CGFappearance (this);
		this.mirrorTexture.loadTexture ("../resources/images/mirror.png");
		
		this.metalTexture = new CGFappearance (this);
		this.metalTexture.loadTexture  ("../resources/images/metal.jpg");

		this.stopLampTexture= new CGFappearance(this);
		this.stopLampTexture.loadTexture("../resources/images/stop.png");
		
		this.vehicleAppearances.push (this.carBlueTexture);
		this.vehicleAppearances.push (this.carRainbowTexture);
		this.vehicleAppearances.push (this.carRedTexture);
		this.vehicleAppearances.push (this.carGreenTexture);
		this.vehicleAppearances.push (this.carYellowTexture);

		this.setUpdatePeriod(100);
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		
		this.setGlobalAmbientLight(0,0,0,1);
		
		// Positions for four lights
		
		this.lights[0].setPosition(4, 2, -2, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular (1,1,0,1);
		this.lights[0].enable();
	

		this.lights[1].setPosition(-5, -1.0, 0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setPosition (5, 40.0, 5.0, 0.0);
		this.lights[2].setVisible(true);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular (1,1,1,1);
		this.lights[2].setConstantAttenuation(1);
		this.lights[2].setLinearAttenuation (1);
		this.lights[2].setQuadraticAttenuation (0);
		 this.lights[2].enable();

		//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setPosition(0, 6, 0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)	
	
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
/*		this.lights[3].setSpecular (1,1,0,1);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation (0);
		this.lights[3].setQuadraticAttenuation (1);*/
		this.lights[3].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	if (this.light0)
		this.lights[0].enable();
	else
		this.lights[0].disable();
		
	if (this.light1)
		this.lights[1].enable();
	else
		this.lights[1].disable();
	
	if (this.light2)
		this.lights[2].enable();
	else
		this.lights[2].disable();
			
	if (this.light3)
		this.lights[3].enable();
	else
		this.lights[3].disable();
	}

	checkKeys()
	{
		this.wPress = false;
		this.sPress = false;
		this.aPress = false;
		this.dPress = false;

	if (this.gui.isKeyPressed("KeyW"))
		this.car.accelerate();

	if (this.gui.isKeyPressed("KeyS"))
		this.car.decelerate();
	
	if (this.gui.isKeyPressed("KeyA"))
		this.car.rotateLeft();

	if (this.gui.isKeyPressed("KeyD"))
		this.car.rotateRight();

	if (!this.gui.isKeyPressed("KeyD") &&
		!this.gui.isKeyPressed("KeyA"))
		this.car.stabilize();
	}



	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// // Update all lights used
			this.updateLights();
		// Draw axis
		if (this.axisOn)	this.axis.display();

		this.pushMatrix();
//		this.translate (0, 0.5, 2);
		this.vehicleAppearances[this.currVehicleAppearance].apply()
		this.car.display();
		this.popMatrix();

		this.pushMatrix();
		this.rotate(-90*Math.PI/180.0,1,0,0);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);	
		this.gardenAppearance.apply();
//		this.terrain.display();
		this.popMatrix();
		
		this.pushMatrix();
		this.metalTexture.apply();
		this.crane.display();
		this.popMatrix();

		};
	doSomething()
	{ 
		console.log("Doing something..."); 
	}
	update (currentTime)
	{
		this.checkKeys();
		this.car.update(currentTime);
		if (this.car.getZ() > 9 && this.car.getZ() < 10
			&& this.car.getX() > 0 && this.car.getX() < 1 )										
		{
			//this.crane.update(currentTime);
			this.car.setSpeed (0);
		}
	}
};
