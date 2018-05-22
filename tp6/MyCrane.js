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
        this.base = new MyCylinderWithDiscs(this.scene);    
        this.arm = new MyCylinderWithDiscs(this.scene); 
	    this.joint = new MyCylinderWithDiscs(this.scene);
        this.wire = new MyCylinderWithDiscs (this.scene);
        this.iman = new MyCylinderWithDiscs(this.scene);
};

	display() 
	{
	    this.scene.pushMatrix();

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
		this.scene.rotate( -45 * Math.PI/180.0,1,0,0);
		this.scene.scale(0.5,7.5,0.5);
		this.arm.display();
		this.scene.popMatrix();

        //wire
		this.scene.pushMatrix();
	    this.scene.translate (0,2.65, 0.25 + Math.cos(Math.PI/4)*3.75 + Math.cos(Math.PI/4)*7.5);		
	    this.scene.scale(0.1,1.8,0.1);
		this.wire.display();
		this.scene.popMatrix();

		//iman
	    this.scene.pushMatrix();
	    this.scene.translate (0,1.75, 0.25 + Math.cos(Math.PI/4)*3.75 + Math.cos(Math.PI/4)*7.5);
        this.scene.scale(1.5,0.5,1.5);
		this.arm.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}

	update (currTime)
	{
	    var diff = (currTime - this.lastTime)/1000;
	    this.lastTime = currTime;
            
            
           
            if (this.angle ==180){
            	this.direction=-1;
            }
            if (this.angle==0)
            	this.direction=1;
        //   this.angle += this.direction * diff * 30;
        this.angle+=this.direction*3;
	}
	
};
