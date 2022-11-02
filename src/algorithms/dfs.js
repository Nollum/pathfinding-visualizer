import { backtrace, getNeighbours} from "./misc"

function dfs(grid, startNode) {
    let stack = []
    let nodes = []
    let parent = {} 
    stack.push(startNode)
    nodes.push(startNode)
    startNode.visited = true
    while (stack.length) {
        let v = stack.pop()
        if (!v.visited) {
            v.visited = true
            nodes.push(v)
            if (v.type === 'end') return [nodes, backtrace(parent, startNode.id, v.id)]
        }
        let neighbours = getNeighbours(grid.length, grid[0].length, grid, v)
        for (let i = 0; i < neighbours.length; i++) {
            if (!neighbours[i].visited)  {
                stack.push(neighbours[i])
            }
            parent[neighbours[i].id] = v.id
        }
    }
    return [nodes, null]

}

export default dfs