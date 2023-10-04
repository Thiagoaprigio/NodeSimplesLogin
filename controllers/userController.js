const userModel = require('../model/userModel');
const mainController = require('./mainController');

async function lista(req, res) {
  mainController.verificar_session(req, res)
  try {
    const dados = await userModel.getAll();
    users = dados[0]
    res.render('users/lista', { users })
  } catch (error) {
    console.log(error)
  }
}

async function visualizar(req, res) {
  mainController.verificar_session(req, res)
  const userId = parseInt(req.params.id);
  try {
    const dados = await userModel.getUser(userId);
    if (dados[0].length > 0) {
      user = dados[0][0]
      res.render('users/visualizar', { user })
    } else {
      res.status(404).json({ error: 'User Não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function novo(req, res) {
    res.render('users/new')
}



async function salvar(req, res) {
  const { nome, email, senha } = req.body;
  if (!nome) {
    res.status(400).json({ error: 'nome users querido' });
    return;
  }
  const newUser = {
    nome,
    email,
    senha
  }
  try {
    await userModel.save(newUser);
    res.redirect('/users/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function edit(req, res) {
 /* mainController.verificar_session(req, res) */
  const userId = parseInt(req.params.id);
  try {
    const dados = await userModel.getUser(userId);
    if (dados[0].length > 0) {
      user = dados[0][0]
      res.render('users/edit', { user })
    } else {
      res.status(404).json({ error: 'User Não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function alterar(req, res) {
  const { id, nome, email, senha } = req.body;
  if (!nome) {
    res.status(400).json({ error: 'nome obrigatorio' });
    return;
  }
  const updateUser = {
    id,
    nome,
    email,
    senha
  }
  try {
    console.log(updateUser)
    await userModel.alterar(updateUser);
    res.redirect('/users/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function excluir(req, res) {
  mainController.verificar_session(req, res)
  const userId = parseInt(req.params.id);
  try {
    await userModel.excluir(userId);
    res.redirect('/users/index')
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