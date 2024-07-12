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

class Nodes {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Edge {
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

class Train {
  trainName: string;
  capacityInKg: number;
  startingNode: Nodes;

  constructor(trainName: string, capacityInKg: number, startingNode: Nodes) {
    this.trainName = trainName;
    this.capacityInKg = capacityInKg;
    this.startingNode = startingNode;
  }
}

class Package {
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

function main(
  listOfNodes: Nodes[],
  listofEdges: Edge[],
  listOfTrains: Train[],
  packages: Package[]
) {
  // train needs to know which direction to travel
  // train knows where it is, needs to know where is the closest package and if the package is within weight limit
  // first lets do the simple case
  // let train travel through the list of nodes in one direction
  // check if there are packages in the node,
  // if there is, check if it's within capacity, then deduct capacity
  // go to destination, determine which direction to travel at current node
}

function generateNodes(n: number): Nodes[] {
  const arr: Nodes[] = [];
  for (let i = 0; i < n; i++) {
    const node = new Nodes("Node" + n);
    arr.push(node);
  }

  return arr;
}

function generateEdges(nodes: Nodes[]) {
  const arr: Edge[] = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    const name = String.fromCharCode(i);
    const edge = new Edge(name, nodes[i], nodes[i + 1], i);
    arr.push(edge);
  }
  return arr;
}

function generateTrains(n: number, nodes: Nodes[]) {
  const arr: Train[] = [];

  for (let i = 0; i < n; i++) {
    const train = new Train("Train" + 1, 50, nodes[i]);
    arr.push(train);
  }

  return arr;
}

function generatePackages(n: number, nodes: Nodes[]): Package[] {
  const arr: Package[] = [];

  for (let i = 0; i < n; i++) {
    const package = new Package("Package" + i, 20, nodes[2], nodes[4]);
    arr.push(package);
  }

  return arr;
}

const listOfNodes = generateNodes(10);
const listOfEdges = generateEdges(listOfNodes);
const listOfTrains = generateTrains(1, listOfNodes);
const listOfPackages = generatePackages(1, listOfNodes);
main(listOfNodes, listOfEdges, listOfTrains, listOfPackages);
