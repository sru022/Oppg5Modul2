"use strict";

class Camera
{
    constructor(canvas, currentlyPressedKeys, camPosX=5, camPosY=20, camPosZ=35, lookAtX=0, lookAtY=0, lookAtZ=0, upX=0, upY=1, upZ=0)
    {
        this.canvas = canvas;
        this.currentlyPressedKeys = currentlyPressedKeys;

        this.camPosX = camPosX;
        this.camPosY = camPosY;
        this.camPosZ = camPosZ;

        this.lookAtX = lookAtX;
        this.lookAtY = lookAtY;
        this.lookAtZ = lookAtZ;

        this.upX = upX;
        this.upY = upY;
        this.upZ = upZ;

        this.near = 0.1;
        this.far = 10000;

        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
    }

    setCamera()
    {
        this.viewMatrix.setLookAt(this.camPosX, this.camPosY, this.camPosZ, this.lookAtX, this.lookAtY, this.lookAtZ, this.upX, this.upY, this.upZ);
        this.projectionMatrix.setPerspective(45, this.canvas.width / this.canvas.height, this.near, this.far);
    }

    getModelViewMatrix(modelMatrix) {return new Matrix4(this.viewMatrix.multiply(modelMatrix));}

    setPosition(posX, posY, posZ)
    {
        this.camPosX = posX;
        this.camPosY = posY;
        this.camPosZ = posZ;
    }

    setLookAt(lookX, lookY, lookZ)
    {
        this.lookAtX = lookX;
        this.lookAtY = lookY;
        this.lookAtZ = lookZ;
    }

    setUp(upX, upY, upZ)
    {
        this.lookAtX = upX;
        this.lookAtY = upY;
        this.lookAtZ = upZ;
    }

    setNear(near) {this.near = near;}
    setFar(far) {this.far = far;}

    handleKeys(elapsed)
    {
        let camPosVec = vec3.fromValues(this.camPosX, this.camPosY, this.camPosZ);
        if (this.currentlyPressedKeys[65])
        {
            rotateVector(2, camPosVec, 0, 1, 0);
        }
        if (this.currentlyPressedKeys[68])
        {
            rotateVector(-2, camPosVec, 0, 1, 0);
        }
        if (this.currentlyPressedKeys[87])
        {
            rotateVector(2, camPosVec, 1, 0, 0);
        }
        if (this.currentlyPressedKeys[83])
        {
            rotateVector(-2, camPosVec, 1, 0, 0);
        }

        if (this.currentlyPressedKeys[86]) {vec3.scale(camPosVec, camPosVec, 1.05);}
        if (this.currentlyPressedKeys[66]) {vec3.scale(camPosVec, camPosVec, 0.95);}

        this.camPosX = camPosVec[0];
        this.camPosY = camPosVec[1];
        this.camPosZ = camPosVec[2];

        this.setCamera();
    }
}


