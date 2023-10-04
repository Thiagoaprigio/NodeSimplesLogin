const db = require('../db/database'); // Suponha que este arquivo contém a configuração da conexão com o banco de dados 
 
function getAll() { 
  return db.query('SELECT * FROM posts LEFT JOIN users ON users.id = posts.users_id'); 
} 
 
function getPost(id) { 
  return db.query('SELECT * FROM posts LEFT JOIN users ON users.id = posts.users_id WHERE posts.id = ?', [id]); 
} 
 
function save(post) { 
  return db.query('INSERT INTO posts (titulo, texto, users_id) VALUES (?, ?, ?)', [post.titulo, post.texto, post.users_id]); 
} 
 
function alterar(post) { 
  return db.query('UPDATE posts SET titulo = ?, texto = ?, users_id = ?  WHERE id = ?', [post.titulo, post.texto, post.users_id, post.id]) 
} 
function excluir(post_id) { 
  return db.query('DELETE FROM posts WHERE id = ?', [post_id]) 
} 
 
module.exports = { 
  getAll, 
  getPost, 
  save, 
  alterar, 
  excluir 
};