import { useEffect, useState } from "react";
import Snake from "./components/Snake";
import Food from "./components/Food";

//random vị trí food
const getRandomFood = () => {
  let max = 1;
  let min = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10;
  return [x, y];
};

function App() {
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [10, 0],
  ]);
  const [direction, setDirection] = useState("RIGHT");
  const [speed] = useState(200);
  const [food, setFood] = useState(getRandomFood());

  let initialRows = [];
  for (let i = 0; i < 10; i++) {
    initialRows.push([]);
    for (let k = 0; k < 10; k++) {
      initialRows[i].push([]);
    }
  }

  const [rows] = useState(initialRows);

  const onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        setDirection("UP");
        break;
      case 40:
        setDirection("DOWN");
        break;
      case 37:
        setDirection("LEFT");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 87:
        setDirection("UP");
        break;
      case 83:
        setDirection("DOWN");
        break;
      case 65:
        setDirection("LEFT");
        break;
      case 68:
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };

  const snakeMove = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];
    switch (direction) {
      case "RIGHT":
        head = [head[0] + 10, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 10, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 10];
        break;
      case "UP":
        head = [head[0], head[1] - 10];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };

  //Hàm thực thi khi rắn ra khỏi vùng game
  const CheckBorders = () => {
    let headFirst = snakeDots[snakeDots.length - 1];
    let snake = [...snakeDots];
    let newHead = [];
    //từ trái sang phải
    if (headFirst[0] >= 100) {
      newHead = [0, headFirst[1]];
      //từ trên xuống dưới
    } else if (headFirst[1] >= 100) {
      newHead = [headFirst[0], 0];

      //từ dưới lên trên
    } else if (headFirst[1] < 0) {
      newHead = [headFirst[0], 90];

      //từ phải qua trái
    } else if (headFirst[0] < 0) {
      newHead = [90, headFirst[1]];
    }
    if (newHead.length > 0) {
      snake.push(newHead);
      snake.unshift();
      snake.shift();
      setSnakeDots(snake);
    }
  };

  //Ham thuc thi khi rắn chạm đuôi
  const CheckCollapse = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
      }
    });
  };

  //Hàm thực thi khi rắn ăn
  const EatFoot = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      finishEat();
      setFood(getRandomFood());
    }
  };

  //Sau khi ăn sẽ thêm phần tử
  const finishEat = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  //Kêt thúc trò chơi
  const gameOver = () => {
    alert("Game over");
    setSnakeDots([
      [0, 0],
      [10, 0],
    ]);
    setFood(getRandomFood());
    setDirection("RIGHT");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      snakeMove();
      document.onkeydown = onKeyDown;
    }, speed);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    CheckBorders();
    CheckCollapse();
    EatFoot();
  });

  const displayRows = rows.map((row) => (
    <div className="element">
      {row.map((e) => (
        <div className="element-child">
          <div className="bg"></div>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="game-zone">
      {displayRows}
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
    </div>
  );
}

export default App;
