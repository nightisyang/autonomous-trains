"use strict";
exports.__esModule = true;
exports.generateLogs = exports.generatePackages = exports.generateTrains = exports.generateEdges = exports.generateNodes = void 0;
var Classes_1 = require("./Classes");
function generateNodes(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var node = new Classes_1.Nodes("Station" + i);
        arr.push(node);
    }
    return arr;
}
exports.generateNodes = generateNodes;
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
exports.generateEdges = generateEdges;
function generateTrains(n, nodes) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var train = new Classes_1.Train("Train" + 1, 50, nodes[i], []);
        arr.push(train);
    }
    return arr;
}
exports.generateTrains = generateTrains;
function generatePackages(n, nodes) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var newPackage = new Classes_1.Package("Package" + i, 20, nodes[2], nodes[4]);
        arr.push(newPackage);
    }
    return arr;
}
exports.generatePackages = generatePackages;
function generateLogs(route, train, targetPackage) {
    for (var i = 0; i < route.length; i++) {
        var currEdge = route[i];
        var W = currEdge.journeyTimeInMinutes;
        var T = train.trainName;
        var N1 = "";
        var N2 = "";
        var P1 = "";
        var P2 = "";
        var isLeftDir = currEdge.direction === "left";
        N1 = isLeftDir ? currEdge.node2.name : currEdge.node1.name;
        N2 = isLeftDir ? currEdge.node1.name : currEdge.node2.name;
        if (targetPackage.startingNode.name === N1) {
            P1 = targetPackage.packageName;
        }
        if (targetPackage.destinationNode.name === N2) {
            P2 = targetPackage.packageName;
        }
        console.log("W=".concat(W, ", T=").concat(T, ", N1=").concat(N1, ", P1=[").concat(P1 !== null && P1 !== void 0 ? P1 : "  ", "], N2=").concat(N2, ", P2=[").concat(P2 !== null && P2 !== void 0 ? P2 : "  ", "]"));
    }
}
exports.generateLogs = generateLogs;
