import { Nodes, Edge, Train, Package } from "./Classes";

export function generateNodes(n: number): Nodes[] {
  const arr: Nodes[] = [];
  for (let i = 0; i < n; i++) {
    const node = new Nodes("Station" + i);
    arr.push(node);
  }

  return arr;
}

export function generateEdges(nodes: Nodes[]) {
  const arr: Edge[] = [];

  // no edge for last node
  for (let i = 0; i < nodes.length; i++) {
    const name = "E" + i;
    const edge = new Edge(name, nodes[i], nodes[i + 1], i);
    arr.push(edge);
  }
  return arr;
}

export function generateTrains(n: number, nodes: Nodes[]) {
  const arr: Train[] = [];

  for (let i = 0; i < n; i++) {
    const train = new Train("Train" + 1, 50, nodes[i]);
    arr.push(train);
  }

  return arr;
}

export function generatePackages(n: number, nodes: Nodes[]): Package[] {
  const arr: Package[] = [];

  for (let i = 0; i < n; i++) {
    const newPackage = new Package("Package" + i, 20, nodes[2], nodes[4]);
    arr.push(newPackage);
  }

  return arr;
}
