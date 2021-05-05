const mysql = require('sync-mysql');


async function fetch(query) {

    let Response = {
        RAW: {},
        DISPLAY: {}
    };
    var iResponse = {};
    var jResponse = {};
    var iResponseDisplay = {};
    var jResponseDisplay = {};
    let RAW = {};
    let DISPLAY = {};

    //DB connection
    const connection = new mysql({
        host: 'localhost',
        user: 'root',
        database: 'cryptoDB'
    });


    let fsyms = [], tsyms = []

    if (query.fsyms.includes(',')) {
        fsyms = query.fsyms.split(',')
    } else {
        fsyms.push(query.fsyms)
    };

    if (query.tsyms.includes(',')) {
        tsyms = query.tsyms.split(',')
    } else {
        tsyms.push(query.tsyms)
    }
    return new Promise((resolve) => {
        try {
            for (const i of fsyms) {
                for (const j of tsyms) {

                    let fields = [i, j]
                    let sqlSelect = 'SELECT * FROM cryptoTable WHERE Crypto = ? AND Currency = ?'

                    //connect
                    let result = connection.query(sqlSelect, fields)


                    RAW = {
                        CHANGE24HOUR: result[0].CHANGE24HOURRaw,
                        CHANGEPCT24HOUR: result[0].CHANGEPCT24HOURRaw,
                        OPEN24HOUR: result[0].OPEN24HOURRaw,
                        VOLUME24HOUR: result[0].VOLUME24HOURRaw,
                        VOLUME24HOURTO: result[0].VOLUME24HOURTORaw,
                        LOW24HOUR: result[0].LOW24HOURRaw,
                        HIGH24HOUR: result[0].HIGH24HOURRaw,
                        PRICE: result[0].PRICERaw,
                        LASTUPDATE: result[0].LASTUPDATERaw,
                        SUPPLY: result[0].SUPPLYRaw,
                        MKTCAP: result[0].MKTCAPRaw
                    }
                    DISPLAY = {
                        CHANGE24HOUR: result[0].CHANGE24HOUR,
                        CHANGEPCT24HOUR: result[0].CHANGEPCT24HOUR,
                        OPEN24HOUR: result[0].OPEN24HOUR,
                        VOLUME24HOUR: result[0].VOLUME24HOUR,
                        VOLUME24HOURTO: result[0].VOLUME24HOURTO,
                        LOW24HOUR: result[0].LOW24HOUR,
                        HIGH24HOUR: result[0].HIGH24HOUR,
                        PRICE: result[0].PRICE,
                        FROMSYMBOL: result[0].FROMSYMBOL,
                        TOSYMBOL: result[0].TOSYMBOL,
                        LASTUPDATE: result[0].LASTUPDATE,
                        SUPPLY: result[0].SUPPLY,
                        MKTCAP: result[0].MKTCAP
                    }
                    jResponse[j] = { ...RAW }
                    jResponseDisplay[j] = { ...DISPLAY }


                }

                iResponse[i] = { ...jResponse }
                iResponseDisplay[i] = { ...jResponseDisplay }

            }
            Response.RAW = { ...iResponse };
            Response.DISPLAY = { ...iResponseDisplay };

            resolve(Response);
        } catch (err) {
            resolve("Please enter valid crypto/currency")
        }
    });

}

module.exports = { fetch };