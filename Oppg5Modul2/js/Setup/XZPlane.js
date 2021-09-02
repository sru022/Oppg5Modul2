"use strict";

class XZPlane
{
    constructor(gl, camera, canvas)
    {
        this.gl = gl;
        this.camera = camera;
        this.canvas = canvas;

        this.xzplanePositionBuffer = null;
        this.xzplaneColorBuffer = null;
    }

    initBuffers()
    {
        let width = this.canvas.width;
        let height = this.canvas.height;

        let xzplanePositions = new Float32Array([
            -width / 2, 0, height / 2,
            width / 2, 0, height / 2,
            -width / 2, 0, -height / 2,
            width / 2, 0, -height / 2
        ]);

        let xzplaneColors = new Float32Array([
            0.3, 0.5, 0.2, 1,
            0.3, 0.5, 0.2, 1,
            0.3, 0.5, 0.2, 1,
            0.3, 0.5, 0.2, 1
        ]);

        this.xzplanePositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.xzplanePositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, xzplanePositions, this.gl.STATIC_DRAW);
        this.xzplanePositionBuffer.itemSize = 3;
        this.xzplanePositionBuffer.numberOfItems = 4;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.xzplaneColorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.xzplaneColorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, xzplaneColors, this.gl.STATIC_DRAW);
        this.xzplaneColorBuffer.itemSize = 4;
        this.xzplaneColorBuffer.numberOfItems = 4;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    draw(elapsed)
    {
        this.camera.setCamera();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.xzplanePositionBuffer);
        let a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        this.gl.vertexAttribPointer(a_Position, this.xzplanePositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_Position);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.xzplaneColorBuffer);
        let a_Color = this.gl.getAttribLocation(this.gl.program, 'a_Color');
        this.gl.vertexAttribPointer(a_Color, this.xzplaneColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_Color);

        let modelMatrix = new Matrix4();
        modelMatrix.setIdentity();
        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);
        let u_modelviewMatrix = this.gl.getUniformLocation(this.gl.program, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.gl.program, "u_projectionMatrix");

        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.xzplanePositionBuffer.numberOfItems);
    }
}


