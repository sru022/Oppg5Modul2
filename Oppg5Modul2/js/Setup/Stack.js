class Stack
{
	constructor() {this.matrixStack = [];}

	pushMatrix(matrix)
	{
		let copyToPush = new Matrix4(matrix);
		this.matrixStack.push(copyToPush);
	}

	popMatrix()
	{
		if (this.matrixStack.length == 0)
			throw "Feil i popMatrix - matrisestacken er tom!";
		this.matrixStack.pop();
	}

	peekMatrix()
	{
		if (this.matrixStack.length == 0)
			throw "Feil i peekMatrix - matrisestacken er tom!";
		let matrix = new Matrix4(this.matrixStack[this.matrixStack.length - 1]);
		return matrix;
	}

	empty() {this.matrixStack = [];}
}
