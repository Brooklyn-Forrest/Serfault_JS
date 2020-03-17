function generate_board(append_frame){
    div_container = document.createElement('div');
    div_container.id = "board_container";
    append_frame.appendChild(div_container);

    // Tile generation
    color_switch = 0;
    tile_x = 0;
    tile_y = 0;

    while(tile_x <= 8){
        while(tile_y <= 8){
            tile_div = document.createElement('div');
            tile_div.id = "[" + tile_x + ", " + tile_y + "]";
            tile_div.className = "tile";
            if(color_switch === 0){
                tile_div.style = "background-color: black";
                color_switch = 1
            }
            else{
                tile_div.style = "background-color: white";
                color_switch = 0
            }
            div_container.appendChild(tile_div);
            tile_y = tile_y + 1;
        }
        tile_y = 0;
        tile_x= tile_x + 1;
    }
    tile_x = 0;
}


class menu_controller{
    init() {
        this.menu = document.getElementById('menu_frame');
    }

    create_main_menu(){
        this.menu.innerHTML = '';

        var board = document.getElementById('board_container');
        var images = board.getElementsByTagName('img');
        while(images.length !== 0){
            images[0].remove();
        }

        let title_label = document.createElement('h3');
        title_label.innerText = "Main Menu";
        let hr_ele = document.createElement('hr');
        let i_ele = document.createElement('i');
        i_ele.innerText = "Game Mode";
        var br_ele = document.createElement('br');
        var br_cpy = document.createElement('br');
        var br_cpy_2 = document.createElement('br');
        var br_cpy_3 = document.createElement('br');
        var br_cpy_4 = document.createElement('br');
        var br_cpy_5 = document.createElement('br');
        var br_cpy_6 = document.createElement('br');
        var br_cpy_7 = document.createElement('br');
        let button_ele_vcom = document.createElement('button');
        button_ele_vcom.innerText = "VCom";
        button_ele_vcom.id = "vcom";
        button_ele_vcom.className = 'selection_button sel';
        button_ele_vcom.addEventListener('click', function(){ switch_selected('Mode', this)});

        let button_ele_2p = document.createElement('button');
        button_ele_2p.innerText = "2P";
        button_ele_2p.id = "2p";
        button_ele_2p.className = 'selection_button';
        button_ele_2p.addEventListener('click', function(){ switch_selected('Mode', this)});

        // br br
        let i_ele_2 = document.createElement('i');
        i_ele_2.innerText = "Player 1 Color";
        // br
        let button_ele_grey = document.createElement('button');
        button_ele_grey.innerText = "Grey";
        button_ele_grey.id = "grey_button";
        button_ele_grey.className = 'col sel';
        button_ele_grey.addEventListener('click', function(){ switch_selected('Color', this)});

        let button_ele_red = document.createElement('button');
        button_ele_red.innerText = "Red";
        button_ele_red.id = "red_button";
        button_ele_red.className = 'col';
        button_ele_red.addEventListener('click', function(){ switch_selected('Color', this)});
        // br br br br br

        let start_button = document.createElement('button');
        start_button.innerText = "Start";
        start_button.onclick = start_game;

        // append children
        this.menu.appendChild(title_label);
        this.menu.appendChild(hr_ele);
        this.menu.appendChild(i_ele);
        this.menu.appendChild(br_ele);
        this.menu.appendChild(button_ele_vcom);
        this.menu.appendChild(button_ele_2p);
        this.menu.appendChild(br_cpy);
        this.menu.appendChild(br_cpy_2);
        this.menu.appendChild(i_ele_2);
        this.menu.appendChild(br_cpy_3);
        this.menu.appendChild(button_ele_grey);
        this.menu.appendChild(button_ele_red);
        this.menu.appendChild(br_cpy_4);
        this.menu.appendChild(br_cpy_5);
        this.menu.appendChild(br_cpy_5);
        this.menu.appendChild(br_cpy_6);
        this.menu.appendChild(start_button);
    }

    create_game_state(){
        this.menu.innerHTML = '';

        let title_label = document.createElement('h3');
        title_label.innerText = "Game";
        let hr_ele = document.createElement('hr');
        let i_ele = document.createElement('i');
        i_ele.innerText = "Pieces Taken";
        var br_ele = document.createElement('br');
        var br_cpy = document.createElement('br');
        var br_cpy_2 = document.createElement('br');
        var br_cpy_3 = document.createElement('br');
        var br_cpy_4 = document.createElement('br');
        var br_cpy_5 = document.createElement('br');
        var br_cpy_6 = document.createElement('br');
        var br_cpy_7 = document.createElement('br');

        let p1div = document.createElement('div');
        p1div.id = "p1div";

        let p2div = document.createElement('div');
        p2div.id = "p2div";

        let i_label = document.createElement('i');
        i_label.innerText = "Player 1";
        let i_label_2 = document.createElement('i');
        i_label_2.innerText = "Player 2";

        let b_tally_1 = document.createElement('b');
        b_tally_1.innerText = "0";
        b_tally_1.id = "p1tally";

        let b_tally_2 = document.createElement('b');
        b_tally_2.innerText = "0";
        b_tally_2.id = "p2tally";

        let end_b = document.createElement('button');
        end_b.innerText = "End Game";
        end_b.id = "e_button";
        end_b.onclick = reset_game;

        this.menu.appendChild(title_label);
        this.menu.appendChild(hr_ele);
        this.menu.appendChild(br_ele);
        this.menu.appendChild(i_ele);
        this.menu.appendChild(br_cpy);
        this.menu.appendChild(br_cpy_2);
        this.menu.appendChild(p1div);
        this.menu.appendChild(p2div);
        p1div.appendChild(i_label);
        p2div.appendChild(i_label_2);
        p1div.appendChild(br_ele);
        p2div.appendChild(br_cpy_5);
        p1div.appendChild(b_tally_1);
        p2div.appendChild(b_tally_2);
        p1div.appendChild(br_cpy_3);
        p2div.appendChild(br_cpy_4);

        this.menu.appendChild(br_cpy_6);
        this.menu.appendChild(br_cpy_7);

        this.menu.appendChild(end_b);
    }

    create_settings_menu(){

    }
}
