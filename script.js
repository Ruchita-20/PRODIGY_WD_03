const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const replayBtn = document.querySelector("#replayBtn");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let x_score=0;
let y_score=0;
let tie=0;
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    replayBtn.addEventListener("click", replayGame);
    restartBtn.addEventListener("click", reStart);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    addColor(cell);
}
function addColor(cell)
{
    const color = (currentPlayer == "X") ? "#00ff01" : "#ff6600";
    cell.style.color = color;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} won!`;
        if(currentPlayer=="X")
        {
            x_score+=1;
            document.getElementById("x_score").innerHTML=x_score;
        }
        else if(currentPlayer=="O")
        {
            y_score+=1;
            document.getElementById("y_score").innerHTML=y_score;
        }
        running = false;
        //win_openwindow();
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        tie+=1;
        document.getElementById("tie").innerHTML=tie;
        running = false;
    }
    else{
        changePlayer();
    }
}
function replayGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
function reStart(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    x_score=0;
    y_score=0;
    tie=0;
    document.getElementById("x_score").innerHTML=x_score;
    document.getElementById("y_score").innerHTML=y_score;
    document.getElementById("tie").innerHTML=tie;
    
}
function win_openwindow()
{
    mywindow=window.open("","","height=400 ,width=400,left=100,top=100"); 
    mywindow.document.writeln("<html>"); 
    mywindow.document.writeln("<head>");
    mywindow.document.writeln(`"<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />"`); 
    mywindow.document.writeln("</head>");
    mywindow.document.writeln("<body>"); 
    mywindow.document.writeln(`"<i class="fa-solid fa-trophy fa-beat fa-2xl"></i>"`);
    mywindow.document.writeln("</body>"); 
    mywindow.document.writeln("</html>"); 
    mywindow.document.close(); 
    mywindow.focus();

    
}