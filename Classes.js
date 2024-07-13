"use strict";
exports.__esModule = true;
exports.Package = exports.Train = exports.Edge = exports.Nodes = void 0;
var Nodes = /** @class */ (function () {
    function Nodes(name) {
        this.name = name;
    }
    return Nodes;
}());
exports.Nodes = Nodes;
var Edge = /** @class */ (function () {
    function Edge(name, node1, node2, journeyTimeInMinutes) {
        this.name = name;
        this.node1 = node1;
        this.node2 = node2;
        this.journeyTimeInMinutes = journeyTimeInMinutes;
    }
    return Edge;
}());
exports.Edge = Edge;
var Train = /** @class */ (function () {
    function Train(trainName, capacityInKg, startingNode, loadedPackages) {
        this.trainName = trainName;
        this.capacityInKg = capacityInKg;
        this.startingNode = startingNode;
        this.loadedPackages = loadedPackages;
    }
    Train.prototype.loadPackage = function (onePackage) {
        if (onePackage.weightInKg <= this.capacityInKg) {
            this.loadedPackages.push(onePackage);
            this.capacityInKg = this.capacityInKg - onePackage.weightInKg;
        }
    };
    Train.prototype.unLoadPackages = function (node) {
        for (var i = this.loadedPackages.length - 1; i > 0; i--) {
            var onePackage = this.loadedPackages[i];
            if (node.name === onePackage.destinationNode.name) {
                var removedPackage = this.loadedPackages.splice(i, 1);
                this.capacityInKg = this.capacityInKg + removedPackage[0].weightInKg;
                this.startingNode = removedPackage[0].destinationNode;
            }
        }
    };
    return Train;
}());
exports.Train = Train;
var Package = /** @class */ (function () {
    function Package(packageName, weightInKg, startingNode, destinationNode) {
        this.packageName = packageName;
        this.weightInKg = weightInKg;
        this.startingNode = startingNode;
        this.destinationNode = destinationNode;
    }
    return Package;
}());
exports.Package = Package;
