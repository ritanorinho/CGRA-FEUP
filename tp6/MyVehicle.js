/**
 * MyVehicle
 * @constructor
 */

class MyVehicle extends CGFobject 
{
	constructor(scene) 
	{
		super(scene);
		this.wheel = new MyCylinder (this.scene,20,20);
		this.body = new MyUnitCubeQuad (this.scene, 0, 1, 0, 1);
		this.pyramid = new MyPyramid (this.scene, 0, 1, 0, 1);
		this.rim = new MyDisc (this.scene, 20);
		this.frontMirror = new MyTrapezium (this.scene, 0, 1, 0, 1);
		this.pyramid.initBuffers();
		this.body.initBuffers();
	};
    
    display()
    {
        //body
        this.scene.pushMatrix();
        this.scene.bodyTexture.apply();
        this.scene.translate (0,1,0);
        this.scene.scale (4, 2,6);
        this.body.display();
        this.scene.popMatrix();

        //roda traseira esquerda
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (2,0,-3);
      	this.scene.rotate(90 * Math.PI/180.0,0,1,0);
        this.wheel.display();
        this.scene.popMatrix();
		
		//jante traseira esquerda
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (2, 0, -3);
		this.scene.rotate(90 * Math.PI/180.0,0,1,0);
        this.rim.display();
        this.scene.popMatrix();

       //roda dianteira esquerda
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (2,0,3);
      	this.scene.rotate(90 * Math.PI/180.0,0,1,0);
        this.wheel.display();
        this.scene.popMatrix();

		//jante dianteira esquerda
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (2, 0, 3);
		this.scene.rotate(90 * Math.PI/180.0,0,1,0);
        this.rim.display();
        this.scene.popMatrix();

        //roda dianteira direita
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (-2,0,3);
      	this.scene.rotate(-90 * Math.PI/180.0,0,1,0);
        this.wheel.display();
        this.scene.popMatrix();

        //jante dianteira direita
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (-2, 0, 3);
		this.scene.rotate(-90 * Math.PI/180.0,0,1,0);
        this.rim.display();
        this.scene.popMatrix();

        //roda traseira direita
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (-2,0,-3);
      	this.scene.rotate(-90 * Math.PI/180.0,0,1,0);
        this.wheel.display();
        this.scene.popMatrix();

       	//jante traseira esquerda
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (-2, 0, -3);
		this.scene.rotate(-90 * Math.PI/180.0,0,1,0);
        this.rim.display();
        this.scene.popMatrix();

		//espelho da frente
        this.scene.pushMatrix();
		this.scene.translate (0, 2.1, 2.2);
		this.scene.scale (4, 1,1.5);
		this.scene.mirrorTexture.apply();
		this.frontMirror.display();
        this.scene.popMatrix();
    };
};
