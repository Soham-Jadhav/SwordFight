function rectangularCollusionDetection(rectangle1, rectangle2) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function determineWinner(player1, player2, timerId) {
    clearTimeout(timerId);

    if (player1.health === player2.health) {
        // alert('It\'s a draw!');
        finalWinnerElem.innerHTML = "Tie";
    }
    else if (player1.health > player2.health) {
        // alert(`You win!`);
        finalWinnerElem.innerHTML = `Player 1 Wins!!!`;
    }
    else if (player1.health < player2.health) {
        // alert(`You loose!`);
        finalWinnerElem.innerHTML = `Player 2 Wins!!!`;
    }

    if (timer > 0) {
        setTimeout(() => {
            cancelAnimationFrame(animationId);
            displayTextElem.style.display = 'flex';
        }, 2000);
    }
    else {
        cancelAnimationFrame(animationId);
        displayTextElem.style.display = 'flex';
    }
}

let timer = 90;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        timerElem.innerHTML = timer;
    }
    else if (timer <= 0) {
        console.log("Times up!!!");

        determineWinner(player, enemy, timerId);
        // displayTextElem.style.display = 'flex';
        // if(player.health === enemy.health){
        //     // alert('It\'s a draw!');
        //     displayTextElem.innerHTML = "Tie";
        // }
        // else if(player.health > enemy.health){
        //     // alert(`You win!`);
        //     displayTextElem.innerHTML = `Player 1 Wins!!!`;
        // }
        // else if(player.health < enemy.health){
        //     // alert(`You loose!`);
        //     displayTextElem.innerHTML = `Player 2 Wins!!!`;
        // }
    }
}