"use strict";
exports.__esModule = true;
var Classes_1 = require("./Classes");
// write a program to control a network of autonomous mail delivery trains.
// each instance of this problem has:
// a network, consisting of a set of nodes, each described by a string name
// a set of edges, each of which links two nodes and has an associated journey time in seconds. edges are undirected and any number of trains can travel along any edge in any combination of orders. an edge is uniquely described by a pair of nodes
// a set of trains in the network, each of which has a maximum total weight it can carry. all trains starts off empty and each train has a node where it starts off.
// there is a set of packages in the network, each of which has a weight and start off located at a node, and each of which has a destination node
//
// node -- undirected edge, cost to travel in minutes -- node
//
// trains travel network, has weight capacity, can travel in either direction, no limit train per edge/node --> concurrency?
// packages, has weight, has a source location and end destination
//
//
// is the list of nodes circular? i.e. first node and last node linked?
// likely not if the given example has 3 nodes, 2 edge
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
        // for now, assign 1 train to 1 package
        var targetPackage = listOfPackages[0];
        start(train, targetPackage, listOfEdges);
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
function start(train, targetPackage, listOfEdges) {
    console.log("start");
    var _a = findLeftAndRightNodeEdges(train.startingNode, listOfEdges), trainLeftEdge = _a.left, trainRightEdge = _a.right;
    console.log(trainLeftEdge, trainRightEdge);
    var trainRoute = findLeftAndRightRouteToNode(trainLeftEdge, trainRightEdge, listOfEdges, targetPackage.startingNode);
    console.log("trainRoute", trainRoute);
    // route of package startingNode to package destinationNode
    var _b = findLeftAndRightNodeEdges(targetPackage.startingNode, listOfEdges), packageLeftEdge = _b.left, packageRightEdge = _b.right;
    var packageRoute = findLeftAndRightRouteToNode(packageLeftEdge, packageRightEdge, listOfEdges, targetPackage.destinationNode);
    console.log("packageRoute", packageRoute);
}
function findLeftAndRightNodeEdges(startingNode, listOfEdges) {
    var left = findEdgeOfNode(startingNode, listOfEdges, "left");
    var right = findEdgeOfNode(startingNode, listOfEdges, "right");
    return { left: left, right: right };
}
function findLeftAndRightRouteToNode(leftEdge, rightEdge, listOfEdges, targetNode) {
    var leftRoute = leftEdge
        ? findRouteToNode(leftEdge.edge, leftEdge.index, listOfEdges, targetNode, "left")
        : null;
    var rightRoute = rightEdge
        ? findRouteToNode(rightEdge.edge, rightEdge.index, listOfEdges, targetNode, "right")
        : null;
    return leftRoute !== null && leftRoute !== void 0 ? leftRoute : rightRoute;
}
// can incorporate binary search?
//             Starting Node
//       Left Edge      Right Edge
//    Left Edge             Right Edge
// Package                      No Package
function findEdgeOfNode(startingNode, listOfEdges, direction) {
    for (var i = 0; i < listOfEdges.length - 1; i++) {
        var edge = listOfEdges[i];
        if (direction === "left") {
            if (edge.node2.name === startingNode.name) {
                return { edge: edge, index: i };
            }
        }
        if (direction === "right") {
            if (edge.node1.name === startingNode.name) {
                return { edge: edge, index: i };
            }
        }
    }
    return null;
}
function findRouteToNode(startingEdge, startingEdgeIndex, listOfEdges, targetNode, direction) {
    if (!startingEdge) {
        console.log("end");
        return null;
    }
    console.log("going ", direction);
    // start from train startingNode to pickUpNodeLocation
    if ((direction === "left" && startingEdge.node1 === targetNode) ||
        (direction === "right" && startingEdge.node2 === targetNode)) {
        console.log("targetNode found");
        return [startingEdge];
    }
    // pre
    var nextEdgeIndex = direction === "left" ? startingEdgeIndex - 1 : startingEdgeIndex + 1;
    var nextEdge = listOfEdges[nextEdgeIndex];
    // recurse
    var found = findRouteToNode(nextEdge, nextEdgeIndex, listOfEdges, targetNode, direction);
    // post
    if (found) {
        found.push(startingEdge);
    }
    return found;
}
function findPackageIndexInNode(currentNode, listOfPackages) {
    for (var i = 0; i < listOfPackages.length; i++) {
        var currPackage = listOfPackages[i];
        if (currPackage.startingNode.name === currentNode.name) {
            return currPackage;
        }
    }
    return null;
}
function generateNodes(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var node = new Classes_1.Nodes("Station" + i);
        arr.push(node);
    }
    return arr;
}
function generateEdges(nodes) {
    var arr = [];
    // no edge for last node
    for (var i = 0; i < nodes.length; i++) {
        var name_1 = "E" + i;
        var edge = new Classes_1.Edge(name_1, nodes[i], nodes[i + 1], i);
        arr.push(edge);
    }
    return arr;
}
function travelEdge(startingNode, index, listOfEdges, listOfPackages) {
    // base case
    if (index >= listOfNodes.length) {
        console.log("end of node list");
        return;
    }
    console.log("travelling at index:", index);
    // pre
    var currPackage = findPackageIndexInNode(startingNode, listOfPackages);
    if (currPackage) {
        console.log("package found!", currPackage);
    }
    // recurse
    travelEdge(listOfEdges[index].node2, index + 1, listOfEdges, listOfPackages);
    // post
}
function generateTrains(n, nodes) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var train = new Classes_1.Train("Train" + 1, 50, nodes[i]);
        arr.push(train);
    }
    return arr;
}
function generatePackages(n, nodes) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var newPackage = new Classes_1.Package("Package" + i, 20, nodes[2], nodes[4]);
        arr.push(newPackage);
    }
    return arr;
}
var listOfNodes = generateNodes(10);
var listOfEdges = generateEdges(listOfNodes);
var listOfTrains = generateTrains(1, listOfNodes);
var listOfPackages = generatePackages(1, listOfNodes);
main(listOfNodes, listOfEdges, listOfTrains, listOfPackages);
