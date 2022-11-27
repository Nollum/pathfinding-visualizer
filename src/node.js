function Node(id, seqNum, type, visited) {
    this.id = id
    this.seqNum = seqNum
    this.type = type
    this.weight = 1 
    this.distance = Infinity 
    this.visited = visited
    this.g = 0
    this.h = 0
    this.f = 0
}

export default Node