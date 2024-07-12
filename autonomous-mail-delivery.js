// write a program to control a network of autonomous mail delivery trains.
// each instance of this problem has:
// a network, consisting of a set of nodes, each described by a string name
// a set of edges, each of which links two nodes and has an associated journey time in seconds. edges are undirected and any number of trains can travel along any edge in any combination of orders. an edge is uniquely described by a pair of nodes
// a set of trains in the network, each of which has a maximum total weight it can carry. all trains starts off empty and each train has a node where it starts off.
// there is a set of packages in the network, each of which has a weight and start off located at a node, and each of which has a destination node
//
// node -- undirected edge, cost to travel in seconds -- node
//
// trains travel network, has weight capacity, can travel in either direction, no limit train per edge --> concurrency?
// packages, has weight, has a source location and end destination
//
//
var Nodes = /** @class */ (function () {
    function Nodes(name) {
        this.name = name;
    }
    return Nodes;
}());
// is the list of nodes circular? i.e. first node and last node linked?
var Edge = /** @class */ (function () {
    function Edge(name, node1, node2, journeyTimeInMinutes) {
        this.name = name;
        this.node1 = node1;
        this.node2 = node2;
        this.journeyTimeInMinutes = journeyTimeInMinutes;
    }
    return Edge;
}());
var Train = /** @class */ (function () {
    function Train(trainName, capacityInKg, startingNode) {
        this.trainName = trainName;
        this.capacityInKg = capacityInKg;
        this.startingNode = startingNode;
    }
    return Train;
}());
var Package = /** @class */ (function () {
    function Package(packageName, weightInKg, startingNode, destinationNode) {
        this.packageName = packageName;
        this.weightInKg = weightInKg;
        this.startingNode = startingNode;
        this.destinationNode = destinationNode;
    }
    return Package;
}());
function main(listOfNodes, listOfEdges, listOfTrains, listOfPackages) {
    console.log("listOfNodes", listOfNodes, "listOfEdges", listOfEdges, "listOfTrains", listOfTrains, "listOfPackages", listOfPackages);
    // train needs to know which direction to travel
    // train knows where it is, needs to know where is the closest package and if the package is within weight limit
    // first lets do the simple case
    // let train travel through the list of nodes in one direction
    // check if there are packages in the node,
    // if there is, check if it's within capacity, then deduct capacity
    // go to destination, determine which direction to travel at current node
    for (var i = 0; i < listOfTrains.length; i++) {
        // check if there are any packages
        var train = listOfTrains[i];
        var index = findIndex(train.startingNode, listOfNodes, listOfEdges);
        console.log("train", train, index);
        travelEdge(train.startingNode, index, listOfEdges, listOfPackages);
    }
}
function findIndex(targetNode, listOfNodes, listOfEdges) {
    var targetIndex = 0;
    // find index of Node
    for (var i = 0; i < listOfNodes.length; i++) {
        var currNode = listOfNodes[i];
        if (targetNode.name === currNode.name) {
            targetIndex = i;
        }
    }
    return targetIndex;
}
function findPackageIndexInNode(currentNode, listOfPackages) {
    for (var i = 0; i < listOfPackages.length; i++) {
        var package = listOfPackages[i];
        if (package.startingNode.name === currentNode.name) {
            return package;
        }
    }
    return null;
}
function generateNodes(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var node = new Nodes("Node" + i);
        arr.push(node);
    }
    return arr;
}
function generateEdges(nodes) {
    var arr = [];
    for (var i = 0; i < nodes.length; i++) {
        var name_1 = String.fromCharCode(i + "A".charCodeAt(0));
        var edge = new Edge(name_1, nodes[i], nodes[i + 1], i);
        arr.push(edge);
    }
    return arr;
}
function travelEdge(startingNode, index, listOfEdges, listOfPackages) {
    // base case
    if (index === listOfNodes.length - 1) {
        console.log("end of node list");
        return;
    }
    console.log("travelling at index:", index);
    // pre
    var package = findPackageIndexInNode(startingNode, listOfPackages);
    if (package) {
        console.log("package found!", package);
    }
    // recurse
    travelEdge(listOfEdges[index].node2, index + 1, listOfEdges, listOfPackages);
    // post
}
function generateTrains(n, nodes) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var train = new Train("Train" + 1, 50, nodes[i]);
        arr.push(train);
    }
    return arr;
}
function generatePackages(n, nodes) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var package = new Package("Package" + i, 20, nodes[2], nodes[4]);
        arr.push(package);
    }
    return arr;
}
var listOfNodes = generateNodes(10);
var listOfEdges = generateEdges(listOfNodes);
var listOfTrains = generateTrains(1, listOfNodes);
var listOfPackages = generatePackages(1, listOfNodes);
main(listOfNodes, listOfEdges, listOfTrains, listOfPackages);
