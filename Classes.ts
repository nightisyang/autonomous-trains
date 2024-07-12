export class Nodes {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
export class Edge {
  name: string;
  node1: Nodes;
  node2: Nodes;
  journeyTimeInMinutes: number;

  constructor(
    name: string,
    node1: Nodes,
    node2: Nodes,
    journeyTimeInMinutes: number
  ) {
    this.name = name;
    this.node1 = node1;
    this.node2 = node2;
    this.journeyTimeInMinutes = journeyTimeInMinutes;
  }
}

export class Train {
  trainName: string;
  capacityInKg: number;
  startingNode: Nodes;

  constructor(trainName: string, capacityInKg: number, startingNode: Nodes) {
    this.trainName = trainName;
    this.capacityInKg = capacityInKg;
    this.startingNode = startingNode;
  }
}

export class Package {
  packageName: string;
  weightInKg: number;
  startingNode: Nodes;
  destinationNode: Nodes;

  constructor(
    packageName: string,
    weightInKg: number,
    startingNode: Nodes,
    destinationNode: Nodes
  ) {
    this.packageName = packageName;
    this.weightInKg = weightInKg;
    this.startingNode = startingNode;
    this.destinationNode = destinationNode;
  }
}
