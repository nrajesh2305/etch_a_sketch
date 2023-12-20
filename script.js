function populateBoard(size)
{
    let board = document.querySelector('.canvas_container');
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++)
    {
        let square = document.createElement("div");
        square.style.backgroundColor = "blue";
        board.insertAdjacentElement('beforeend', square);
    }
}

function changeSize(size)
{
    populateBoard(size);
}

populateBoard(16);