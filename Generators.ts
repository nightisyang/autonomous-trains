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
    const train = new Train("Train" + 1, 50, nodes[i], []);
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

export function generateLogs(
  route: Edge[],
  train: Train,
  targetPackage: Package
) {
  let cummulativeTime = 0;
  for (let i = 0; i < route.length; i++) {
    const currEdge = route[i];
    const T = train.trainName;
    let N1 = "";
    let N2 = "";
    let P1 = "";
    let P2 = "";

    const isLeftDir = currEdge.direction === "left";
    N1 = isLeftDir ? currEdge.node2.name : currEdge.node1.name;
    N2 = isLeftDir ? currEdge.node1.name : currEdge.node2.name;

    if (targetPackage.startingNode.name === N1) {
      P1 = targetPackage.packageName;
    }

    if (targetPackage.destinationNode.name === N2) {
      P2 = targetPackage.packageName;
    }

    console.log(
      `W=${cummulativeTime}, T=${T}, N1=${N1}, P1=[${
        P1 ?? "  "
      }], N2=${N2}, P2=[${P2 ?? "  "}]`
    );

    cummulativeTime += currEdge.journeyTimeInMinutes;
  }

  console.log(`Takes ${cummulativeTime} minutes in total.`);
}
