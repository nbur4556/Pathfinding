class Node{
	constructor(xPos, yPos, cell){
		this.xPos = xPos;
		this.yPos = yPos;
		this.cell = cell;
	}
	
	SetType(type){
		this.type = type;
	}
	
	SetParentNode(parentNode){
		this.parentNode = parentNode;
	}
	
	GetDistanceToTarget(target){
		var xDist = Math.abs(this.xPos - target.xPos);
		var yDist = Math.abs(this.yPos - target.yPos);
		var diagDist;
		var hvDist;
		
		if(xDist > yDist){
			diagDist = yDist;
			hvDist = xDist - diagDist;
		}
		else{
			diagDist = xDist;
			hvDist = yDist - diagDist;
		}
		
		console.log("Diag Distance: " + diagDist);
		console.log("HV Distance: " + hvDist);
		
		return "distance";
	}
}

class NodeGrid{
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.grid = this.GenerateGrid();
	}
	
	SetGrid(grid){
		this.grid = grid;
	}
	
	GenerateGrid(){
		var grid = new Array();
		
		for(let i = 0; i < this.width; i++){
			grid[i] = new Array();
			for(let ii = 0; ii < this.height; ii++){
				grid[i][ii] = null;
			}
		}
		
		return grid;
	}
}