// 9 x 9
// "x, y": occupied
spaces = {"0, 0": 0, "0, 1": 0, "0, 2": 0, "0, 3": 0, "0, 4": 0, "0, 5": 0, "0, 6": 0, "0, 7": 0, "0, 8": 0,
        "1, 0": 0, "1, 1": 0, "1, 2": 0, "1, 3": 0, "1, 4": 0, "1, 5": 0, "1, 6": 0, "1, 7": 0, "1, 8": 0,
        "2, 0": 0, "2, 1": 0, "2, 2": 0, "2, 3": 0, "2, 4": 0, "2, 5": 0, "2, 6": 0, "2, 7": 0, "2, 8": 0,
        "3, 0": 0, "3, 1": 0, "3, 2": 0, "3, 3": 0, "3, 4": 0, "3, 5": 0, "3, 6": 0, "3, 7": 0, "3, 8": 0,
        "4, 0": 0, "4, 1": 0, "4, 2": 0, "4, 3": 0, "4, 4": 0, "4, 5": 0, "4, 6": 0, "4, 7": 0, "4, 8": 0,
        "5, 0": 0, "5, 1": 0, "5, 2": 0, "5, 3": 0, "5, 4": 0, "5, 5": 0, "5, 6": 0, "5, 7": 0, "5, 8": 0,
        "6, 0": 0, "6, 1": 0, "6, 2": 0, "6, 3": 0, "6, 4": 0, "6, 5": 0, "6, 6": 0, "6, 7": 0, "6, 8": 0,
        "7, 0": 0, "7, 1": 0, "7, 2": 0, "7, 3": 0, "7, 4": 0, "7, 5": 0, "7, 6": 0, "7, 7": 0, "7, 8": 0,
        "8, 0": 0, "8, 1": 0, "8, 2": 0, "8, 3": 0, "8, 4": 0, "8, 5": 0, "8, 6": 0, "8, 7": 0, "8, 8": 0,
    };


class Piece {

    init(attack_dir, attack_dist, start_pos, movement_dist, dist_increment, alias_id) {
        // This string var is a way to identify which
        // directions relative to the piece it can attack.
        this.attack_dir = attack_dir;
        // Pieces have a mandatory attack distance.
        this.attack_dist = attack_dist;
        // there can be up to two instances of a piece on the board. If these values
        //     // are negative ones, it will be ignored when setting up the board.
        this.start_pos = start_pos;
        // Max distance a piece can move
        this.movement_dist = movement_dist;
        // Some pieces must move the whole distance
        this.dist_increment = dist_increment;
        this.current_pos = this.start_pos;
        this.alias_id = alias_id;
        // set starting space as being occupied with piece
        spaces.start_pos = alias_id;
    }
}


class Far extends Piece{
    // These are versatile movement pieces that cannot attack unless attack distance is 2.
    constructor(start_pos, alias_id){
        super().init("Bent", 2, start_pos, 2, 1, alias_id)
    }
}

class Rider extends Piece {
    // These pieces can move in any direction up to two spaces. When attacking, the attack distance
    // must be 2 (pierce).
    constructor(start_pos, alias_id) {
        super().init("Uni", 2, start_pos, 2, 1, alias_id)
    }
}

class Barricade extends Piece{
    // These pieces must be attached by two pieces during the same turn to be destroyed.
    // It can only be moved one space at a time in cardinal directions and cannot attack.
    constructor(start_pos, alias_id) {
        super().init("Cardinal", 0, start_pos, 1, 1, alias_id)
    }
}

class FootSoldier extends Piece{
    // The footsoldier is a simple, short movement piece that can attack at 1 distance.
    constructor(start_pos, alias_id) {
        super().init("Bent", 1, start_pos, 1, 1, alias_id)
    }
}

class Ninja extends Piece{
    // The ninja can bypass barricade (but cannot attack it). It can attack at 2 or less distance.
    // Normal movement is one tile at a time.
    constructor(start_pos, alias_id) {
        super().init("Uni", -2, start_pos, 1, 1, alias_id)
    }
}

class Spinner extends Piece{
    // The spinner can be spun in any direction and can charge direction types only when hitting a boundary.
    // It can attack at 3 or less distance, but any further and it simply gets stopped by anything else
    // that was 4 or more distance away.
    constructor(start_pos, alias_id) {
        super().init("Bent-Edge", -3, start_pos, 5, 5, alias_id)
    }
}

class Wraith extends Piece{
    // Your pieces can go through a wraith. Opponents cannot pass through a wraith and "stop short".
    // If a piece is stopped short because of wraith, wraith cannot attack the next turn.
    constructor (start_pos, alias_id) {
        super().init("Uni", -2, start_pos, 2, 1, alias_id)
    }
}


class Brave extends Piece{
    // The brave must attack from three distance and has
    // the ability martyr. Martyr is triggered when the brave is killed.
    // Martyr: If the divinity is still alive, it transforms into a spinner.
    // A wraith is created where the brave died.
   constructor(start_pos, alias_id) {
       super().init("Uni", 3, start_pos, 3, 1, alias_id)
   }
}


class Divinity extends Piece{
    // The divinity has 2 regular movement of forced direction.
    // However, it attacks from exactly four distance away.
    constructor(start_pos, alias_id) {
        super().init("Uni", 4, start_pos, 2, 2, alias_id)
    }
}

class Game{

    constructor(mode){
        // This var will be set to false any time a start condition is not met.
        // The status val will be checked after instantiation, and if it is False,
        // the instance will be deleted and the process restarted.
        this.status = true;
        this.mode = mode;

        if (this.mode === "GreyVCom" || mode === "GreyVRed")
        {
            this.p1color = "Grey";
            this.p2color = "Red";
        }
        else if(this.mode === "RedVCom" || mode === "RedVGrey") {
            this.p1color = "Red";
            this.p2color = "Grey";
        }
        else {
            console.log("Mode not selected.");
            this.status = false;
        }

        // Dice function that determines who goes first.
        function generate_die_val() {
            return Math.floor(Math.random() * 6) + 1
        }

        function attack(obj_piece, selected_space){

        }

        function move(obj_piece, selected_space){

        }
    }
}