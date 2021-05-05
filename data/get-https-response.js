const https = require('https');
const scheduler = require('../Schedule/scheduler');
const fetchDB = require('../data/fetch_DB');

async function getData(path,query) {
    let httpData = "";
    let httpResponse = {};
    let parsedResponse = {};
    let iResponse = {};
    let jResponse = {};
    let kResponse = {};
    let insertData= {};
    let timeOut = 15000;
    const options = {
        hostname: 'min-api.cryptocompare.com',
        port: 443,
        path: path,
        method: 'GET'
    }
    return new Promise((resolve) => {
        let request = https.request(options, async (res) => {
            
            httpResponse.httpCode = res.statusCode;

            res.on('data', (data) => {

                httpData += data
            });

            res.on('end', () => {
                try {
                    httpResponse.httpData = (JSON.parse(httpData));
                }
                catch (e) {
                    httpResponse.httpData = httpData;
                }
                let Data = JSON.parse(httpData);
                let array1 = (Object.keys(JSON.parse(httpData)));

                for (const i of array1) {
                    let array2 = (Object.keys(Data[i]))
                    
                    for (const j of array2) {
                        let array3 = (Object.keys(Data[i][j]))
                        

                        for (const k of array3) {
                            
                            
                            if (i === 'RAW') {
                                insertData= {};
                                insertData =
                                {
                                    CHANGE24HOUR: Data[i][j][k].CHANGE24HOUR,
                                    CHANGEPCT24HOUR: Data[i][j][k].CHANGEPCT24HOUR,
                                    OPEN24HOUR: Data[i][j][k].OPEN24HOUR,
                                    VOLUME24HOUR: Data[i][j][k].VOLUME24HOUR,
                                    VOLUME24HOURTO: Data[i][j][k].VOLUME24HOURTO,
                                    LOW24HOUR: Data[i][j][k].LOW24HOUR,
                                    HIGH24HOUR: Data[i][j][k].HIGH24HOUR,
                                    PRICE: Data[i][j][k].PRICE,
                                    LASTUPDATE: Data[i][j][k].LASTUPDATE,
                                    SUPPLY: Data[i][j][k].SUPPLY,
                                    MKTCAP: Data[i][j][k].MKTCAP
                                }
                            }
                            else if (i === 'DISPLAY') {
                                insertData= {};
                                insertData =
                                {
                                    CHANGE24HOUR: Data[i][j][k].CHANGE24HOUR,
                                    CHANGEPCT24HOUR: Data[i][j][k].CHANGEPCT24HOUR,
                                    OPEN24HOUR: Data[i][j][k].OPEN24HOUR,
                                    VOLUME24HOUR: Data[i][j][k].VOLUME24HOUR,
                                    VOLUME24HOURTO: Data[i][j][k].VOLUME24HOURTO,
                                    LOW24HOUR: Data[i][j][k].LOW24HOUR,
                                    HIGH24HOUR: Data[i][j][k].HIGH24HOUR,
                                    PRICE: Data[i][j][k].PRICE,
                                    FROMSYMBOL: Data[i][j][k].FROMSYMBOL,
                                    TOSYMBOL: Data[i][j][k].TOSYMBOL,
                                    LASTUPDATE: Data[i][j][k].LASTUPDATE,
                                    SUPPLY: Data[i][j][k].SUPPLY,
                                    MKTCAP: Data[i][j][k].MKTCAP
                                }
                            }
                            kResponse[k] = {...insertData}
                            scheduler.insert(i, j, k, insertData)
                        }
                        jResponse[j] = {...kResponse}
                    }
                    iResponse[i] = {...jResponse}

                }
                parsedResponse = iResponse
                resolve(parsedResponse);

            });
        });
        request.setTimeout(timeOut, async function () {
            
            let result = await fetchDB.fetch(query);
            resolve(result);
            
        }.bind(request));

        request.on('error', error => {
            console.error(error)
        });

        request.end()

    }).catch((err) => {
        throw err;
    });
}

module.exports = { getData };
