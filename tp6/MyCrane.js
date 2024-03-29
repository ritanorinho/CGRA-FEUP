/** 
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject
{ 
	constructor(scene) 
	{
		super(scene);
        this.angle = 0;
        this.lastTime = 0;
		this.direction=1;
		this.imanHeight = 0;
		this.imanZ = 0;
		this.armAngle = 0;
		this.hasCar = 0;
		this.finish=false;

        this.base = new MyCylinderWithDiscs(this.scene);    
        this.arm = new MyCylinderWithDiscs(this.scene); 
	    this.joint = new MyCylinderWithDiscs(this.scene);
        this.wire = new MyCylinderWithDiscs (this.scene);
        this.iman = new MyCylinderWithDiscs(this.scene);
};

	display() 
	{
	    this.scene.pushMatrix();
		this.scene.rotate( 180 * Math.PI/180.0,0,1,0);

        this.scene.rotate (this.angle * Math.PI/180,0,1,0);
	    
	    //base
	    this.scene.pushMatrix();
		this.base.display();
		this.scene.popMatrix();

        //braço 1
		this.scene.pushMatrix();
		this.scene.rotate( 45 * Math.PI/180.0,1,0,0);
		this.scene.rotate( 180 * Math.PI/180.0,0,0,1);
		this.scene.scale(0.5,15,0.5);
		this.arm.display();
		this.scene.popMatrix();

        //joint
        this.scene.pushMatrix();
        this.scene.translate(-0.125, 0.1 + Math.sin(Math.PI/4)*7.5, 0.1 + Math.cos(Math.PI/4)*7.5);
     	this.scene.rotate( 90 * Math.PI/180.0,0,0,1);
		this.scene.scale(0.5,0.5,0.5);
		this.joint.display();
		this.scene.popMatrix();

        //braço 2
		this.scene.pushMatrix();
		this.scene.translate (0, Math.sin(Math.PI/4)*7.5,0.25 + Math.cos(Math.PI/4)*7.5);
		this.scene.rotate( (-80 + this.armAngle) * Math.PI/180.0,1,0,0);
		this.scene.scale(0.5,8,0.5);
		this.arm.display();
		this.scene.popMatrix();

        //wire
		this.scene.pushMatrix();
	    this.scene.translate (0, 4.9 - this.imanHeight, 0.3 + Math.sin(4*Math.PI/9)*3.75 + Math.cos(Math.PI/4)*7.5 - this.imanZ);		
	    this.scene.scale(0.1,2.4,0.1);
		this.wire.display();
		this.scene.popMatrix();

		//iman
	    this.scene.pushMatrix();
	    this.scene.translate (0, 3.7 - this.imanHeight, 0.25 + Math.sin(4*Math.PI/9)*3.75 + Math.cos(Math.PI/4)*7.5 - this.imanZ);
        this.scene.scale(1.5,0.5,1.5);
		this.arm.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
	getAngle(){
		return this.angle;
	}
	getImanHeight(){
		return this.imanHeight;
	}
	update (currTime)
	{
	    var diff = (currTime - this.lastTime)/1000;
	    this.lastTime = currTime;
            
            if ((this.angle %180)==0 && this.angle != 0){
            	this.direction=0;
            }
            if (this.angle==0 && this.hasCar==1){
            	this.direction=0;
            	this.finish=true;
            	this.hasCar=0;
            }

            if (this.direction == 0 && this.hasCar == 0 && this.imanHeight < 2.5 && this.angle==180)
            {
            	this.imanHeight += 2.5/7;
            	this.imanZ += 1/7;
            	this.armAngle += 5;
            }

			if (this.imanHeight >= 2.5)
			  	this.hasCar = 1;

            if (this.hasCar == 1 && this.imanHeight > 0)
            {
            	this.imanHeight -= 2.5/7;
            	this.imanZ -= 1/7;
            	this.armAngle -= 5;
            }

            if (this.hasCar == 1 && this.imanHeight <= 0 && this.angle >0)
            {
            
				this.direction = -1;
            }
        //   this.angle += this.direction * diff * 30;
        	this.angle += this.direction*6;
	}
	
};
