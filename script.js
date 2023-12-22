function clearDivs()
{
    let squares = document.querySelectorAll('.smallSquare');
    squares.forEach((square) => square.remove());
}


function populateBoard()
{
    let board = document.querySelector('.canvas_container');
    let size = prompt("Size of Board: ");

    while(size >= 100 || size <= 0)
    {
        if(size <= 0)
        {
            alert("Too small!");
        }
        else if(size >= 100)
        {
            alert("Too big!");
        }
        size = prompt("Size of Board: ");
    }

    board = document.querySelector('.canvas_container');
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++)
    {
        let square = document.createElement("div");
        square.className = "smallSquare";
        square.style.backgroundColor = "white";
        square.addEventListener("mouseover", ()=>
        {
            square.style.backgroundColor = generateRandomColor();
        });
        board.insertAdjacentElement('beforeend', square);
    }
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


let resizeButton = document.querySelector("#grid-size-button");
let board = document.querySelector('.canvas_container');
let isClearOn = false;
let isResize = false;
resizeButton.addEventListener("click", ()=>
{
    isResize = true;
    clearDivs();
    populateBoard();
});

let clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", () => 
{
    clearDivs();
    populateBoard();
});

populateBoard();