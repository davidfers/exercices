export const genToken = (length) => {
  let token = Math.random().toString(36).substr(2);
  for (let i = 0; i < 5; i++) {
    token += token = Math.random().toString(36).substr(2);
  }
  return token.substr(0, length);
};

export const findLocalItems = (query) => {
  let i;
  const results = [];
  for (i in localStorage) {
    if (localStorage.hasOwnProperty(i)) {
      if (i.match(query)) {
        results.push({ key: i, val: JSON.parse(localStorage.getItem(i)) });
      }
    }
  }
  return results;
};

export function countDown(taskDate, display) {
  let timer;
  let seconds;
  let minutes;
  let hours;
  let days;
  setInterval(() => {
    const currentDate = new Date();
    timer = Math.floor((taskDate - currentDate) / 1000);
    minutes = Math.floor(timer / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);

    seconds = timer % 60;
    minutes %= 60;
    hours %= 24;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    hours = hours < 10 ? `0${hours}` : hours;
    days = days < 10 ? `0${days}` : days;

    display.innerHTML = `${days} dias<br>${hours} horas<br>${minutes} min<br>${seconds} sec`;

    if (timer < 0) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      display.innerHTML = `Caducó el ${new Date(taskDate).toLocaleDateString('es', options)}`;
    }
  }, 50);
}
