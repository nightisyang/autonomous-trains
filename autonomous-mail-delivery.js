"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Classes_1 = require("./Classes");
var Generators_1 = require("./Generators");
//
// <node> -- undirected edge, cost to travel in minutes -- <node>
// trains travel network, has weight capacity, can travel in either direction, no limit train per edge/node --> concurrency?
// packages, has weight, has a source location and end destination
//
// is the list of nodes circular? i.e. first node and last node linked?
// likely not if the given example has 3 nodes, 2 edge
// train needs to know which direction to travel -- DONE HANDLED THIS CASE
// let train travel through the list of nodes in one direction -- SAME AS ABOVE HANDLED
// go to destination, determine which direction to travel at current node -- SAME AS ABOVE HANDLED
// TODO:
// train knows where it is, needs to know where is the closest package and if the package is within weight limit -- Probably needs a function that handles this, see's what packages / trains are available, if the capacity is within limits, calculates who has the shortest cost to get there and assigns to the train
// check if it's within capacity, then deduct capacity
function main(listOfEdges, listOfTrains, listOfPackages) {
    // for now, assign 1 train to 1 package
    var train = listOfTrains[0];
    var targetPackage = listOfPackages[0];
    start(train, targetPackage, listOfEdges);
}
//    can incorporate binary search?
//               Starting Node
//         Left Edge      Right Edge
//      Left Edge             Right Edge
// Package Start/End             No Package
//
// need to know which direction to travel, left or right, keep going left or keep going right until target node is found
// get the left and right edge for a node and travel down the edge to the next node until target node
// obtain the route from TRAIN START -> PACKAGE START
// obtain the route from PACKAGE START -> PACKAGE END
// combine both routes
function start(train, targetPackage, listOfEdges) {
    console.log("start");
    // TRAIN START -> PACKAGE START
    var _a = findLeftAndRightNodeEdges(train.startingNode, listOfEdges), trainLeftEdge = _a.leftEdge, trainRightEdge = _a.rightEdge;
    var trainRoute = findLeftAndRightRouteToNode(trainLeftEdge, trainRightEdge, listOfEdges, targetPackage.startingNode);
    // PACKAGE START -> PACKAGE END
    var _b = findLeftAndRightNodeEdges(targetPackage.startingNode, listOfEdges), packageLeftEdge = _b.leftEdge, packageRightEdge = _b.rightEdge;
    var packageRoute = findLeftAndRightRouteToNode(packageLeftEdge, packageRightEdge, listOfEdges, targetPackage.destinationNode);
    var completeRoute = __spreadArray(__spreadArray([], packageRoute, true), trainRoute, true);
    console.log(completeRoute);
}
function findLeftAndRightNodeEdges(startingNode, listOfEdges) {
    var leftEdge = findEdgeOfNode(startingNode, listOfEdges, "left");
    var rightEdge = findEdgeOfNode(startingNode, listOfEdges, "right");
    return { leftEdge: leftEdge, rightEdge: rightEdge };
}
function findEdgeOfNode(startingNode, listOfEdges, direction) {
    for (var i = 0; i < listOfEdges.length - 1; i++) {
        var edge = listOfEdges[i];
        // edge --  < node > -- edge
        // if finding the left edge, then it's on the edge's right i.e. node2 vice versa
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
function findLeftAndRightRouteToNode(leftEdge, rightEdge, listOfEdges, targetNode) {
    var leftRoute = leftEdge
        ? findRouteToNode(leftEdge.edge, leftEdge.index, listOfEdges, targetNode, "left")
        : null;
    var rightRoute = rightEdge
        ? findRouteToNode(rightEdge.edge, rightEdge.index, listOfEdges, targetNode, "right")
        : null;
    return leftRoute !== null && leftRoute !== void 0 ? leftRoute : rightRoute;
}
// recursion to find a target node, given a direction and the starting edge to travel from
function findRouteToNode(startingEdge, startingEdgeIndex, listOfEdges, targetNode, direction) {
    if (!startingEdge) {
        console.log("end");
        return null;
    }
    if (startingEdge.node1 === targetNode || startingEdge.node2 === targetNode) {
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
var listOfNodes = (0, Generators_1.generateNodes)(10);
var listOfEdges = (0, Generators_1.generateEdges)(listOfNodes);
var listOfTrains = (0, Generators_1.generateTrains)(1, listOfNodes);
// const listOfPackages = generatePackages(1, listOfNodes);
var listOfPackages = [
    new Classes_1.Package("Special Delivery", 10, listOfNodes[9], listOfNodes[5]),
];
main(listOfEdges, listOfTrains, listOfPackages);
