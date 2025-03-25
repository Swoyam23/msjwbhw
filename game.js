// Game Setup and Constants
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = 800;
const HEIGHT = 600;
canvas.width = WIDTH;
canvas.height = HEIGHT;

let currentScene = "disclaimer";  // Starting with the disclaimer scene
let player = { x: 100, y: 100, width: 50, height: 50, speed: 5, health: 100 };

// Characters array to hold NPCs and their positions
let characters = [
    { name: "Sudipta", x: 300, y: 300, width: 50, height: 50, dialogue: "Hey Miss Universe! It’s good to see you here. I’ll always help!" },
    { name: "Swaroop", x: 500, y: 500, width: 50, height: 50, dialogue: "Stay away! I hurt you if you get too close." },
    { name: "Siba", x: 700, y: 200, width: 50, height: 50, dialogue: "Forget all your stress! Just dance with me!" }
];

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

    // Check for interactions with characters
    checkCharacterProximity();

    setTimeout(() => {
        currentScene = "meetingSudipta";
    }, 5000);
}

// Check for interactions with characters
function checkCharacterProximity() {
    characters.forEach(character => {
        const dist = Math.sqrt(Math.pow(player.x - character.x, 2) + Math.pow(player.y - character.y, 2));
        if (dist < 60) {
            gameText.innerText = `${character.name}: ${character.dialogue}`;
            if (keyState[" "]) {  // Spacebar to interact
                if (character.name === "Sudipta") {
                    gameText.innerText = "Sudipta gives you a flower!";
                }
                if (character.name === "Siba") {
                    gameText.innerText = "You dance together, feeling happier.";
                }
            }
        }
    });
}

// Encounter Swaroop
function encounterSwaroop() {
    gameText.innerText = "Swaroop: Stay away! I hurt you if you get too close.";
    // Logic to move Swaroop, and defeat him
    setTimeout(() => {
        currentScene = "finalBoss"; // Transition to final boss scene
    }, 3000);
}

// Final boss (CA Exam fight)
function fightCAExam() {
    gameText.innerText = "CA Exam: The final test! Defeat me!";
    ctx.fillStyle = "red";
    ctx.fillRect(300, 100, 200, 100); // Drawing the CA Exam as a simple rectangle (could replace with image)

    // Check if player attacks
    setTimeout(() => {
        currentScene = "victory"; // Transition to victory after defeating the CA Exam
    }, 5000);
}

// Victory scene
function victoryScene() {
    gameText.innerText = "Congratulations! You have conquered your fears. Now, wake up and face reality with confidence.";
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

let playerHealth = 100;  // Health of Miss Universe
let caExamHealth = 100;  // Health of CA Exam

// Draw Health Bars
function drawHealthBars() {
    // Player health bar
    ctx.fillStyle = "green";
    ctx.fillRect(10, 10, playerHealth * 2, 20); // Player health bar (green)

    // CA Exam health bar
    ctx.fillStyle = "red";
    ctx.fillRect(WIDTH - 210, 10, caExamHealth * 2, 20); // CA Exam health bar (red)
}

// Update Health and Handle Combat
function handleCombat() {
    if (player.x < 300 && player.x > 200 && player.y < 200 && player.y > 100) {
        caExamHealth -= 1; // Example of attacking CA Exam by decreasing health
    }
}

// Call handleCombat inside the fightCAExam function
function fightCAExam() {
    gameText.innerText = "CA Exam: The final test! Defeat me!";
    ctx.fillStyle = "red";
    ctx.fillRect(300, 100, 200, 100); // Drawing the CA Exam

    // Handle combat with CA Exam
    handleCombat();
    drawHealthBars();
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
