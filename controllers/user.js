const {response} = require('express')

const usersGet = (req, res = response) => {

    const query = req.query;
    res.json({
        mgs: 'get API - controlador',
        query
    });
}

const userPut = (req, res) => {
    const {id} = req.params;
    res.json({
        mgs: 'PUT API -controlador',
        id
    });
}

const userPost = (req, res) => {
    const body = req.body;
    res.json({
        msg: "Post API -usersPost",
        body
    });
}

const userDelete = (req, res) => {
    res.json({
        mgs: 'delete API -controlador'
    });
}

const userPatch = (req, res) => {
    res.json({
        mgs: 'patch API -controlador'
    });
}


module.exports ={
    usersGet,
    userPut,
    userPost,
    userDelete,
    userPatch

}