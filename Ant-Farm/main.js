$(document).ready(function() {
    var num = 20;
    var pop = 1;
    //var pop = Math.ceil(num / 3);
    var food = Math.ceil(num / 3);

    var coordinates = [];
    var ants = [];

    function setGrid(num) {
        var grid = `<table>`;
        for (var i = 0; i < num; i++) {
            grid += `<tr class='row' id=r${i}>`;
            coordinates.push([]);

            for (var j = 0; j < num; j++) {
                grid += `<td class='square' id=${i}-${j}></td>`;
                coordinates[i].push([i, j]);
            }
            grid += `</tr>`;
        }
        grid += `</table>`
        $('#grid').html(grid);
    }

    function initFood(grid) {
        for (var i = 0; i < food; i++) {
            var r = Math.floor((Math.random()) * num);
            var s = Math.floor((Math.random()) * num);
            var position = [r, s];
            $(`#${r}-${s}`).addClass('food');
            console.log("Food position: ", position)
        }
    }

    var Nest = function(grid) {
        this.position = initNest(grid);
        this.knownFoodLocations = [];
        this.foodStore = 0;
        console.log("Nest position: ", this.position);
    }

    function initNest(grid) {
        var r = Math.round((Math.random()) * num);
        var s = Math.round((Math.random()) * num);
        var position = [r, s];
        $(`#${r}-${s}`).addClass('nest');
        return position;
    }

    var Ant = function(position) {
        this.name = "";
        this.position = position;
        this.knowsWhereFoodIs = false;
        this.hasFood = false;
        this.goingHome = false;
        this.distanceFromHome = [0, 0];
        this.moves = [
            [1, 1],
            [1, 0],
            [0, 1],
            [1, -1],
            [-1, 0],
            [0, -1],
            [0, 0]
        ];
    }

    function initAnt(grid, nest) {
        var position = nest.position;
        for (var i = 0; i < pop; i++) {
            ants[i] = new Ant(position)
            ants[i].name = `Ant ${i}`;
            console.log(ants[i].name);
        }
    }

    function moveAnts(grid) {
        ants.forEach(function(ant) {

            if(ant.goingHome) {
                goHome(ant, antNest);
            } else {
            var x = ant.position[0],
                y = ant.position[1],
                a = ant.distanceFromHome[0],
                b = ant.distanceFromHome[1];

            $(`#${x}-${y}`).removeClass('ant').addClass('pheromone');
            var r = Math.floor(Math.random() * 6);
            var move = ant.moves[r];
            console.log("move: ", move);
            x += move[0];
            y += move[1];

            if (x < 0) { x = 0;
                move[0] = 0; }
            if (x >= num) { x = num - 1;
                move[0] = 0; }
            if (y < 0) { y = 0;
                move[0] = 0; }
            if (y >= num) { y = num - 1;
                move[1] = 0; }

            a += move[0];
            b += move[1];

            ant.position = [x, y];
            ant.distanceFromHome = [a, b];

            $(`#${x}-${y}`).addClass('ant');

            if ($(`#${x}-${y}`).hasClass('food')) {
                console.log(`${ant.name} has found FOOD at ${ant.position}!`);
                ant.knowsWhereFoodIs = ant.position;
                ant.goingHome = true;
                ant.hasFood = true;
            }
            if ($(`#${x}-${y}`).hasClass('nest')) {
                console.log(`${ant.name} has come home to ${ant.position}.`);
            }
            }
        });

        function goHome(ant, nest) {
            var home = nest.position;
            var x = home[0] - ant.position[0], y = home[1] - ant.position[1];
            console.log(home.toString(), ant.position.toString(), x, y);

        }
    }

    function updatePheromone() {

    }



    var grid = setGrid(num);

    var squares = $('.square');

    initFood(grid);
    var antNest = new Nest(grid);
    initAnt(grid, antNest);


    $("#move").click(function() {
        moveAnts(grid);
    });

});



/*  
procedure ACO_MetaHeuristic
    while(not_termination)
       generateSolutions()
       daemonActions()
       pheromoneUpdate()
    end while
  end procedure
*/