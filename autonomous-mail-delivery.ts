import { Nodes, Train, Edge, Package } from "./Classes";
import { IEdgeAndEdgeIndex } from "./Types";
import {
  generateEdges,
  generateNodes,
  generatePackages,
  generateTrains,
} from "./Generators";

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

function main(
  listOfEdges: Edge[],
  listOfTrains: Train[],
  listOfPackages: Package[]
) {
  // for now, assign 1 train to 1 package
  const train = listOfTrains[0];
  const targetPackage = listOfPackages[0];

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

function start(train: Train, targetPackage: Package, listOfEdges: Edge[]) {
  console.log("start");

  // TRAIN START -> PACKAGE START
  const { leftEdge: trainLeftEdge, rightEdge: trainRightEdge } =
    findLeftAndRightNodeEdges(train.startingNode, listOfEdges);
  const trainRoute = findLeftAndRightRouteToNode(
    trainLeftEdge,
    trainRightEdge,
    listOfEdges,
    targetPackage.startingNode
  ) as Edge[];

  // PACKAGE START -> PACKAGE END
  const { leftEdge: packageLeftEdge, rightEdge: packageRightEdge } =
    findLeftAndRightNodeEdges(targetPackage.startingNode, listOfEdges);

  const packageRoute = findLeftAndRightRouteToNode(
    packageLeftEdge,
    packageRightEdge,
    listOfEdges,
    targetPackage.destinationNode
  ) as Edge[];

  const completeRoute = [...packageRoute, ...trainRoute];
  console.log(completeRoute);
}

function findLeftAndRightNodeEdges(
  startingNode: Nodes,
  listOfEdges: Edge[]
): {
  leftEdge: IEdgeAndEdgeIndex | null;
  rightEdge: IEdgeAndEdgeIndex | null;
} {
  const leftEdge = findEdgeOfNode(startingNode, listOfEdges, "left");
  const rightEdge = findEdgeOfNode(startingNode, listOfEdges, "right");

  return { leftEdge: leftEdge, rightEdge: rightEdge };
}

function findEdgeOfNode(
  startingNode: Nodes,
  listOfEdges: Edge[],
  direction: "left" | "right"
): IEdgeAndEdgeIndex | null {
  for (let i = 0; i < listOfEdges.length - 1; i++) {
    const edge = listOfEdges[i];
    // edge --  < node > -- edge
    // if finding the left edge, then it's on the edge's right i.e. node2 vice versa

    if (direction === "left") {
      if (edge.node2.name === startingNode.name) {
        return { edge, index: i };
      }
    }

    if (direction === "right") {
      if (edge.node1.name === startingNode.name) {
        return { edge, index: i };
      }
    }
  }
  return null;
}

function findLeftAndRightRouteToNode(
  leftEdge: IEdgeAndEdgeIndex | null,
  rightEdge: IEdgeAndEdgeIndex | null,
  listOfEdges: Edge[],
  targetNode: Nodes
): Edge[] | null {
  const leftRoute = leftEdge
    ? findRouteToNode(
        leftEdge.edge,
        leftEdge.index,
        listOfEdges,
        targetNode,
        "left"
      )
    : null;
  const rightRoute = rightEdge
    ? findRouteToNode(
        rightEdge.edge,
        rightEdge.index,
        listOfEdges,
        targetNode,
        "right"
      )
    : null;

  return leftRoute ?? rightRoute;
}

// recursion to find a target node, given a direction and the starting edge to travel from
function findRouteToNode(
  startingEdge: Edge | null,
  startingEdgeIndex: number,
  listOfEdges: Edge[],
  targetNode: Nodes,
  direction: "left" | "right"
): Edge[] | null {
  if (!startingEdge) {
    console.log("end");
    return null;
  }

  if (startingEdge.node1 === targetNode || startingEdge.node2 === targetNode) {
    return [startingEdge];
  }

  // pre
  const nextEdgeIndex =
    direction === "left" ? startingEdgeIndex - 1 : startingEdgeIndex + 1;
  const nextEdge = listOfEdges[nextEdgeIndex];

  // recurse
  const found = findRouteToNode(
    nextEdge,
    nextEdgeIndex,
    listOfEdges,
    targetNode,
    direction
  );

  // post
  if (found) {
    found.push(startingEdge);
  }

  return found;
}

const listOfNodes = generateNodes(10);
const listOfEdges = generateEdges(listOfNodes);
const listOfTrains = generateTrains(1, listOfNodes);
// const listOfPackages = generatePackages(1, listOfNodes);

const listOfPackages = [
  new Package("Special Delivery", 10, listOfNodes[9], listOfNodes[5]),
];

main(listOfEdges, listOfTrains, listOfPackages);
