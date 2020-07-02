/* eslint-disable no-restricted-syntax */
const form = document.querySelector('form');


class Task {
  constructor(id, name, color, time) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.time = time;
  }
}

const genToken = (length) => {
  let token = Math.random().toString(36).substr(2);
  for (let i = 0; i < 5; i++) {
    token += token = Math.random().toString(36).substr(2);
  }
  return token.substr(0, length);
};

const findLocalItems = (query) => {
  let i;
   let results = [];
  for (i in localStorage) {
    if (localStorage.hasOwnProperty(i)) {
      if (i.match(query)) {
        value = JSON.parse(localStorage.getItem(i));
        results.push({key: i, val: value});
      }
    }
  }
  return results;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const key = 'task' + genToken(20);
  const task = document.querySelector('#task').value;
  const radio = document.querySelector('input[type=radio]:checked').value;
  const time = document.querySelector('input[type=date]').value;
  localStorage.setItem(key, JSON.stringify(new Task(key, task, radio, time)));
});

const regx = '^task[a-z0-9]{20}$';
let localit = [];
localit = findLocalItems(regx);
console.log(localit);

for (const task in localit) {
  if (localit.hasOwnProperty(task)) {
    const element = localit[task];
    const paragraph = document.createElement('p');
    paragraph.className = element.val.color + ' task';
    const name = document.createTextNode(element.val.name);
    paragraph.appendChild(name);
    document.body.insertAdjacentElement('beforeend', paragraph);
  }
}
