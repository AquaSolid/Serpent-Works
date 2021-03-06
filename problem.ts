enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
}

class Problem {

    /**
     * |---------------> Y
     * |               Y
     * |  axises
     * |
     * v X
     * X
     *
     * */

    /**
     * The State is the locations of:
     * ai_player, food, obstacles(other players)
     * */

    state: any;
    goal: Point;
    grid: Array<Point>;

    vSize: number;
    hSize: number;

    constructor(player: Point, direction: Direction, food: Array<Point>, obstacles: Array<Point>,
                vSize: number, hSize: number) {
        this.state = [player, food, obstacles, direction];

        this.vSize = vSize;
        this.hSize = hSize;

        this.grid = [];

        for (let i = 0; i < vSize; i++) {
            for (let j = 0; j < hSize; j++) {
                this.grid.push(new Point(i, j));
            }
        }
        // console.log("Grid: ", this.grid);


        //this.goal = food[0];
        let min = Number.MAX_VALUE;
        for (let item of food) {
            if (Problem.contains(item, this.grid)) {
                let current = Problem.manhattan_distance(player, item);
                if (current < min) {
                    min = current;
                    this.goal = item;
                }
            }
        }

        // let smallest = food
        //     .map((item) => [item, Problem.manhattan_distance(player, item)])
        //     .reduce((a, b) => a[1] < b[1] ? a : b)[0];
        // this.goal = new Point(smallest.x, smallest.y);

        // console.log("Goal: ", this.goal.toString());
    }

    goal_test(state): boolean {
        //console.log("goal_test state:", state);
        let player: Point = state[0];
        return player.equals(this.goal);
    }

    successor(state: any) {
        let successors = {};
        let player: Point = state[0];
        let food: Array<Point> = state[1];
        let obstacles: Array<Point> = state[2];
        let direction: Direction = state[3];

        let modified_player: Point = null;
        let modified_obstacles: Array<Point> = [];
        modified_obstacles.push.apply(modified_obstacles, obstacles);

        let previous_move: Point = this.getPreviousMove(player, direction);
        // console.log("previous_move", previous_move);
        // modified_obstacles.push(previous_move);
        // modified_obstacles.push.apply(modified_obstacles, [previous_move]);
        // console.log("modified_obstacles", modified_obstacles);


        // console.log("Player in grid: ", this.grid.indexOf(player) >= 0);
        // console.log("Player contained in grid: ", Problem.contains(player, this.grid));

        // if player is in grid
        if (Problem.contains(player, this.grid)) {
            // UP
            modified_player = new Point(player.x - 1, player.y);
            if (modified_player.x >= 0 &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                let new_state = [modified_player, food, obstacles, Direction.Up];
                successors["UP"] = new_state;
            }
            // DOWN
            modified_player = new Point(player.x + 1, player.y);
            if (modified_player.x <= this.vSize &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                let new_state = [modified_player, food, obstacles, Direction.Down];
                successors["DOWN"] = new_state;
            }
            // LEFT
            modified_player = new Point(player.x, player.y - 1);
            if (modified_player.y >= 0 &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                let new_state = [modified_player, food, obstacles, Direction.Left];
                successors["LEFT"] = new_state;
            }
            // RIGHT
            modified_player = new Point(player.x, player.y + 1);
            if (modified_player.y <= this.hSize &&
                !(Problem.contains(modified_player, modified_obstacles))) {
                let new_state = [modified_player, food, obstacles, Direction.Right];
                successors["RIGHT"] = new_state;
            }
        }

        // console.log("successors", successors);
        return successors;
    }

    heuristic(node: ProblemNode) {
        let player: Point = node.state[0]
        return Problem.manhattan_distance(player, this.goal);
    }

    static manhattan_distance(start: Point, end: Point) {
        return Math.abs(end.x - start.x) + Math.abs(end.y - start.y);
    }

    result(state: any, action: any) {
        let possible = this.successor(state);
        // console.log("successor state result", possible, possible[action]);
        return possible[action];
    }

    path_cost(path_cost: number, state: any, action: any, next: any) {
        return path_cost + 1;
    }

    actions(state: any) {
        // let keys = [];
        // for (let key of this.successor(state)) {
        //     keys.push(key);
        // }
        return Object.keys(this.successor(state));
    }

    getPreviousMove(player: Point, direction: Direction): Point {
        switch (direction) {
            // This returns the opposite
            // If you're going up, you'll get the down position
            case Direction.Up: {
                return new Point(player.x + 1, player.y);
            }
            case Direction.Down: {
                return new Point(player.x - 1, player.y);
            }
            case Direction.Left: {
                return new Point(player.x, player.y + 1);
            }
            case Direction.Right: {
                return new Point(player.x, player.y - 1);
            }
            default: {
                break;
            }
        }

        return player;
    }

    static contains(object: Point, list: Array<Point>): boolean {
        //console.log("Problem.contains:", object, list);
        for (let item of list) {
            if (object.equals(item)) {
                return true;
            }
        }
        return false;
    }

    static contains_node(object: ProblemNode, list: Array<ProblemNode>): boolean {

        for (let item of list) {
            if (object.equals(item)) {
                // console.log("Problem.contains:", object, item);
                return true;
            }
        }
        return false;
    }

    static contains_node_state(state: any, states: Array<any>): boolean {
        //console.log("Problem.contains:", object, list);
        for (let item of states) {
            if (Point.equalsTwo(state[0], item[0])) {
                return true;
            }
        }
        return false;
    }

}