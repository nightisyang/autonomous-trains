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
  direction?: "left" | "right";

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
  loadedPackages: Package[];

  constructor(
    trainName: string,
    capacityInKg: number,
    startingNode: Nodes,
    loadedPackages: Package[]
  ) {
    this.trainName = trainName;
    this.capacityInKg = capacityInKg;
    this.startingNode = startingNode;
    this.loadedPackages = loadedPackages;
  }

  loadPackage(onePackage: Package) {
    if (onePackage.weightInKg <= this.capacityInKg) {
      this.loadedPackages.push(onePackage);
      this.capacityInKg = this.capacityInKg - onePackage.weightInKg;
    }
  }

  unLoadPackages(node: Nodes) {
    for (let i = this.loadedPackages.length - 1; i > 0; i--) {
      const onePackage = this.loadedPackages[i];
      if (node.name === onePackage.destinationNode.name) {
        const removedPackage: Package[] = this.loadedPackages.splice(i, 1);
        this.capacityInKg = this.capacityInKg + removedPackage[0].weightInKg;
        this.startingNode = removedPackage[0].destinationNode;
      }
    }
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
