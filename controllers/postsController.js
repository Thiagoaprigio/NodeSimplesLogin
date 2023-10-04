const postModel = require('../model/postModel');
const userModel = require('../model/userModel');

async function lista(req, res) {
  try {
    const dados = await postModel.getAll();
    posts = dados[0]
    res.render('posts/lista', { posts })
  } catch (error) {
    console.log(error)
  }
}

async function visualizar(req, res) {
  const postId = parseInt(req.params.id);
  try {
    const dados = await postModel.getPost(postId);
    if (dados[0].length > 0) {
      post = dados[0][0]
      res.render('posts/visualizar', { post })
    } else {
      res.status(404).json({ error: 'post Não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function novo(req, res) {
  const dados = await userModel.getAll();
  users = dados[0]
  res.render('posts/new', { users })
}



async function salvar(req, res) {
  const { titulo, texto, users_id } = req.body;
  if (!titulo) {
    res.status(400).json({ error: 'titulo querido' });
    return;
  }
  if (!users_id) {
    res.status(400).json({ error: 'Usuário querido' });
    return;
  }
  const newpost = {
    titulo,
    texto,
    users_id
  }
  try {
    await postModel.save(newpost);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function edit(req, res) {
  const postId = parseInt(req.params.id);
  try {
    const dados_post = await postModel.getPost(postId);
    const dados_users = await userModel.getAll();
    if (dados_post[0].length > 0) {
      post = dados_post[0][0]
      users = dados_users[0]
      users.forEach(user => {
        user.isSelected = user.id === post.users_id;
      });
      res.render('posts/edit', { post, users })
    } else {
      res.status(404).json({ error: 'post Não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function alterar(req, res) {
  const { titulo, texto, id } = req.body;
  if (!titulo) {
    res.status(400).json({ error: 'titulo querido' });
    return;
  }
 
  const updatepost = {
    titulo,
    texto,
    id
  }
  try {
    await postModel.alterar(updatepost);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function excluir(req, res) {
  const postId = parseInt(req.params.id);
  try {
    await postModel.excluir(postId);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  lista,
  visualizar,
  salvar, 
  novo, 
  edit,
  alterar,
  excluir
};