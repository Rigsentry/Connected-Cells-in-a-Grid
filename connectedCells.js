var connectedCells = function(n,m, grid) {
    let result = 0;
    const visited = new Array(n).fill(false).map(()=> new Array(m).fill(false));
    for (let row = 0; row<n; row++) {
        for (let col = 0; col<m; col++) {
            const currVal = grid[row][col];
            if(currVal===1 && !visited[row][col]) {
                let number = 1;
                let size = explore(row, col, n, m, visited, grid);
                // console.log(size);
                if(size!=0) number = size;
                result = Math.max(result, number);
            }
        }
    }
    return result;
}

var explore = function (row, col, n, m, visited, grid) {
    const queue = [[row, col]];
    let size = 0;
    /**
     * (x,y) => (x+1,y), (x-1,y) (x,y+1), (x,y-1), (x-1, y-1), (x+1, y+1), (x-1, y+1), (x+1, y-1)
     */
    const directions = [[1,0],[-1,0],[0,1],[0,-1], [-1,-1], [1,1],[-1,1],[1,-1]];
    while(queue.length>0) {
        const currPos = queue.shift();
        for (const direction of directions) {
            const newRowPos = currPos[0] + direction[1];
            const newColPos = currPos[1] + direction[0];
            if(isValidMove(newRowPos, newColPos, n,m, visited, grid)) {
                queue.push([newRowPos,newColPos]);
                visited[newRowPos][newColPos] = true;
                size++;
            } 
        }
    }
    return size;
}

var isValidMove = function(row, col, n, m, visited, grid) {
    if(row<0 || row>=n || col <0 || col >= m || visited[row][col] || grid[row][col]!==1) return false;
    return true;
} 





n = 8;
m = 9;
grid = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0]];
grid2 = 
[[0, 1, 0, 0, 0, 0, 1, 1, 0], 
[1, 1, 0, 0, 1, 0, 0, 0, 1], 
[0, 0, 0, 0, 1, 0, 1, 0, 0], 
[0, 1, 1, 1, 0, 1, 0, 1, 1],
[0, 1, 1, 1, 0, 0, 1, 1, 0],
[0, 1, 0, 1, 1, 0, 1, 1, 0],
[0, 1, 0, 0, 1, 1, 0, 1, 1],
[1, 0, 1, 1, 1, 1, 0, 0, 0]]
const result = connectedCells(n,m,grid2);
console.log(result);