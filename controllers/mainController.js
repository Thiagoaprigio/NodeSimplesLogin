async function verificar_session(req, res){
    if (!req.session.isLoggedIn) {
        res.redirect('/login/index')
        return
    }
}

module.exports = {
    verificar_session
}