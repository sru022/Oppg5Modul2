"use strict";

class Cube
{
    constructor(gl, camera, color)
    {
        this.gl = gl;
        this.camera = camera;
        if (!color)
            this.color = {red:0.8, green:0.4, blue:0.6, alpha:1};
        else
            this.color = color;
        this.vertexBufferCube = null;
        this.colorBufferCube = null;

        this.wireFrame = false;
    }

    initBuffers()
    {

        let cubeVertices = new Float32Array([
            -1, 1, 1,
            -1,-1, 1,
            1,-1, 1,

            -1,1,1,
            1, -1, 1,
            1,1,1,


            1,1,1,
            1,-1,1,
            1,-1,-1,

            1,1,1,
            1,-1,-1,
            1,1,-1,


            1,-1,-1,
            -1,-1,-1,
            1, 1,-1,

            -1,-1,-1,
            -1,1,-1,
            1,1,-1,


            -1,-1,-1,
            -1,1,1,
            -1,1,-1,

            -1,-1,1,
            -1,1,1,
            -1,-1,-1,


            -1,1,1,
            1,1,1,
            -1,1,-1,

            -1,1,-1,
            1,1,1,
            1,1,-1,


            -1,-1,-1,
            -1,-1,1,
            1,-1,1,

            -1,-1,-1,
            1,-1,1,
            1,-1,-1
        ]);

        let colorArray = [];
        for (let i=0; i < 36; i++)
        {
            colorArray.push(this.color.red, this.color.green, this.color.blue, this.color.alpha);
        }
        let colors = new Float32Array(colorArray);

        this.vertexBufferCube = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, cubeVertices, this.gl.STATIC_DRAW);
        this.vertexBufferCube.itemSize = 3;
        this.vertexBufferCube.numberOfItems = 36;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.colorBufferCube = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferCube);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, colors, this.gl.STATIC_DRAW);
        this.colorBufferCube.itemSize = 4;
        this.colorBufferCube.numberOfItems = 36;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }


    draw(elapsed, modelMatrix)
    {
        this.camera.setCamera();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        let a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        this.gl.vertexAttribPointer(a_Position, this.vertexBufferCube.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_Position);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferCube);
        let a_Color = this.gl.getAttribLocation(this.gl.program, 'a_Color');
        this.gl.vertexAttribPointer(a_Color, this.colorBufferCube.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_Color);

        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);
        let u_modelviewMatrix = this.gl.getUniformLocation(this.gl.program, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.gl.program, "u_projectionMatrix");

        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);
        if (this.wireFrame)
        {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertexBufferCube.numberOfItems);
        }
        else
        {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBufferCube.numberOfItems);
        }
    }
}


