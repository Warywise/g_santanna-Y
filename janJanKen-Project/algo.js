// let valor = '500px';

// console.log(parseInt(valor));

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
//   }

let pedra = 2;
let tesoura = 1;
let papel = -3;

function janKen(jan, ken) {
    if ((jan === papel && ken === pedra) ||  (jan === pedra && ken === papel)) {
    jan = Math.abs(jan);
    ken = Math.abs(ken);
    }
    let result = Math.max(jan, ken);
    console.log(result);
}

janKen(pedra, papel);