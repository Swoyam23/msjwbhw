// Game Setup and Constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

let currentScene = "disclaimer";  // Starting with the disclaimer scene
let player = { x: 100, y: 100, width: 50, height: 50, speed: 5 };

// Array to manage characters and interactions
let characters = [];
let gameText = document.getElementById("gameText");

// Main Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    switch(currentScene) {
        case "disclaimer":
            showDisclaimer();
            break;
        case "home":
            showHome();
            break;
        case "dream":
            showDreamWorld();
            break;
        case "meetingSudipta":
            meetSudipta();
            break;
        case "pastEnemy":
            encounterSwaroop();
            break;
        case "finalBoss":
            fightCAExam();
            break;
        case "victory":
            victoryScene();
            break;
    }
    requestAnimationFrame(gameLoop);
}

// Display the disclaimer screen
function showDisclaimer() {
    gameText.innerText = "This is a work of fiction inspired by real experiences. All characters are symbolic, and events take place in a dream world. Enjoy the journey!";
    setTimeout(() => {
        currentScene = "home"; // Transition to home scene after 5 seconds
    }, 5000);
}

// Show home scene
function showHome() {
    gameText.innerText = "Mom: Wake up! You have studies to do!";
    player.x = WIDTH / 2;
    player.y = HEIGHT / 2;

    // Simulate movement or interaction with the player here
    setTimeout(() => {
        gameText.innerText = "Mom: I’m going out. Stay focused and don’t waste time!";
        setTimeout(() => {
            currentScene = "dream";
        }, 3000);
    }, 4000);
}

// Show dream world and allow player to move
function showDreamWorld() {
    gameText.innerText = "Welcome, Miss Universe. You are trapped in your own thoughts. Find your way out.";
    // Draw the dream environment (simple for now)
    ctx.fillStyle = "darkblue";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Player movement in dream world
    movePlayer();
    drawPlayer();

    // Simulate interaction or encounters with characters
    setTimeout(() => {
        currentScene = "meetingSudipta";
    }, 5000);
}

// Meet Sudipta
function meetSudipta() {
    gameText.innerText = "Sudipta: Hey Miss Universe! It’s good to see you here. I’ll always help!";
    // Here, we could add interaction with Sudipta and receiving flowers.

    setTimeout(() => {
        currentScene = "pastEnemy"; // Transition to encounter Swaroop
    }, 5000);
}

// Encounter Swaroop
function encounterSwaroop() {
    gameText.innerText = "Swaroop: Stay away! I hurt you if you get too close.";
    // Logic to move Swaroop, and defeat him
    // You can add collision detection and interactions with the "enemy".

    // After defeating Swaroop, transition to next scene
    setTimeout(() => {
        currentScene = "finalBoss"; // Transition to final boss scene
    }, 3000);
}

// Final boss (CA Exam fight)
function fightCAExam() {
    gameText.innerText = "CA Exam: The final test! Defeat me!";
    // Health bar and fighting mechanics would be drawn here.
    // Example: show a health bar and let Miss Universe attack the CA Exam.

    setTimeout(() => {
        currentScene = "victory"; // Transition to victory after defeating the CA Exam
    }, 5000);
}

// Victory scene
function victoryScene() {
    gameText.innerText = "Congratulations! You have conquered your fears. Now, wake up and face reality with confidence.";
    // Transition back to real world after a while
    setTimeout(() => {
        alert("You woke up!");
        currentScene = "home"; // Restart the game
    }, 3000);
}

// Player Movement Function
function movePlayer() {
    if (keyState["ArrowUp"]) player.y -= player.speed;
    if (keyState["ArrowDown"]) player.y += player.speed;
    if (keyState["ArrowLeft"]) player.x -= player.speed;
    if (keyState["ArrowRight"]) player.x += player.speed;
}

// Draw player character
function drawPlayer() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Key event listeners for player movement
let keyState = {};
document.addEventListener("keydown", (e) => {
    keyState[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keyState[e.key] = false;
});

// Start the game loop
gameLoop();
