/** 
 * MyCylinderWithDiscs
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinderWithDiscs extends CGFobject
{ 
	constructor(scene) 
	{
		super(scene);

        this.cylinder = new MyCylinder (this.scene, 20, 20);    
        this.disc = new MyDisc (this.scene, 20);
	};

	display() 
	{
	    //cylinder
	    this.scene.pushMatrix();
      	this.scene.rotate( 90 * Math.PI/180.0,1,0,0);
		this.scene.scale (0.5,0.5,0.5);
		this.cylinder.display();
		this.scene.popMatrix();

		//disc 1
	    this.scene.pushMatrix();
	    this.scene.translate(0,-0.5,0);
      	this.scene.rotate( -90 * Math.PI/180.0,1,0,0);	    
	    this.scene.scale (0.5,0.5,0.5);
	    this.disc.display();
		this.scene.popMatrix();

		//disc 2
	    this.scene.pushMatrix();
      	this.scene.rotate( 90 * Math.PI/180.0,1,0,0);	    
	    this.scene.scale (0.5,0.5,0.5);
	    this.disc.display();
		this.scene.popMatrix();


	}
};
