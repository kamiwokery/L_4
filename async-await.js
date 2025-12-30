// ASYNC/AWAIT 

//posts сорт по убыванию длины title
async function fetchPostsAsync() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
    const posts = await response.json();
    return posts.sort((a, b) => b.title.length - a.title.length);
  } catch (error) {
    console.error('Ошибка в fetchPostsAsync:', error);
    return [];
  }
}
//comments сорт по имени автора
async function fetchCommentsAsync() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
    const comments = await response.json();
    return comments.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Ошибка в fetchCommentsAsync:', error);
    return [];
  }
}
//users ост ток нужные поля
async function fetchUsersAsync() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    const users = await response.json();
    return users.map(user => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone
    }));
  } catch (error) {
    console.error('Ошибка в fetchUsersAsync:', error);
    return [];
  }
}
//todos ост ток невыполненные
async function fetchTodosAsync() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    
    const todos = await response.json();
    return todos.filter(todo => !todo.completed);
  } catch (error) {
    console.error('Ошибка в fetchTodosAsync:', error);
    return [];
  }
}
//тест
console.log('=== Тестируем async/await ===');
(async function() {
  const posts = await fetchPostsAsync();
  console.log('✓ Посты отсортированы по длине title (первые 3):');
  console.log(posts.slice(0, 3));
  console.log(`Всего постов: ${posts.length}\n`);
  
  const comments = await fetchCommentsAsync();
  console.log('✓ Комментарии отсортированы по name (первые 3):');
  console.log(comments.slice(0, 3));
  console.log(`Всего комментариев: ${comments.length}\n`);
  
  const users = await fetchUsersAsync();
  console.log('✓ Пользователи с выбранными полями (первые 3):');
  console.log(users.slice(0, 3));
  console.log(`Всего пользователей: ${users.length}\n`);
  
  const todos = await fetchTodosAsync();
  console.log('✓ Невыполненные задачи (первые 3):');
  console.log(todos.slice(0, 3));
  console.log(`Всего невыполненных задач: ${todos.length}\n`);
})();
