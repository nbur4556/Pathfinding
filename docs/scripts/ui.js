var nodeTypeClassName = ""

window.onload = function(){	
	var nodeGrid;
	
	let gridWidth = document.getElementById("grid-x");
	let gridHeight = document.getElementById("grid-y");

	document.getElementById("btn-generate").addEventListener("click", function(){
		nodeGrid = new NodeGrid(gridWidth.value, gridHeight.value);
		nodeGrid.SetGrid(DisplayGrid(nodeGrid.grid));
	});
	
	document.getElementById("btn-set-start-node").addEventListener("click", function(){
		nodeTypeClassName = "start-node-cell";
	});
	document.getElementById("btn-set-end-node").addEventListener("click", function(){
		nodeTypeClassName = "end-node-cell";
	});
	document.getElementById("btn-set-wall-node").addEventListener("click", function(){
		nodeTypeClassName = "wall-node-cell";
	});
	
	document.getElementById("btn-find-path").addEventListener("click", function(){
		FindPath(nodeGrid.grid);
	});
}

function DisplayGrid(grid){
	var gridDisplaySection = document.getElementById("grid-display");
	
	var child = gridDisplaySection.lastElementChild;  
    while (child) { 
        gridDisplaySection.removeChild(child); 
        child = gridDisplaySection.lastElementChild; 
    } 
	
	for(let x = 0; x < grid.length; x++){
		for(let y = 0; y < grid[x].length; y++){
			grid[x][y] = new Node(x, y, document.createElement("div"));
			
			grid[x][y].cell.classList += "node-cell";
			grid[x][y].cell.addEventListener("click", function(){
				SetNodeType(grid[x][y]);
			});
			
			gridDisplaySection.appendChild(grid[x][y].cell);
		}
		gridDisplaySection.appendChild(document.createElement("br"));
	}
	
	return grid;
}

function SetNodeType(node){
	node.cell.classList = "node-cell";
	
	node.cell.classList.add(nodeTypeClassName);
	node.SetType(nodeTypeClassName);
	
	console.log(node);
}

function FindPath(grid){
	var startNode = FindNodeTypeInGrid(grid, "start-node-cell");
	var endNode = FindNodeTypeInGrid(grid, "end-node-cell");
	
	if(startNode == undefined || endNode == undefined){
		console.log("Could not find start and end node");
		return;
	}
	
	console.log(startNode.GetDistanceToTarget(endNode)); //Testing Purposes
}

function FindNodeTypeInGrid(grid, type){
	var node;
	
	for(let x = 0; x < grid.length; x++){
		for(let y = 0; y < grid[x].length; y++){
			if(grid[x][y].type == type){
				return grid[x][y];
			}
		}
	}
	
	return undefined;
}