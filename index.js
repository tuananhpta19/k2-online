var express = require("express");
var app = express();
var path = require('path');
//cách truyền dữ liệu từ client lên server (cách truyền công khai)
// truyền qua đường dẫn url
// query, params

var bodyParser = require('body-parser');
const { info } = require("console");
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


var user = [{
    id: 1,
    username: "nodemy"
},{
    id: 2,
    username: "nodemy2"
}]

app.get("/user", function(req, res){
    res.json(user)
});

//hiển thị chi tiết 1 user theo id

app.get("/user/:id", function(req, res){
    let getUser = user.filter((infoUser) => {
        return infoUser.id === parseInt(req.params.id)
    });
    if(getUser.length){
        return res.json({
            message: "Hiển thị dữ liệu thành công",
            data: getUser
        })
    }
    return res.json({
        message: "User không tồn tại"
    })
});

app.post("/user", function(req, res){
    let newUser = {};
    if(req.body.username){
        newUser.username = req.body.username;
        newUser.id = Date.now();
        user.push(newUser)
        return res.json({
            message: "Them dữ liệu thành công",
        })
    }
    return res.json({
        message: "Them dữ liệu khong thành công",
    })
})

app.put("/user/:id", function(req, res){
    let getUser = user.filter((infoUser) => {
        return infoUser.id === parseInt(req.params.id)
    });
    if(getUser.length){
        if(req.body.username || req.body.password){
            for(let i = 0; i < user.length; i++){
                if(user[i].id === parseInt(req.params.id)){
                    let newUser = Object.assign({}, user[i], req.body)
                    user[i] = newUser
                }
            }
    
            return res.json({
                message: "cap nhat dữ liệu khong thành công",
            })
        }
        return res.json({
            message: "Cap nhat dữ liệu khong thành công",
        })
    }
    return res.json({
        message: "User không tồn tại"
    })
})



app.delete("/user/:id", function(req, res){
    user = user.filter((infoUser) => {
        return infoUser.id !== parseInt(req.params.id)
    });
    return res.json({
        message: "Hiển thị dữ liệu thành công",
    })
});



app.listen(3000, function(){
    console.log("keest noi server thanh cong");
})