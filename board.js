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
