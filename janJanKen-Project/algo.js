
let pedra = 2;
let tesoura = 1;
let papel = -3;

// function janKen(jan, ken) {
//   let janKen = (jan === papel && ken === pedra);
//   let kenJan = (jan === pedra && ken === papel);
//   ken = getRandom(3);
//   if (ken === 3) { ken = -3 };
//   if (value === 'pedra') { jan = 2; }
//   if (value === 'papel') { jan = -3;}
//   if (value === 'tesoura') {jan = 1;}
//     if (janKen ||  kenJan) {
//     jan = Math.abs(jan);
//     ken = Math.abs(ken);
//     }
//     let result = Math.max(jan, ken);
//     console.log(result);
// }  janKen(pedra, papel);

  // let value;

function gamePlay() {
  gameStart();
  rolePlay();
}

function getRandom(max) {
  return Math.floor(Math.random() * max) + 1;
}

function gameStart() {
  let value;
  let game = document.getElementById('divIn');
game.addEventListener('click', function(div) {
  value = (div.target.id);
  return parseInt(value);
});
}

function rolePlay(jan, ken) {
  jan = gameStart();
  ken = getRandom(3);
  if (ken === 3) { ken = -3; }
  let janKen = (jan === -3 && ken === 2);
  let kenJan = (jan === 2 && ken === -3);
  if (janKen ||  kenJan) {
    jan = Math.abs(jan);
    ken = Math.abs(ken);
  }
  let result = [jan, ken];
  console.log(result);
}


  // function gamePlay() {
  //   let value;
  //   let game = document.getElementById('divIn');
  // game.addEventListener('click', function(div) {
  //   value = parseInt(div.target.id);
  // });
  //   let jan = value;
  //   let ken = getRandom(3);
  //   let janKen = (jan === -3 && ken === 2);
  //   let kenJan = (jan === 2 && ken === -3);
  //   if (janKen ||  kenJan) {
  //     jan = Math.abs(jan);
  //     ken = Math.abs(ken);
  //   }
  //   let result = [jan, ken];
  //   console.log(result);
  // }