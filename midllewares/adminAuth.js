function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next(); // Sever para dar continuidade na requisição do midlleware
    }else{
        res.redirect('/login')
    }



}

module.exports = adminAuth;