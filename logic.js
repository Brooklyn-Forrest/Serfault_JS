// 9 x 9
// "x, y", occupied
spaces = [[[0, 0], 0], [[0, 1], 0], [[0, 2], 0], [[0, 3], 0], [[0, 4], 0], [[0, 5], 0], [[0, 6], 0], [[0, 7], 0], [[0, 8], 0],
          [[1, 0], 0], [[1, 1], 0], [[1, 2], 0], [[1, 3], 0], [[1, 4], 0], [[1, 5], 0], [[1, 6], 0], [[1, 7], 0], [[1, 8], 0],
          [[2, 0], 0], [[2, 1], 0], [[2, 2], 0], [[2, 3], 0], [[2, 4], 0], [[2, 5], 0], [[2, 6], 0], [[2, 7], 0], [[2, 8], 0],
          [[3, 0], 0], [[3, 1], 0], [[3, 2], 0], [[3, 3], 0], [[3, 4], 0], [[3, 5], 0], [[3, 6], 0], [[3, 7], 0], [[3, 8], 0],
          [[4, 0], 0], [[4, 1], 0], [[4, 2], 0], [[4, 3], 0], [[4, 4], 0], [[4, 5], 0], [[4, 6], 0], [[4, 7], 0], [[4, 8], 0],
          [[5, 0], 0], [[5, 1], 0], [[5, 2], 0], [[5, 3], 0], [[5, 4], 0], [[5, 5], 0], [[5, 6], 0], [[5, 7], 0], [[5, 8], 0],
          [[6, 0], 0], [[6, 1], 0], [[6, 2], 0], [[6, 3], 0], [[6, 4], 0], [[6, 5], 0], [[6, 6], 0], [[6, 7], 0], [[6, 8], 0],
          [[7, 0], 0], [[7, 1], 0], [[7, 2], 0], [[7, 3], 0], [[7, 4], 0], [[7, 5], 0], [[7, 6], 0], [[7, 7], 0], [[7, 8], 0],
          [[8, 0], 0], [[8, 1], 0], [[8, 2], 0], [[8, 3], 0], [[8, 4], 0], [[8, 5], 0], [[8, 6], 0], [[8, 7], 0], [[8, 8], 0]
    ];


class Piece {

    init(attack_dir, attack_dist, start_pos, movement_dist, dist_increment) {
        // This string var is a way to identify which
        // directions relative to the piece it can attack.
        this.attack_dir = attack_dir;
        // Pieces have a mandatory attack distance.
        this.attack_dist = attack_dist;
        // there can be up to two instances of a piece on the board. If these values
        // are negative ones, it will be ignored when setting up the board.
        this.start_pos = start_pos;
        // Max distance a piece can move
        this.movement_dist = movement_dist;
        // Some pieces must move the whole distance
        this.dist_increment = dist_increment;
        this.current_pos = this.start_pos;
        // set starting space as being occupied with piece
        spaces[start_pos[0] * 8 + start_pos[1]][1] = this;
    }
}


class Far extends Piece{
    // These are versatile movement pieces that cannot attack unless attack distance is 2.
    constructor(start_pos){
        super().init("Bent", 2, start_pos, 2, -1)
    }
}

class Rider extends Piece {
    // These pieces can move in any direction up to two spaces. When attacking, the attack distance
    // must be 2 (pierce).
    constructor(start_pos) {
        super().init("Uni", 2, start_pos, 2, -1)
    }
}

class Barricade extends Piece{
    // These pieces must be attached by two pieces during the same turn to be destroyed.
    // It can only be moved one space at a time in cardinal directions and cannot attack.
    constructor(start_pos) {
        super().init("Cardinal", 0, start_pos, 1, -1)
    }
}

class FootSoldier extends Piece{
    // The footsoldier is a simple, short movement piece that can attack at 1 distance.
    constructor(start_pos) {
        super().init("Bent", 1, start_pos, 1, -1)
    }
}

class Ninja extends Piece{
    // The ninja can bypass barricade (but cannot attack it). It can attack at 2 or less distance.
    // Normal movement is one tile at a time.
    constructor(start_pos) {
        super().init("Uni", -2, start_pos, 1, -1)
    }
}

class Spinner extends Piece{
    // The spinner can be spun in any direction and can charge direction types only when hitting a boundary.
    // It can attack at 3 or less distance, but any further and it simply gets stopped by anything else
    // that was 4 or more distance away.
    constructor(start_pos) {
        super().init("Bent-Edge", -3, start_pos, 5, 5)
    }
}

class Wraith extends Piece{
    // Your pieces can go through a wraith. Opponents cannot pass through a wraith and "stop short".
    // If a piece is stopped short because of wraith, wraith cannot attack the next turn.
    constructor (start_pos) {
        super().init("Uni", -2, start_pos, 2, 1)
    }
}


class Brave extends Piece{
    // The brave must attack from three distance and has
    // the ability martyr. Martyr is triggered when the brave is killed.
    // Martyr: If the divinity is still alive, it transforms into a spinner.
    // A wraith is created where the brave died.
   constructor(start_pos) {
       super().init("Uni", 3, start_pos, 3, -1)
   }
}


class Divinity extends Piece{
    // The divinity has 2 regular movement of forced direction.
    // However, it attacks from exactly four distance away.
    constructor(start_pos) {
        super().init("Uni", 4, start_pos, 2, -2)
    }
}

class Game {

    constructor(mode) {
        // This var will be set to false any time a start condition is not met.
        // The status val will be checked after instantiation, and if it is False,
        // the instance will be deleted and the process restarted.
        this.status = true;
        this.mode = mode;

        if (this.mode === "GreyVCom" || this.mode === "Grey2P") {
            this.p1color = "Grey";
            this.p2color = "Red";
        } else if (this.mode === "RedVCom" || this.mode === "Red2P") {
            this.p1color = "Red";
            this.p2color = "Grey";
        } else {
            console.log("Mode not selected.");
            console.log(this.mode);
            this.status = false;
        }
    }

    // Dice function that determines who goes first.
    generate_die_val() {
        return Math.floor(Math.random() * 6) + 1
    }

    move(obj_piece, total_dist) {
        if (total_dist <= obj_piece.movement_dist) {
            // If dist_increment is a negative number, a piece can move UP TO the value in movement_dist. Otherwise,
            // dist_increment must be equal to movement_dist (mandatory movement amount). The same principle
            // applies to attack_dist.
            if (obj_piece.dist_increment > 0) {
                return obj_piece.dist_increment === obj_piece.movement_dist;
            } else {
                return obj_piece.dist_increment <= obj_piece.movement_dist;
            }
        } else {
            return false
        }
    }

    attack(obj_piece, total_dist) {
        // If attack_dist is a negative number, a piece can attack from up to the attack_dist or less. If
        // attack_dist is instead a positive number, it MUST attack from the exact value of attack_dist.
        if (obj_piece.attack_dist > 0) {
            return obj_piece.attack_dist === total_dist;
        } else {
            return obj_piece.attack_dist <= total_dist;
        }
    }

    select_space(obj_piece, selected_space_abst) {
        // selected_space_abst (abstract selected values from spaces array) = [[(0), (1)], (1)]
        let calculated_dist_x = Math.abs(obj_piece.current_pos[0] - selected_space_abst[0][0]);
        let calculated_dist_y = Math.abs(obj_piece.current_pos[1] - selected_space_abst[0][1]);
        let total_dist = calculated_dist_x + calculated_dist_y;

        // If z !== 0 (empty) where [x, y], z
        var result = null;
        if (selected_space_abst[1] !== 0) {
            result = this.attack(obj_piece, total_dist)
        } else {
            result = this.move(obj_piece, total_dist)
        }

        if (result) {
            obj_piece.current_pos = [selected_space_abst[0][0], selected_space_abst[0][1]];
            spaces[obj_piece.current_pos[0] + obj_piece.current_pos[1]][1] = obj_piece.alias_id;
            return true;
        } else {
            return false;
        }
    }

    // This function takes the id of the tile div as an argument and translates it to a list.
    // It then matches that list to the appropriate spot in the spaces array and initiates move
    // validity calculation.
    select_action(obj_piece, tile_value) {
        // [x, y]
        let coordinates = tile_value.split(",");
        let index = coordinates[0] * 8 + y;

        var selected_space_abst = spaces[index];
        return this.select_space(obj_piece, selected_space_abst);
    }

    generate_piece(type, tile_id, color, item_num){
        let tile = document.getElementById(tile_id);
        var img_obj = document.createElement('img');
        img_obj.className = "piece";
        img_obj.id = type + "_" + color + "_" + item_num;
        if(color === "Grey"){
            // Check for type here
            img_obj.src = "pawn_placeholder_grey.png"
        }
        else{
            // Check for type here
            img_obj.src = "pawn_placeholder_red.png"
        }
        tile.appendChild(img_obj);
    }

    init_game(){
        // p1 pieces
        new Far([7, 0]);
        this.generate_piece("Far", "[7, 0]", this.p1color, 1);
        new Far([7, 8]);
        this.generate_piece("Far", "[7, 8]", this.p1color, 2);
        new FootSoldier([7, 1]);
        this.generate_piece("FootSolider", "[7, 1]", this.p1color, 1);
        new FootSoldier([7, 7]);
        this.generate_piece("FootSolider", "[7, 7]", this.p1color, 2);
        new Rider([8, 1]);
        this.generate_piece("Rider", "[8, 1]", this.p1color, 1);
        new Rider([8, 7]);
        this.generate_piece("Rider", "[8, 7]", this.p1color, 2);
        new Barricade([6, 4]);
        this.generate_piece("Barricade", "[6, 4]", this.p1color, 1);
        new Ninja([8, 4]);
        this.generate_piece("Ninja", "[8, 4]", this.p1color, 1);
        new Brave([8, 5]);
        this.generate_piece("Brave", "[8, 5]", this.p1color, 1);
        new Divinity([8, 3]);
        this.generate_piece("Divinity", "[8, 3]", this.p1color, 1);
        new Wraith([7, 6]);
        this.generate_piece("Wraith", "[7, 6]", this.p1color, 1);
        new Spinner([7, 2]);
        this.generate_piece("Spinner", "[7, 2]", this.p1color, 1);

        // p2 pieces
        new Far([1, 0]);
        this.generate_piece("Far", "[1, 0]", this.p2color, 1);
        new Far([1, 8]);
        this.generate_piece("Far", "[1, 8]", this.p2color, 2);
        new FootSoldier([1, 1]);
        this.generate_piece("FootSolider", "[1, 1]", this.p2color, 1);
        new FootSoldier([1, 7]);
        this.generate_piece("FootSolider", "[1, 7]", this.p2color, 2);
        new Rider([0, 1]);
        this.generate_piece("Rider", "[0, 1]", this.p2color, 1);
        new Rider([0, 7]);
        this.generate_piece("Rider", "[0, 7]", this.p2color, 2);
        new Barricade([2, 4]);
        this.generate_piece("Barricade", "[2, 4]", this.p2color, 1);
        new Ninja([0, 4]);
        this.generate_piece("Ninja", "[0, 4]", this.p2color, 1);
        new Brave([0, 5]);
        this.generate_piece("Brave", "[0, 5]", this.p2color, 1);
        new Divinity([0, 3]);
        this.generate_piece("Divinity", "[0, 3]", this.p2color, 1);
        new Wraith([1, 6]);
        this.generate_piece("Wraith", "[1, 6]", this.p2color, 1);
        new Spinner([1, 2]);
        this.generate_piece("Spinner", "[1, 2]", this.p2color, 1);
        
    }
}


// function test_index(){
//     for(var i = 0; i < spaces.length; i++){
//         console.log("Index: " + i);
//         console.log(spaces[i]);
//     }
// }
//
// test_index();
