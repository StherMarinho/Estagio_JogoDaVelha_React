import { useState } from 'react';
import './App.css';

function Square({ value, onSquareClick, isWinningSquare }) {
  // Se for o quadrado vencedor, adiciona a classe 'winner'
  return (
    <button 
      className={`square ${isWinningSquare ? 'winner' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares); // Agora retorna objeto com vencedor e linha
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];
  
  const isDraw = !winner && squares.every(s => s !== null);
  const isGameOver = winnerInfo || isDraw;

  function handleClick(i) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // Alteração 5: Passamos o índice clicado para calcular a localização
    onPlay(nextSquares, i);
  }

  // Alteração 4 (Empate): Verifica se não há nulos e não há vencedor
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isDraw) {
    status = 'Resultado: Empate!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // Alteração 2: Dois loops para criar os quadrados
  const boardSize = 3;
  let boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    let rowSquares = [];
    for (let col = 0; col < boardSize; col++) {
      const i = row * boardSize + col;
      rowSquares.push(
        <Square 
          key={i}
          value={squares[i]} 
          onSquareClick={() => handleClick(i)}
          isWinningSquare={winningLine.includes(i)} // Alteração 4: Destaque
        />
      );
    }
    boardRows.push(<div key={row} className="board-row">{rowSquares}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}

export default function Game() {
  // Alteração 5: Armazenamos o histórico de localizações (índice do clique)
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastIdx: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true); // Alteração 3: Estado de ordenação

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handleRestart() {
      setHistory([{ squares: Array(9).fill(null), lastIdx: null }]);
      setCurrentMove(0);
    }

  function handlePlay(nextSquares, clickedIdx) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, lastIdx: clickedIdx } // Salva o índice para calcular (lin, col)
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Verifica se o jogo terminou para mostrar o botão
  const winnerInfo = calculateWinner(currentSquares);
  const isDraw = !winnerInfo && currentSquares.every(s => s !== null);
  const isGameOver = winnerInfo || isDraw;

  // Alteração 5: Lógica para calcular (linha, coluna)
  const moves = history.map((step, move) => {
    let description;
    const row = Math.floor(step.lastIdx / 3) + 1;
    const col = (step.lastIdx % 3) + 1;
    const location = step.lastIdx !== null ? ` (Linha: ${row}, Coluna: ${col})` : "";

    if (move > 0) {
      description = `Vá para a jogada #${move}${location}`;
    } else {
      description = 'Vá para o início do jogo';
    }

    // Alteração 1: Se for a jogada atual, mostra texto, se não, mostra botão
    if (move === currentMove) {
      return <li key={move}>Você está na jogada nº {move}{location}</li>;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Alteração 3: Ordenar a lista conforme o estado, botão
  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        
        {/* O botão aparece aqui, logo abaixo do Board, se o jogo acabar */}
        {isGameOver && (
          <button className="restart-button" onClick={handleRestart}>
            Reiniciar Jogo
          </button>
        )}
      </div>
      <div className="game-info">
        <button onClick={() => setIsAscending(!isAscending)}>
          Ordem: {isAscending ? "Crescente" : "Decrescente"}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

// Alteração 4: Função modificada para retornar a linha vencedora
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
    [0, 4, 8], [2, 4, 6]             // diagonais
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}