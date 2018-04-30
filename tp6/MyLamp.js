/**
 * MyLamp
 * @constructor
 */
class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks)
   {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;	
		this.initBuffers();

   }
 initBuffers() 
 {

	var angle = 2*Math.PI / this.slices;


	this.vertices=[];
 	this.normals=[];
 	this.indices=[];
 	this.texCoords=[];

	var stack_depth = 1/this.stacks;
	var radius = (Math.PI/4) / this.stacks; 
	var currentRadius;

 	for (var i = 0; i <this.stacks; i++){
		currentRadius = Math.cos(radius * i);
		
		for (var j = 0; j < this.slices; j++){

			this.vertices.push(currentRadius * Math.cos(j*angle), currentRadius * Math.sin(j*angle),i * stack_depth);	
			this.vertices.push(currentRadius * Math.cos(j*angle), currentRadius * Math.sin(j*angle),(i+1) * stack_depth);

			this.normals.push(currentRadius * Math.cos(j*angle), currentRadius * Math.sin(j*angle),0);	
			this.normals.push(currentRadius * Math.cos(j*angle), currentRadius * Math.sin(j*angle),0); //Normals in line with the vertexes	

			this.texCoords.push(((i + 1)/this.stacks) * (Math.cos(j*angle)/2 + 0.5), (i + 1)/this.stacks) * (1- (Math.sin(j*angle)/2 + 0.5));
			this.texCoords.push(((i + 1)/this.stacks) * (Math.cos(j*angle)/2 + 0.5), (i + 2)/this.stacks) * (1- (Math.sin(j*angle)/2 + 0.5));


	 		//indices

			if (j == this.slices - 1)
			{
				this.indices.push(0+j*2+i*2*this.slices,0+i*2*this.slices,1+j*2+i*2*this.slices);
				this.indices.push(0+i*2*this.slices,1+i*2*this.slices,1+j*2+i*2*this.slices);
			}
	
			else
			{
		        this.indices.push(0+j*2+i*2*this.slices,2+j*2+i*2*this.slices,1+j*2+i*2*this.slices);
			    this.indices.push(2+j*2+i*2*this.slices,3+j*2+i*2*this.slices,1+j*2+i*2*this.slices);
			}

 	  } 
    }	



 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
};