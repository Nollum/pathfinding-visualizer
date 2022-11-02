import { backtrace, getNeighbours } from "./misc";

function nearestNode(unexploredNodes) {
    let currentNearest, index
    for (let i = 0; i < unexploredNodes.length; i++) {
        if (!currentNearest || currentNearest.distance > unexploredNodes[i].distance) {
            currentNearest = unexploredNodes[i]
            index = i
        }
    }
    unexploredNodes.splice(index, 1)
    return currentNearest
}

function dijkstra(grid, startNode) {
    let nodes = []
    let parent = {}

    grid[startNode.id[0]][startNode.id[1]].distance = 0

    let unexploredNodes = grid.flat()

    while (unexploredNodes.length) {
        let currentNode = nearestNode(unexploredNodes)
        if (currentNode.distance === Infinity) {
            return [nodes, null]
        }
        nodes.push(currentNode)
        
        if (currentNode.type === 'end') {
            return [nodes, backtrace(parent, startNode.id, currentNode.id)]
        } 

        let neighbours = getNeighbours(grid.length, grid[0].length, grid, currentNode)

        for (let i = 0; i < neighbours.length; i++) {
            let newDist = currentNode.distance + currentNode.weight
            if (newDist < neighbours[i].distance) {
                neighbours[i].distance = newDist
                parent[neighbours[i].id] = currentNode.id
            } 
        }
    }

}

export default dijkstra