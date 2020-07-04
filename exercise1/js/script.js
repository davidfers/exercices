import { genToken, findLocalItems, countDown } from './funciones.js';

const form = document.querySelector('form');

class Task {
  constructor(id, name, color, time) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.time = time;
  }
}

// Crea un item en el localStorage con los valores introducidos en el form cuando se envia el submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const key = `task${genToken(20)}`;
  const task = document.querySelector('#task').value;
  if (task === '') {
    document.querySelector('#error').innerText = 'La tarea no puede estar vaciía';
    return;
  }
  const radio = document.querySelector('input[type=radio]:checked');
  if (radio === null) {
    document.querySelector('#error').innerText = 'Elige un color para la tarea';
    return;
  }

  const time = document.querySelector('input[type=date]').value;
  const taskTime = new Date(time).getTime();
  const currentTime = new Date().getTime();
  if (time === '') {
    document.querySelector('#error').innerText = 'La fecha es obligatoria,';
    return;
  }
  if ((taskTime - currentTime) < 0) {
    document.querySelector('#error').innerText = 'No puedes elegir una fecha pasada,';
    return;
  }
  localStorage.setItem(key, JSON.stringify(new Task(key, task, radio.value, time)));
  form.reset();
  location.reload();
});

// Localiza localItems específicos en localStorage con una regex
const regx = '^task[a-z0-9]{20}$';
let localit = [];
localit = findLocalItems(regx);
console.log(localit);

// Crea y modifica los elementos del DOM

localit.forEach((element) => {
  const div = document.createElement('div');
  div.className = `${element.val.color} task`;
  const paragraph = document.createElement('p');
  paragraph.innerText = element.val.name;
  const rightDiv = document.createElement('div');
  rightDiv.className = 'rightDiv';
  const close = document.createElement('span');
  close.className = 'close';
  close.id = element.key;
  close.innerHTML = '<img src="img/close.png">';
  const span = document.createElement('span');

  // Trabaja la fecha y hace el countdown

  const taskDate = new Date(element.val.time);
  countDown(taskDate.getTime(), span);
  rightDiv.appendChild(span);
  rightDiv.appendChild(close);
  div.appendChild(paragraph);
  div.appendChild(rightDiv);
  document.body.insertAdjacentElement('beforeend', div);
});

// Eventlistner a cada
const closeArray = document.querySelectorAll('.close');
closeArray.forEach((element) => {
  const key = element.id;
  element.addEventListener('click', () => {
    localStorage.removeItem(key);
    location.reload();
  });
});
