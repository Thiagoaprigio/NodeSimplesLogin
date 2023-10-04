const postModel = require('../model/postModel');
const mainController = require('./mainController');

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
   const dados = await postModel.getAll();
   posts = dados[0]
  res.render('posts/new', { posts })
}


async function salvar(req, res) {
  const { titulo, texto, users_id } = req.body;
  if (! users_id) {
    res.status(400).json({ error: 'titulo posts querido' });
    return;
  }
  const newPost = {
    titulo,
    texto,
    users_id
  }
  try {
    await postModel.save(newPost);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function edit(req, res) {
  const postId = parseInt(req.params.id);
  try {  /*  O nome e dados_post mesmo?  */
    const dados_post = await postModel.getPost(postId);
    if (dados_post[0].length > 0) {
      post = dados_post[0][0]
      res.render('posts/edit', { post })
    } else {
      res.status(404).json({ error: 'post Não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function alterar(req, res) {
  const { titulo, texto, posts_id } = req.body;
  if (!titulo) {
    res.status(400).json({ error: 'titulo obrigatorio' });
    return;
  }
  
  const updatePost = {
    titulo,
    texto,
    posts_id
  }
  try {
    console.log(updatePost)
    await postModel.alterar(updatePost);
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