const cells = document.querySelectorAll('.cell');
  const resetButton = document.getElementById('reset');
  const winnerText = document.getElementById('winner');
  let currentPlayer = 'X';
  let gameOver = false;

  function checkForWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // строка
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // столбик
      [0, 4, 8], [2, 4, 6]             // диагональ
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
        return cells[a].textContent;
      }
    }
    return null;
  }

  function cellClickHandler(e) {
    const cell = e.target;
    if (cell.textContent !== '' || gameOver) {
      return;
    }
    cell.textContent = currentPlayer;
    const winner = checkForWinner();
    if (winner) {
      gameOver = true;
      winnerText.textContent = 'Победитель: ' + winner;
      
      winnerText.classList.remove('hidden');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameOver = false;
    winnerText.classList.add('hidden');
    winnerText.textContent = '';
  }

  cells.forEach(cell => cell.addEventListener('click', cellClickHandler));
  resetButton.addEventListener('click', resetGame);