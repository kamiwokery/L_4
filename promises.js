//промисы

///users и ост ток нужные поля
function fetchUsersPromise() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      // Оставляем только нужные поля
      return users.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
      }));
    });
}

//todos и ост ток невыполненные 
function fetchTodosPromise() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(todos => {
      return todos.filter(todo => !todo.completed);
    });
}
//тест
console.log('=== Тестируем промисы ===');

fetchUsersPromise()
  .then(users => {
    console.log('✓ Пользователи с выбранными полями (первые 3):');
    console.log(users.slice(0, 3));
    console.log(`Всего пользователей: ${users.length}\n`);
  })
  .catch(err => console.error('Ошибка в fetchUsersPromise:', err));

fetchTodosPromise()
  .then(todos => {
    console.log('✓ Невыполненные задачи (первые 3):');
    console.log(todos.slice(0, 3));
    console.log(`Всего невыполненных задач: ${todos.length}\n`);
  })
  .catch(err => console.error('Ошибка в fetchTodosPromise:', err));
