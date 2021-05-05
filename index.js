var express = require('express');
const app = express();
const mysql = require('mysql');
//import routes
const authRoutes = require('./routes/cryptoResponse')

//DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cryptoDB'
});

//connect
db.connect((err)=>{
    if(err){
        throw err
    }
    console.log('MySQL connected')
});

//create DB
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS cryptoDB';
    db.query(sql, (err,result) => {
        if(err){
            throw err
        };
        console.log(result)
        res.send('database created.')
    })
})

//create Table
app.get('/createCryptoTable', (req,res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS cryptoTable(Crypto VARCHAR(10), Currency VARCHAR(10),\
        CHANGE24HOURRaw DOUBLE(22,7), CHANGEPCT24HOURRaw DOUBLE(22,7), OPEN24HOURRaw DOUBLE(22,7),\
        VOLUME24HOURRaw DOUBLE(22,7), VOLUME24HOURTORaw DOUBLE(22,7), LOW24HOURRaw DOUBLE(22,7),\
        HIGH24HOURRaw DOUBLE(22,7), PRICERaw DOUBLE(22,7), LASTUPDATERaw INT,\
        SUPPLYRaw INT, MKTCAPRaw DOUBLE(22,7), CHANGE24HOUR VARCHAR(30),\
        CHANGEPCT24HOUR VARCHAR(30), OPEN24HOUR VARCHAR(30), VOLUME24HOUR VARCHAR(30), \
        VOLUME24HOURTO VARCHAR(30), LOW24HOUR VARCHAR(30), HIGH24HOUR VARCHAR(30),\
        PRICE VARCHAR(30), FROMSYMBOL VARCHAR(30), TOSYMBOL VARCHAR(30), LASTUPDATE VARCHAR(30),\
        SUPPLY VARCHAR(30), MKTCAP VARCHAR(30), PRIMARY KEY (Crypto, Currency))'
    db.query(sql, (err,result) => {
        if(err){
            throw err
        };
        console.log(result)
        res.send('table created.')
    })
})
    
//MiddleWare
app.use(express.json());

//Routing middlewares
app.use('/service', authRoutes);

app.listen(8000,()=> console.log('up and running'));