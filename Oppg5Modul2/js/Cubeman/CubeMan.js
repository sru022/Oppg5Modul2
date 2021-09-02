"use strict";

class CubeMan
{
    constructor(gl, camera)
    {
        this.gl = gl;
        this.camera = camera;
        this.stack = new Stack();
        this.cube1 = null;
        this.cube2 = null;
        this.cube3 = null;
    }

    initBuffers()
    {
        this.cube1 = new Cube(this.gl, this.camera, {red:0.3, green:0.12, blue:0.9, alpha:1});
        this.cube1.initBuffers();

        this.cube2 = new Cube(this.gl, this.camera, {red:1, green:0.25, blue:0.45, alpha:1});
        this.cube2.initBuffers();

        this.cube3 = new Cube(this.gl, this.camera, {red:0.5, green:0.23, blue:1, alpha:1});
        this.cube3.initBuffers();
    }

    draw(elapsed, modelMatrix)
    {
        this.stack.pushMatrix(modelMatrix);
        modelMatrix.scale(4, 4.5, 1);
        modelMatrix.translate(0, 0.65, 0);
        this.cube3.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-4, 6, 0);
        modelMatrix.rotate(120, 0, 0, 1);
        modelMatrix.scale(5, 0.5, 0.5);
        this.cube2.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-3.5, -3, 0);
        modelMatrix.rotate(60, 0, 0, 1);
        modelMatrix.scale(2, 0.5, 0.5);
        this.cube2.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(3.5, -3, 0);
        modelMatrix.rotate(120, 0, 0, 1);
        modelMatrix.scale(2, 0.5, 0.5);
        this.cube2.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 7.75, 0);
        modelMatrix.scale(0.4, 0.3, 1);
        this.cube2.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 10, 0);
        modelMatrix.scale(2, 2, 1);
        this.cube1.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(4, 6, 0);
        modelMatrix.rotate(-60, 0, 0, 1);
        modelMatrix.translate(3, 0, 0);
        this.stack.pushMatrix(modelMatrix);
        modelMatrix.scale(3, 0.5, 0.5);
        this.cube2.draw(elapsed, modelMatrix);

        this.stack.empty();
    }
}


