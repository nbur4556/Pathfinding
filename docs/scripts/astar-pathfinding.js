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
	
	FindNeighborNodes(grid){
		var neighborNodes = new Array();
		
		let i = 0; 
		for(let x = 0; x < 3; x++){
			for(let y = 0; y < 3; y++){
				//console.log("X: " + this.xPos + (x-1));
				//console.log("Y: " + this.yPos + (y-1));
				let xCoord = (this.xPos - 1) + x;
				let yCoord = (this.yPos - 1) + y;
				
				if(xCoord == this.xPos && yCoord == this.yPos){
					continue;
				}
				
				neighborNodes[i] = grid[xCoord][yCoord];
				i++;
			}
		}
		
		return neighborNodes;
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
	
	FindNodeTypeInGrid(type){
		for(let x = 0; x < this.grid.length; x++){
			for(let y = 0; y < this.grid[x].length; y++){
				if(this.grid[x][y].type == type){
					return this.grid[x][y];
			}
		}
	}
	
	return undefined;
}
}

