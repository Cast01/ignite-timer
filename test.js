// function cronometro(minutos) {
//   minutos--;

//   if (minutos === -1) {
//     return console.log('Informe um valor!');
//   }

//   let segundos = 60;

//   while (minutos > -1) {
//     while (segundos > -1) {
//       console.log(`${minutos} : ${segundos}`);

//       if (segundos === 0 && minutos === 0) {
//         return console.log('Finalizou!');
//       }
//       segundos--;
//     }
//     segundos = 60;

//     minutos--;
//   }
// }
// cronometro(1);

// =======================================================

import { differenceInSeconds } from 'date-fns';

const startDate = new Date();

const interval = setInterval(() => {
  const seconds = differenceInSeconds(new Date(), startDate);

  if (seconds === 10) {
    clearInterval(interval);
    return console.log(seconds + ' - Finalizou!');
  }

  console.log(seconds);
}, 1000);
