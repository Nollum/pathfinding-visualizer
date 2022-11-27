import { backtrace, getNeighbours } from "./misc"

function heuristic(start, end) {
    let d1 = Math.abs(end.id[0] - start.id[0])
    let d2 = Math.abs(end.id[1] - start.id[1])
    return d1 + d2
}

function astar(grid, startNode, endNode) {
    let nodes = []
    let openList   = []
    let closedList = []
    let parent = {} 
    grid[startNode.id[0]][startNode.id[1]].distance = 0
    openList.push(grid[startNode.id[0]][startNode.id[1]])
 
    while(openList.length) {
        let lowestIndex = 0 
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[lowestIndex].f) {
                lowestIndex = i
            }
        }

        let currentNode = openList[lowestIndex]

        if (currentNode.type === 'end') {
            return [nodes, backtrace(parent, startNode.id, endNode.id)]
        } 

        openList.splice(lowestIndex, 1)
        closedList.push(currentNode)
        nodes.push(currentNode)

        let neighbours = getNeighbours(grid.length, grid[0].length, grid, currentNode)

        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i]

            if (!closedList.includes(neighbour)) {
                let possibleG = currentNode.g + 1
                if (!openList.includes(neighbour)) {
                    openList.push(neighbour)
                } else if (possibleG >= neighbour.g) {
                    continue
                }
                neighbour.g = possibleG
                neighbour.h = heuristic(neighbour, endNode)
                neighbour.f = neighbour.g + neighbour.h
                parent[neighbour.id] = currentNode.id
            }
        }
    } 
    return [nodes, null]
}

export default astar