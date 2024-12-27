<script type="text/javascript">
	atOptions = {
		'key' : 'd984bd8d63b960044359eb703f38aaf5',
		'format' : 'iframe',
		'height' : 60,
		'width' : 468,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/d984bd8d63b960044359eb703f38aaf5/invoke.js"></script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; // Adjusted for horizontal view
canvas.height = 400;

const birdImage = new Image();
birdImage.src = 'https://i.postimg.cc/QFqx8MS6/R-2.png';

const backgroundImage = new Image();
backgroundImage.src = 'https://i.postimg.cc/QFqx8MS6/R-2.png';

const pipeTopImage = new Image();
pipeTopImage.src = 'https://i.postimg.cc/Sn4xb9L2/flappy-bird-pipe-transparent-11549930651hqzkrjyfcl.png';

const pipeBottomImage = new Image();
pipeBottomImage.src = 'https://i.postimg.cc/Sn4xb9L2/flappy-bird-pipe-transparent-11549930651hqzkrjyfcl.png';

let bird = {
    x: 50,
    y: 150,
    width: 34,
    height: 24,
    gravity: 0.4, // Reduced gravity for slower movement
    lift: -10, // Adjusted lift
    velocity: 0
};

let pipes = [];
let score = 0;
let gameRunning = false;

function startGame() {
    document.getElementById('start-overlay').style.display = 'none';
    gameRunning = true;
    pipes = [];
    score = 0;
    bird.y = 150;
    bird.velocity = 0;
    pipes.push(createPipe());
    gameLoop();
}

function createPipe() {
    const gap = 150; // Increased gap for easier play
    const topHeight = Math.random() * (canvas.height - gap - 100) + 50;
    return {
        x: canvas.width,
        top: topHeight,
        bottom: topHeight + gap,
        width: 52,
        speed: 1.5 // Slower pipe speed
    };
}

function drawBird() {
    ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.drawImage(pipeTopImage, pipe.x, pipe.top - pipeTopImage.height);
        ctx.drawImage(pipeBottomImage, pipe.x, pipe.bottom);
    });
}

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= pipe.speed;
    });

    if (pipes[0].x + pipes[0].width < 0) {
        pipes.shift();
        pipes.push(createPipe());
        score++;
    }
}

function checkCollision() {
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver();
    }

    pipes.forEach(pipe => {
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
        ) {
            gameOver();
        }
    });
}

function gameOver() {
    gameRunning = false;
    document.getElementById('start-overlay').style.display = 'flex';
    document.getElementById('start-button').innerText = 'Restart Game';
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    drawBird();
    drawPipes();
    updatePipes();
    checkCollision();
    drawScore();

    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        bird.velocity = bird.lift;
    }
});

document.getElementById('start-button').addEventListener('click', startGame);
