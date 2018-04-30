

class MyPaperPlane extends CGFobject
{
    constructor (scene)
    {
        super (scene);

        this.quad = new MyUnitCubeQuad (scene, 0 ,1, 0, 1);

        this.initBuffers();

    }
}