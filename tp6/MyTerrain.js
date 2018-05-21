class MyTerrain extends Plane 
{
    constructor(scene, nrDivs, altimetry) 
	{
		super(scene,nrDivs, 0, 1, 0, 1);
		this.altimetry = altimetry;
		this.setAltimetry();
	}
   
   setAltimetry()
   {
		var index = 2; 
		var length = this.altimetry.length;

		for (var i = 0; i < length; i++)
		{
			var length2 = this.altimetry[i].length;

			for (var j = 0; j < length2; j++)
			{
				this.vertices[index] = this.altimetry[i][j];
				index += 3;
			}
		}

	  super.initGLBuffers();
   }
}