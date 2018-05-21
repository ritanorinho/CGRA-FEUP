class MyTerrain extends Plane 
{
    constructor(scene, nrDivs, altimetry) 
	{
		super(scene,nrDivs, 0, 1, 0, 1);
		this.altimetry = altimetry;
	}
   
   display()
   {

	this.vertices=[];
 	this.normals=[];
 	this.indices=[];

   	var a = 1/this.nrDivs;
   	var b = 1/this.nrDivs;
   	var depth = 1/this.nrDivs;
   		
   		for (var i = 0; i < this.nrDivs+1; i++)
   		{
	   		for (var j = 0; j < this.nrDivs+1; j++)
			{
				this.vertices.push (i, this.altimetry[i][j], j);
				this.normals.push (0,1,0);
			}
   		}

   		for (var i = 0; i < 1; i++)
   		{
	   		for (var j = 0; j < 1; j++)
			{
				this.indices.push(0, 9, 1);
				this.indices.push (9,10,2);
//				this.indices.push (i, j, 0);
//				this.indices.push ((this.nrDivs+1)*i+ j, (this.nrDivs+1)*(i+1)+j, 1 + (this.nrDivs+1)*i+j);
//				this.indices.push ((this.nrDivs+1)*(i+1)+ j, 1 + (this.nrDivs+1)*(i+1) +j, 1+(this.nrDivs+1)*i+j);
			}
  		}
   }
}