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
		this.option2=false;

		this.speed=3;
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
		this.cube = new MyUnitCubeQuad (this);
		this.prism = new MyPrism(this,6,1000);
		this.cylinder = new MyCylinder (this,20,20);
//		this.clock = new MyClock(this);
		this.lamp = new MyLamp (this, 20, 20);
		this.plane = new MyPaperPlane (this);
		this.pyramid = new MyPyramid (this);
		this.trapezium = new MyTrapezium (this,0,1,0,1);
		this.car = new MyVehicle (this);
		this.terrain= new Plane(this,50,0,1,0,1);
		// Scene elements
		this.table = new MyTable(this);
		this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
		this.floor = new MyQuad(this, 0, 10, 0, 12);
		

		this.boardA = new Plane(this, BOARD_A_DIVISIONS,0,1,0,1);
		this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);
		// Materials
		this.materialDefault = new CGFappearance(this);
		
		this.materialA = new CGFappearance(this);
		this.materialA.setAmbient(0.3,0.3,0.3,1);
		this.materialA.setDiffuse(0.6,0.6,0.6,1);
		this.materialA.setSpecular(0,0.2,0.8,1);
		this.materialA.setShininess(120);

		this.materialB = new CGFappearance(this);
		this.materialB.setAmbient(0.3,0.3,0.3,1);
		this.materialB.setDiffuse(0.6,0.6,0.6,1);
		this.materialB.setSpecular(0,0,0.8,1);	
		this.materialB.setShininess(120);

		this.floorMaterial = new CGFappearance(this);
		this.floorMaterial.setAmbient(0.3,0.3,0.3,1);
		this.floorMaterial.setDiffuse(1,0.9,0.7,1);
		this.floorMaterial.setSpecular(0,0.2,0.8,1);
		this.floorMaterial.setShininess(120);
		
		this.wallMaterial = new CGFappearance(this);
		this.wallMaterial.setAmbient(0.3,0.3,0.3,1);
		this.wallMaterial.setDiffuse(1,0.8,0,1);
		this.wallMaterial.setSpecular(0,0.2,0.8,1);
		this.wallMaterial.setShininess(120);

		this.enableTextures(true);
		this.tableAppearance = new CGFappearance (this);
		this.tableAppearance.loadTexture ("../resources/images/table.png");

		this.floorAppearance = new CGFappearance (this);
		this.floorAppearance.loadTexture ("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap ('REPEAT', 'REPEAT');

		this.windowAppearance = new CGFappearance (this);
		this.windowAppearance.loadTexture ("../resources/images/window.png");
		this.windowAppearance.setTextureWrap ('CLAMP_TO_EDGE' ,'CLAMP_TO_EDGE')
	
		this.skyAppearance = new CGFappearance(this);
		this.skyAppearance.loadTexture("../resources/images/blue.png");
		//this.skyAppearance.setTextureWrap('REPEAT','REPEAT');

		this.slidesAppearance = new CGFappearance (this);
		this.slidesAppearance.loadTexture ("../resources/images/slides.png");
		this.slidesAppearance.setTextureWrap ('CLAMP_TO_EDGE' ,'CLAMP_TO_EDGE')
		this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 0);
		this.slidesAppearance.setAmbient(0.2,0.2,0.2,1);
		this.slidesAppearance.setShininess(30);
		this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

		this.boardAppearance = new CGFappearance (this);
		this.boardAppearance.loadTexture ("../resources/images/board.png");
		this.boardAppearance.setSpecular(0.3, 0.3, 0.3, 0);
		this.boardAppearance.setAmbient(0.4,0.4,0.4,1);
		this.boardAppearance.setShininess(90);
		this.boardAppearance.setDiffuse(0.5, 0.5, 0.5, 1);

		this.clockAppearance = new CGFappearance (this);
		this.clockAppearance.loadTexture ("../resources/images/clock.png");
	
		this.wheelTexture = new CGFappearance (this);
		this.wheelTexture.loadTexture ("../resources/images/wheel.png");

		this.bodyTexture = new CGFappearance (this);
		this.bodyTexture.loadTexture ("../resources/images/body.png");

		this.rimTexture = new CGFappearance (this);
		this.rimTexture.loadTexture ("../resources/images/rim.png");

		this.mirrorTexture = new CGFappearance (this);
		this.mirrorTexture.loadTexture ("../resources/images/mirror.png");
		
		this.stopLampTexture= new CGFappearance(this);
		this.stopLampTexture.loadTexture("../resources/images/stop.png");
		
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

		this.lights[2].setPosition (0, 1.0, 3.0, 1.0);
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
		//this.prism.display();
		//this.cylinder.display();
		//this.lamp.display();

		// this.materialDefault.apply();

		// // ---- END Background, camera and axis setup

		// // ---- BEGIN Scene drawing section

		// Floor
	/*	 this.pushMatrix();
		 this.translate(7.5, 0, 7.5);
		 this.rotate(-90 * degToRad, 1, 0, 0);
		 this.scale(15, 15, 0.2);
		 this.floorAppearance.apply();
		 this.floor.display();
		 this.popMatrix();

		 // Left Wall
		 this.pushMatrix();
		 this.translate(0, 4, 7.5);
		 this.rotate(90 * degToRad, 0, 1, 0);
		 this.scale(15, 8, 0.2);
		 this.windowAppearance.apply();
		 this.wall.display();
		 this.popMatrix();

		 // Plane Wall
		 this.pushMatrix();
		 this.translate(7.5, 4, 0);
		 this.scale(15, 8, 0.2);
		 this.wallMaterial.apply();
		 this.wall.display();
		 this.popMatrix();

		 // First Table
		 this.pushMatrix();
		 this.translate(5, 0, 8);
		 this.table.display();
		 this.popMatrix();

		// Second Table
		this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
		this.popMatrix();

		// // Board A
		 this.pushMatrix();
		 this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);	
		 this.slidesAppearance.apply();
		 this.boardA.display();
		 this.popMatrix();

	 // Board B
		 this.pushMatrix();
		 this.translate(10.5, 4.5, 0.2);
		 this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);	
		 this.boardAppearance.apply();
		 this.boardB.display();
		 this.popMatrix();
		this.clock.display();*/
//		this.slidesAppearance.apply();
//		this.cylinder.display();
//		this.translate (1,0,0);
//		this.cube.display ();
//		this.lamp.display();
//		this.pyramid.display();
//		this.trapezium.display();
		this.car.display();
		// ---- END Scene drawing section
		 this.pushMatrix();
		 this.rotate(-90*Math.PI/180.0,1,0,0);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);	
		 this.skyAppearance.apply();
		 this.terrain.display();
		 this.popMatrix();
		};
	doSomething()
	{ 
		console.log("Doing something..."); 
	}
	update (currentTime)
	{
//		this.clock.update (currentTime);
	}
};
