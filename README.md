# crypto_service
A service that collect data from cryptocompare.com using its API and stores it in a database (MySQL)

1. Endpoint for database creation: http://localhost:8000/createdb (GET)
This will create a new database named as cryptoDB

2. Endpoint for table creation: http://localhost:8000/createCryptoTable (GET)
This will create a new table named cryptoTable

3. Endpoint for getting data: http://localhost:8000/service/price?fsyms=BTC,LINK&tsyms=USD,EUR (GET)

 a) This link is configurable according to the required fsyms and tsyms. 
 b) This will give you real-time data. 
 c) If for some reason cryptocompare.com is not available, it will fetch data from database after 15 seconds of no response. 
 d) Also, when it fetches data from cryptocompare.com, the database gets automatically updated or new record gets inserted. This happens with the help of a "scheduler" which inserts or updates data after 5 seconds of when the insert/update function is triggered

# improvizations that can be done on this service
   
While I have tried to keep this application as simple as possible, this application can be improvized to automatically update the database at a scheduled time by using the recurrent functionality of the scheduler. 