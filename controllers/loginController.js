
const userModel = require('../model/userModel');


async function login_pagina(req, res) {
  res.render('login/index')
}

async function login_save(req, res) {
  const { email, senha } = req.body;
  //const user = users.find(u => u.username === username && u.senha === password);
  const dados = await userModel.getUserLogin(email, senha)
  if (dados[0].length > 0) {
    user = dados[0][0];
    req.session.isLoggedIn = true;
    req.session.email = user.email;
    res.redirect('/users/index')
  } else {
    // Autenticação falhou
    res.redirect('/login/index')
  }
}

async function logout(req, res) {
  // Destruindo a sessão para fazer logout
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login/index')
  });
}




module.exports = {
  login_pagina,
  login_save,
  logout
};