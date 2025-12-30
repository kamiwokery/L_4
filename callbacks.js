// 1. Функция для получения постов через коллбэк
function fetchPostsWithCallback(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
xhr.onload = function() {
    if (xhr.status === 200) {
      const posts = JSON.parse(xhr.responseText); 

      const sortedPosts = posts.sort((a, b) => b.title.length - a.title.length);
      callback(null, sortedPosts);
    } else {
      callback(new Error('Ошибка запроса'), null);
    }
  };
  xhr.onerror = function() {
    callback(new Error('Ошибка сети'), null);
  };
  xhr.send();
}
console.log('Запускаем запрос к /posts...');
fetchPostsWithCallback((error, posts) => {
  if (error) {
    console.error('Ошибка:', error);
  } else {
    console.log('Отсортированные посты (первые 3):', posts.slice(0, 3));
    console.log('Всего постов:', posts.length);
  }
});
