var Test = /** @class */ (function () {
    function Test(x, y) {
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this.game = new Game();
    }
    Test.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    Test.prototype.main = function () {
        var traversal = new Traversal();
        // let player: Point = new Point(0, 0);
        // let food: Array<Point> = [new Point(3, 2), new Point(3, 3)];
        // let obstacles: Array<Point> = [new Point(0, 1), new Point(2, 0), new Point(2, 2)];
        // let problem: Problem = new Problem(player, food, obstacles, 4, 3);
        // let answer = traversal.astar_graph_search(problem);
        // console.log(answer);
        // console.log(answer.solution());
        // console.log(answer.solve());
        // let player: Point = new Point(2, 2);
        // let food: Array<Point> = [new Point(1, 0)];
        // let obstacles: Array<Point> = [new Point(1, 2), new Point(2, 3), new Point(3, 1)];
        // let problem: Problem = new Problem(player, Direction.Right, food, obstacles, 4, 5);
        // let answer = traversal.astar_graph_search(problem);
        // console.log(answer);
        // console.log(answer.solution());
        // console.log(answer.solve());
        // let player: Point = new Point(2, 2);
        // let food: Array<Point> = [new Point(1, 0)];
        // let obstacles: Array<Point> = [new Point(1, 2), new Point(2, 3), new Point(3, 1)];
        // let problem: Problem = new Problem(player, Direction.Right, food, obstacles, 4, 5);
        // let answer = traversal.astar_graph_search(problem);
        // console.log(answer);
        // console.log(answer.solution());
        // console.log(answer.solve());
        var graph = new Graph([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]);
        var start = graph.grid[0][0];
        var end = graph.grid[1][1];
        var result = astar.search(graph, start, end);
        console.log(result);
        var grid = [];
        for (var i = 0; i < 4; i++) {
            var row = [];
            for (var j = 0; j < 3; j++) {
                var current_point = new Point(i, j);
                // you may move here with a weight of 1
                row.push(1);
            }
            grid.push(row);
        }
        console.log(grid);
    };
    return Test;
}());
//# sourceMappingURL=test.js.map