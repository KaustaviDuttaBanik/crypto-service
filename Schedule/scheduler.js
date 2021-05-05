const schedule = require('node-schedule');
const mysql = require('mysql');


async function insert(i, j, k, data) {
    //DB connection
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cryptoDB'
    });

    //connect
    db.connect((err) => {
        if (err) {
            throw err
        }
    });
    //schedule job after two seconds
    var date = new Date();
    var seconds = date.getTime() + (2 * 1000);
    date = new Date(seconds);

    //Schedule to insert after 2 seconds of current timestamp
    schedule.scheduleJob(date, function () {

        let fields = [j, k]
        let sqlSelect = 'SELECT COUNT(*) AS COUNT FROM cryptoTable WHERE Crypto = ? AND Currency = ?'
        db.query(sqlSelect, fields, (err, result) => {
            if (err) {
                throw err
            };
            if ((result[0].COUNT) === 0) {
                if (i === 'RAW') {
                    let post = {
                        Crypto: j, Currency: k, CHANGE24HOURRaw: data.CHANGE24HOUR, CHANGEPCT24HOURRaw: data.CHANGEPCT24HOUR,
                        OPEN24HOURRaw: data.OPEN24HOUR, VOLUME24HOURRaw: data.VOLUME24HOUR, VOLUME24HOURTORaw: data.VOLUME24HOURTO,
                        LOW24HOURRaw: data.LOW24HOUR, HIGH24HOURRaw: data.HIGH24HOUR, PRICERaw: data.PRICE, LASTUPDATERaw: data.LASTUPDATE, SUPPLYRaw: data.SUPPLY, MKTCAPRaw: data.MKTCAP
                    }
                    let sql = 'INSERT INTO cryptoTable SET ? '
                    db.query(sql, post, (err, result) => {
                        if (err) {
                            throw err
                        };

                    })
                } else if (i === 'DISPLAY') {
                    let post = {
                        Crypto: j, Currency: k, CHANGE24HOURRaw: data.CHANGE24HOUR, CHANGEPCT24HOURRaw: data.CHANGEPCT24HOUR,
                        OPEN24HOURRaw: data.OPEN24HOUR, VOLUME24HOURRaw: data.VOLUME24HOUR, VOLUME24HOURTORaw: data.VOLUME24HOURTO,
                        LOW24HOURRaw: data.LOW24HOUR, HIGH24HOURRaw: data.HIGH24HOUR, PRICERaw: data.PRICE,
                        FROMSYMBOL: data.FROMSYMBOL, TOSYMBOL: data.TOSYMBOL,
                        LASTUPDATERaw: data.LASTUPDATE, SUPPLYRaw: data.SUPPLY, MKTCAPRaw: data.MKTCAP
                    }
                    let sql = 'INSERT INTO cryptoTable SET ?'
                    db.query(sql, post, (err, result) => {
                        if (err) {
                            throw err
                        };

                    })
                }
            } else if ((result[0].COUNT) !== 0) {
                if (i === 'RAW') {
                    let post = [
                        data.CHANGE24HOUR, data.CHANGEPCT24HOUR,
                        data.OPEN24HOUR, data.VOLUME24HOUR, data.VOLUME24HOURTO,
                        data.LOW24HOUR, data.HIGH24HOUR, data.PRICE, data.LASTUPDATE, data.SUPPLY, data.MKTCAP, j, k
                    ]
                    let sql = 'UPDATE cryptoTable SET CHANGE24HOURRaw = ?, CHANGEPCT24HOURRaw = ?,\
                        OPEN24HOURRaw = ?, VOLUME24HOURRaw = ?, VOLUME24HOURTORaw = ?,\
                        LOW24HOURRaw = ?, HIGH24HOURRaw = ?, PRICERaw = ?, \
                        LASTUPDATERaw = ?, SUPPLYRaw = ?, MKTCAPRaw = ? WHERE Crypto = ? AND Currency = ?'
                    db.query(sql, post, (err, result) => {
                        if (err) {
                            throw err
                        };

                    })
                } else if (i === 'DISPLAY') {
                    let post = [
                        data.CHANGE24HOUR, data.CHANGEPCT24HOUR,
                        data.OPEN24HOUR, data.VOLUME24HOUR, data.VOLUME24HOURTO,
                        data.LOW24HOUR, data.HIGH24HOUR, data.PRICE, data.FROMSYMBOL, data.TOSYMBOL,
                        data.LASTUPDATE, data.SUPPLY, data.MKTCAP, j, k
                    ]
                    let sql = 'UPDATE cryptoTable SET CHANGE24HOUR = ?, CHANGEPCT24HOUR = ?,\
                        OPEN24HOUR = ?, VOLUME24HOUR = ?, VOLUME24HOURTO = ?,\
                        LOW24HOUR = ?, HIGH24HOUR = ?, PRICE = ?, FROMSYMBOL = ?, TOSYMBOL = ?,\
                        LASTUPDATE = ?, SUPPLY= ?, MKTCAP = ? WHERE Crypto = ? AND Currency = ?'
                    db.query(sql, post, (err, result) => {
                        if (err) {
                            throw err
                        };


                    })
                }
            }
        })

    })
}

module.exports = { insert };