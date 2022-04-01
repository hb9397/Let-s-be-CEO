const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// 해당부분 까지는 서버를 여는 기본 틀 정도로 생각
// port와 mysql과 같은 바뀔수 있는 부분만 유념

const data = fs.readFileSync('./database.json'); // database.json파일(DB접근 필요 정보)
const conf = JSON.parse(data) //js 내장함수, data파일을 json파일로 파싱후, conf에

const connection = mysql.createConnection({ // mysql연결 통로
    host: conf.host,                        // conf에 저장된 database.json의 정보호출
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
  });
connection.connect(); //.connect()메서드로 db연결
//line 15부터 25까지만 묶어서 따로 DB연결 컴포넌트로 분리가능 대신 마지막에 module.exports = connection과 같이 선언 필요

app.get('/api/login', (req,res)=>{ // api/login으로 user목록 가져오기
    connection.query('SELECT * FROM user', function(err,rows,fields){ //db접근 객첵의 .query()메서드에 sql문 담아서 보내는 형식
        res.header("Access-Control-Allow-Origin", "*"); //해당 헤더 부분은 cors정책에 위반하지 않기 위해사용함
        res.send(rows) //rows는 날릴sql문을 뜻한다
    })
})
app.post('/api/login', (req,res)=>{ // api/login에 회원가입 정보입력
    let sql = 'INSERT INTO user VALUES (null,?,?,?)';
    let ID = req.body.id
    let PW = req.body.password
    let Email = req.body.email // api가 요구하는 값들을 body에 담아와서 알린다, 회원가입시 id, pw, email을 요구
    let params = [ID, PW, Email] // 이에 맞게 요구되는 값들을 보낼 값들을 리스트에 담아서 
    connection.query(sql, params, //insert문의 형식에 맞게 보낸다
        (err, rows, fields) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(rows);
    })
})
app.put('/api/login/:oldId', (req,res)=>{ // 회원정보 수정
    let sql = 'UPDATE user SET ID=?, PW=?, Email=? WHERE ID=?  ';
    let ID = req.body.id
    let PW = req.body.pw
    let Email = req.body.email
    let oldID = req.params.oldId
    let params = [ID, PW, Email, oldID]
    connection.query(sql, params,
        (err, rows, fields) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(rows);
    })
})
app.delete('/api/login/:id', (req,res)=>{ // 회원탈퇴
    connection.query('DELETE FROM user WHERE ID = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/board', (req,res)=>{
    connection.query('SELECT * FROM board', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.get('/api/board/:user', (req,res)=>{
    connection.query('SELECT * FROM board WHERE b_writer=?',req.params.user, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.post('/api/board',(req,res)=>{
    let sql = 'INSERT INTO board VALUES (null,?,?,?,now())'
    let writer = req.body.writer;
    let content = req.body.content;
    let title = req.body.title;
    let params = [title,content,writer]
    connection.query(sql, params, function(error, rows,field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.delete('/api/board/:no', (req,res)=>{
    console.log("삭제")
    connection.query('DELETE FROM board WHERE no_board = ?', req.params.no, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.get('/api/comment/:title',(req,res)=>{
    connection.query('SELECT * FROM comment WHERE c_title=?',req.params.title, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.post('/api/comment',(req,res)=>{
    let sql = 'INSERT INTO comment VALUES (null,?,?,?,now())'
    let id = req.body.id;
    let comment = req.body.comment;
    let title = req.body.title;
    let params = [comment, title, id]
    connection.query(sql, params, function(error, rows,field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.delete('/api/comment/:no',(req,res)=>{
    connection.query('DELETE FROM comment WHERE no_comment = ?', req.params.no, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/question/:id', (req,res)=>{
    connection.query('SELECT * FROM question WHERE id = ?', req.params.id, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.post('/api/question', (req,res)=>{
    let sql = 'INSERT INTO question VALUES (null,?,?,null,now())'
    let id = req.body.id;
    let content = req.body.content;
    let params = [id, content]
    connection.query(sql, params, function(error, rows,field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.get('/api/answer/', (req,res)=>{
    connection.query('SELECT * FROM question WHERE id=?', req.query.id,  function (error, rows, fields) {
        console.log(rows.content)
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})


app.get('/api/building/:area', (req,res)=>{
    connection.query('SELECT * FROM 강남구_간단정보 WHERE 행정동_이름=?',req.params.area,function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.listen(port, ()=> console.log("서버 작동"))