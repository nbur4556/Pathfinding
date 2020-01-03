var nodeGrid;
var nodeTypeClassName = ""

var isDisplayFCost = true;

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
	/*document.getElementById("btn-set-pending-node").addEventListener("click", function(){
		nodeTypeClassName = "pending-node-cell";
	});*/
	
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

function FindPath(grid){
	var startNode = nodeGrid.FindNodeTypeInGrid("start-node-cell");
	var endNode = nodeGrid.FindNodeTypeInGrid("end-node-cell");
	var nextNode = startNode;
	var pendingNodes = new Array();
	
	if(startNode == undefined || endNode == undefined){
		console.log("Could not find start and end node");
		return;
	}
	
	
	pendingNodes = SetNeighbors(nextNode);
	for(let i = 0; i < 10; i++){
		nextNode = GetSmallestFCost(pendingNodes);
		
		pendingNodes = pendingNodes.concat(SetNeighbors(nextNode));
		pendingNodes = RemoveNodeFromList(pendingNodes, nextNode);
	}
}

function RemoveNodeFromList(nodeList, removeNode){	
	for(let i = 0; i < nodeList.length; i++){
		if(nodeList[i].cell == removeNode.cell){
			console.log("remove");
			nodeList.splice(i, 1);
		}
	}
	
	nodeTypeClassName = "completed-node-cell";
	SetNodeType(removeNode);
	
	return nodeList;
}

function SetNodeType(node){
	node.cell.classList = "node-cell";
	
	node.cell.classList.add(nodeTypeClassName);
	node.SetType(nodeTypeClassName);
	
	SetCosts(node);
}

function SetCosts(node){
	var endNode = nodeGrid.FindNodeTypeInGrid("end-node-cell");
	var parentNode = node.GetParentNode();
	
	if(endNode != undefined)
		node.SetHCost(node.GetCostToTarget(endNode));	
	if(parentNode != undefined)
		node.SetGCost(node.GetCostToTarget(parentNode));
	if(endNode != undefined && parentNode != undefined)
		node.SetFCost();
	
	DisplayFCost(node);
}

function SetNeighbors(node){
	var neighborNodes = node.FindNeighborNodes(nodeGrid.grid);
	for(let i = 0; i < neighborNodes.length; i++){
		neighborNodes[i].SetParentNode(node);
		nodeTypeClassName = "pending-node-cell";
		SetNodeType(neighborNodes[i]);
		
		//console.log(neighborNodes[i]);
	}
	
	return neighborNodes;
}

function GetSmallestFCost(nodeList){
	let smallestFCost = nodeList[0];
	
	for(let i = 0; i < nodeList.length; i++){
		if(nodeList[i].fCost < smallestFCost.fCost){
			smallestFCost = nodeList[i];
		}
	}
	
	return smallestFCost;
}

function DisplayFCost(node){
	if(node.fCost != undefined && isDisplayFCost == true){
		if(node.cell.childNodes[0]){
			node.cell.removeChild(node.cell.childNodes[0]);
		}
		
		let txt = document.createTextNode(node.fCost);
		node.cell.appendChild(txt);
	}
}