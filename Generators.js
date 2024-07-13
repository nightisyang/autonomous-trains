"use strict";
exports.__esModule = true;
exports.generatePackages = exports.generateTrains = exports.generateEdges = exports.generateNodes = void 0;
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
        var train = new Classes_1.Train("Train" + 1, 50, nodes[i]);
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
