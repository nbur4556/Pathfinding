class Node{
	constructor(xPos, yPos, cell){
		this.xPos = xPos;
		this.yPos = yPos;
		this.cell = cell;
	}
	
	//Distance on path so far
	SetGCost(gCost){
		if(this.parentNode.gCost != undefined){
			this.gCost = gCost + this.parentNode.gCost;
		}
		else{
			this.gCost = gCost;
		}
	}
	
	//Shortest distance to end node without obstacles
	SetHCost(hCost){
		this.hCost = hCost;
	}
	
	//Sum of gCost and hCost
	SetFCost(fCost){
		this.fCost = this.gCost + this.hCost;
	}
	
	SetType(type){
		this.type = type;
	}
	
	SetParentNode(parentNode){
		this.parentNode = parentNode;
	}
	
	GetParentNode(){
		return this.parentNode;
	}
	
	GetCostToTarget(target){
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
		
		return ((diagDist * 14) + (hvDist * 10));
	}
	
	FindNeighborNodes(grid){
		var neighborNodes = new Array();
		
		let i = 0; 
		for(let x = 0; x < 3; x++){
			for(let y = 0; y < 3; y++){
				let xCoord = (this.xPos - 1) + x;
				let yCoord = (this.yPos - 1) + y;
				
				let isStartNode = (grid[xCoord][yCoord].type == "start-node-cell");
				//let isEndNode = (grid[xCoord][yCoord].type == "end-node-cell");
				let isPendingNode = (grid[xCoord][yCoord].type == "pending-node-cell");
				let isCompletedtNode = (grid[xCoord][yCoord].type == "completed-node-cell");
				let isWallNode = (grid[xCoord][yCoord].type == "wall-node-cell");
				
				if(xCoord == this.xPos && yCoord == this.yPos){
					continue;
				}
				
				if(isStartNode == true || isCompletedtNode == true || isWallNode == true){
					continue;
				}
				
				if(isPendingNode == true){
					let newGCost = grid[xCoord][yCoord].GetCostToTarget(this) + this.gCost;
					if((newGCost + grid[xCoord][yCoord].hCost) > grid[xCoord][yCoord].fCost){
						continue;
					}
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

