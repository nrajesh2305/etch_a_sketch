function populateBoard(size)
{
    let board = document.querySelector('.canvas_container');
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++)
    {
        let square = document.createElement("div");
        square.style.backgroundColor = "white";
        square.addEventListener("mouseover", ()=>
        {
            square.style.backgroundColor = generateRandomColor();
        });
        board.insertAdjacentElement('beforeend', square);
    }
}


function changeSize(size)
{
    populateBoard(size);
}

function generateRandomColor()
{
    let possibleChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let color = "#";
    for(let i = 0; i < 6; i++)
    {
        color += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    return color;
}

populateBoard(16);