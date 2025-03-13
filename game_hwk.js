// On page load -> generate game board
window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
};

// Global variables
let i = 0;
let clicks;
let timeScore;
let randomOrderArray = [];
let tiles = document.querySelectorAll(".gametile");
let selectedTile = '';
let tileIcon;
let tileIcons = [];
let tileIds = [];
let count;
let timer;

// Start button event listener
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

const startGame = () => {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
};

// End button event listener
document.getElementById('endGame').addEventListener("click", endGame);

const endGame = () => {
    const endTimer = () => {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    };
    
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
};

const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.floor(Math.random() * numberOfTiles) + 1;
        if (!randomOrderArray.includes(randomNum)) {
            randomOrderArray.push(randomNum);
        }
    }
};

const setTiles = () => {
    tiles.forEach(tile => {
        tile.innerHTML = randomOrderArray[i];
        i++;
        
        const iconMap = {
            rocket: `<i class="fas fa-rocket"></i>` ,
            bacteria: `<i class="fas fa-bacterium"></i>` ,
            cocktail: `<i class="fas fa-cocktail"></i>` ,
            football: `<i class="fas fa-football-ball"></i>` ,
            pizza: `<i class="fas fa-pizza-slice"></i>` ,
            kiwi: `<i class="fas fa-kiwi-bird"></i>`
        };
        
        let icon;
        if (tile.innerText < 3) icon = 'rocket';
        else if (tile.innerText < 5) icon = 'bacteria';
        else if (tile.innerText < 7) icon = 'cocktail';
        else if (tile.innerText < 9) icon = 'football';
        else if (tile.innerText < 11) icon = 'pizza';
        else if (tile.innerText < 13) icon = 'kiwi';
        else console.log("Error: too many tiles");
        
        tile.innerHTML = iconMap[icon];
        tile.setAttribute("icon", icon);
    });
};

const startTimer = () => {
    clearInterval(timer);
    count = 0;
    timer = setInterval(() => {
        document.getElementById("timer").innerText = count++;
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").innerText = "Game Over";
        }
    }, 1000);
};

const displayTile = (e) => {
    e.target.classList.remove("hideTile");
    e.target.classList.add("displayTile");
    
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    let tileId = e.target.getAttribute("id");
    tileIds.push(tileId);
    
    countMoves();
    
    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, tileIcons.length - 2);
    }
};

const checkMatch = (tileIcons, tileIds, n) => {
    if (tileIcons[n] !== tileIcons[n + 1]) {
        setTimeout(() => {
            document.getElementById(tileIds[n]).classList.remove("displayTile");
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
        }, 1000);
    } else {
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
};

const countMoves = () => {
    clicks = tileIcons.length;
    document.getElementById("clicks").innerText = clicks;
};

const calculateScore = () => {
    let calculatedScore = (parseInt(timeScore) + clicks);
    console.log(calculatedScore);
    document.querySelector("#score").innerText = calculatedScore;
};

const resetTiles = () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile", "displayTile");
    });
};

const generateRGBVal = () => {
    const generateRandomColor = () => Math.round(Math.random() * 255);
    return `rgb(${generateRandomColor()},${generateRandomColor()},${generateRandomColor()})`;
};
