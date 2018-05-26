/**
 * MyVehicle
 * @constructor
 */

class MyVehicle extends CGFobject 
{
	constructor(scene, speed) 
	{
		super(scene);

		this.x = 0.0;
		this.z = 5.0;
		this.carHeight=0;
		this.angle = Math.PI / 2;
		this.speed = speed;
		this.rotationAngle = 0;
		this.rotationWheels=0;
		this.wheelRotation=0;
		this.craneRotation=0;
		this.lastTime = 0;
		this.init = 0;


		this.bodyTexture = this.scene.carBlueTexture;

		this.wheel = new MyCylinder (this.scene,20,20);
		this.body = new MyUnitCubeQuad (this.scene, 0, 1, 0, 1);
		this.pyramid = new MyPyramid (this.scene, 0, 1, 0, 1);
		this.rim = new MyDisc (this.scene, 20);
		this.frontMirror = new MyTrapezium (this.scene, 0, 1, 0, 1);
		this.hood = new MyTrapezium (this.scene, 0, 1, 0, 1);
	    this.back = new MyTrapezium (this.scene, 0, 1, 0, 1);
	    this.stopLamp = new MyLamp(this.scene, 20,20); 
	};
    
    display()
    {
		//largura = 2.5
		//comprimento = 4.5 (sem farois)
		//diametro das rodas = 1
		//distancia entre eixos = 2
		//altura = 2

    	//comprimento corpo = 4
    	//largura corpo = 1.5
    	//altura corpo = 1

    	//diametro roda = 1
    	//espessura roda = 0.5

    	//altura espelho = 0.5

    	//comprimento capô = 0.5

    	//comprimento back = 0.5

//		this.bodyTexture = this.scene.carBlueTexture;


    	this.scene.pushMatrix();
    	this.scene.rotate(this.craneRotation*Math.PI/180.0,0,1,0);	
    	this.scene.translate (this.x,0+this.carHeight,this.z);     
		this.scene.rotate (this.rotationAngle * Math.PI/180,0,1,0);
	   	this.scene.translate (-this.x,0,-this.z);

        //body
        this.scene.pushMatrix();
//        this.bodyTexture.apply();
        this.scene.translate (this.x,0.5,this.z);
     //   this.scene.rotate (this.rotationAngle * Math.PI/180,0,1,0);
        this.scene.scale (1.5,1,4);
        this.body.display();
        this.scene.popMatrix();

        //capô
        this.scene.pushMatrix();
        this.scene.translate (this.x, 0.1,this.z+2.25);
        this.scene.scale (1.5, 0.8, 0.5); 
 //       this.bodyTexture.apply();
        this.hood.display();
        this.scene.popMatrix();
        
        //roda traseira esquerda
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (this.x+0.75,0,this.z-1.25);
      	this.scene.rotate(this.speed * this.rotationWheels*Math.PI/180,1,0,0);
      	this.scene.rotate( 90 * Math.PI/180.0,0,1,0);
      	this.scene.scale (0.5,0.5,0.5);
        this.wheel.display();
        this.scene.popMatrix();
	
		//jante traseira esquerda
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (this.x+0.75, 0, this.z-1.25);
		this.scene.rotate(this.speed * this.rotationWheels*Math.PI/180,1,0,0);
		this.scene.rotate(90 * Math.PI/180.0,0,1,0);
      	this.scene.scale (0.5,0.5,0.5);
        this.rim.display();
        this.scene.popMatrix();

       //roda dianteira esquerda
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (this.x+0.75,0, this.z+1.25);
      	this.scene.rotate((this.wheelRotation+90) * Math.PI/180.0,0,1,0);   
       	this.scene.rotate(this.speed * this.rotationWheels*Math.PI/180,0,0,1); 
    	this.scene.scale (0.5,0.5,0.5);
        this.wheel.display();
        this.scene.popMatrix();

		//jante dianteira esquerda
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
	 	this.scene.translate (this.x+0.75, 0, this.z+1.25);
	 	this.scene.rotate ((this.wheelRotation+90) * Math.PI/180.0,0,1,0);
	 	this.scene.rotate(this.speed * this.rotationWheels*Math.PI/180,0,0,1);      	
      	this.scene.scale (0.5,0.5,0.5);
        this.rim.display();
        this.scene.popMatrix();

        //roda dianteira direita
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (this.x-0.75,0, this.z+1.25);
      	this.scene.rotate((this.wheelRotation-90) * Math.PI/180.0,0,1,0);
     	this.scene.rotate(this.speed * -this.rotationWheels*Math.PI/180,0,0,1);      	
      	this.scene.scale (0.5,0.5,0.5);
        this.wheel.display();
        this.scene.popMatrix();

        //jante dianteira direita
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (this.x-0.75, 0, this.z+1.25);
		this.scene.rotate(( this.wheelRotation-90) * Math.PI/180.0,0,1,0);
	 	this.scene.rotate(this.speed *-this.rotationWheels*Math.PI/180,0,0,1);      	
      	this.scene.scale (0.5,0.5,0.5);
        this.rim.display();
        this.scene.popMatrix();

        //roda traseira direita
        this.scene.pushMatrix();
        this.scene.wheelTexture.apply();
        this.scene.translate (this.x-0.75,0,this.z-1.25);
        this.scene.rotate(this.speed * this.rotationWheels*Math.PI/180,1,0,0);
      	this.scene.rotate(-90 * Math.PI/180.0,0,1,0);
      	this.scene.scale (0.5,0.5,0.5);
        this.wheel.display();
        this.scene.popMatrix();

       	//jante traseira direita
        this.scene.pushMatrix();
		this.scene.rimTexture.apply();
		this.scene.translate (this.x-0.75, 0, this.z-1.25);
		this.scene.rotate(this.speed * this.rotationWheels*Math.PI/180,1,0,0);
		this.scene.rotate(-90 * Math.PI/180.0,0,1,0);
      	this.scene.scale (0.5,0.5,0.5);
        this.rim.display();
        this.scene.popMatrix();

		//espelho da frente
        this.scene.pushMatrix();
		this.scene.translate (this.x, 1.05,this.z+1.6);
		this.scene.scale (1.5, 0.4,0.75); //altura default do trapézio é 1.2
	//	this.scene.rotate((this.rotationAngle) * Math.PI/180.0,0,1,0);
		this.scene.mirrorTexture.apply();
		this.frontMirror.display();
        this.scene.popMatrix();

		//farol esquerdo
        this.scene.pushMatrix();
		this.scene.translate(this.x+0.5,0.4,this.z-2);
        this.scene.rotate(180*Math.PI/180.0,0,1,0);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.stopLampTexture.apply();
        this.stopLamp.display();
        this.scene.popMatrix();
        
        //farol direito
        this.scene.pushMatrix();
		this.scene.translate(this.x-0.5,0.4,this.z-2);
        this.scene.rotate(180*Math.PI/180.0,0,1,0);
        this.scene.scale(0.1,0.1,0.1);
        this.scene.stopLampTexture.apply();
        this.stopLamp.display();
        this.scene.popMatrix();

			
		this.scene.popMatrix();
        
    };

	getX()
	{
		return this.x;
	}

	getZ()
	{
		return this.z;
	}
	getCraneAngle()
	{
		return this.craneRotation;
	}
	getHeight(){
		return this.carHeight;
	}
    update(currTime, wPress, sPress, aPress, dPress)
    {
		var diff = (currTime - this.lastTime)/1000;
		this.lastTime = currTime;

		if (this.init != 0)
		{
				this.z += diff * this.speed * Math.sin((90 - this.rotationAngle) * Math.PI/180);
				this.x += diff * this.speed * Math.cos((90 - this.rotationAngle) * Math.PI/180); 
				this.rotationAngle += this.speed * this.wheelRotation/10;
		} 

		else
			this.init++;
    }
	
	accelerate ()
	{
		this.speed += 0.1; 
	}

	decelerate()
	{
		this.speed -= 0.1;
	}

	rotateLeft()
	{
		if (this.wheelRotation<45 && this.wheelRotation>= -45)
			this.wheelRotation+=5;

	}

	rotateRight()
	{
		if( this.wheelRotation<=45 && this.wheelRotation> -45)
				this.wheelRotation-=5;
	}
	setRotationAngle(angle)
	{
		this.rotationAngle=angle;
	}
	setCraneAngle(angle)
	{
		this.craneRotation=angle;
	}
	setCarHeight(y)
	{
		this.carHeight=y;
	}

	stabilize()
	{
		if (this.wheelRotation > 0)
			this.wheelRotation -= 5;
		
		if (this.wheelRotation < 0)
			this.wheelRotation += 5;
	}
	
	setSpeed (newSpeed)
	{
		this.speed = newSpeed;
	}

    setTexture (newTexture)
    {
    	this.bodyTexture = newTexture;
    }

    };
