var nodeGrid;
var nodeTypeClassName = ""

window.onload = function(){	
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
	document.getElementById("btn-set-pending-node").addEventListener("click", function(){
		nodeTypeClassName = "pending-node-cell";
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
			grid[x][y].cell.addEventListener("click", function(){ //Grid Cell Listener
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
	
	FindDistanceToEndNode(node) //Testing Purposes
}

function FindPath(grid){
	var startNode = nodeGrid.FindNodeTypeInGrid("start-node-cell");
	var endNode = nodeGrid.FindNodeTypeInGrid("end-node-cell");
	
	if(startNode == undefined || endNode == undefined){
		console.log("Could not find start and end node");
		return;
	}
	
	neighbors = startNode.FindNeighborNodes(nodeGrid.grid);
	for(let i = 0; i < neighbors.length; i++){
		nodeTypeClassName = "pending-node-cell";
		SetNodeType(neighbors[i]);
	}
}

//Testing Purposes
function FindDistanceToEndNode(node){
	var endNode = nodeGrid.FindNodeTypeInGrid("end-node-cell");
	
	if(endNode == undefined){ return; }
	
	console.log(node.GetDistanceToTarget(endNode)); //Testing Purposes
}