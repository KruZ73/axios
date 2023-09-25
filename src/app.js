const axios = require('axios');
const express = require('express');
const app = express();


async function fetchCurrencyRates() {
    try {
        const response = await axios.get('https://api.nbp.pl/api/exchangerates/tables/a?format=json');
        const data = response.data[0].rates;
    
        const usdRate = data.find(rate => rate.code === 'USD');
        const euroRate = data.find(rate => rate.code === 'EUR');
        const gbpRate = data.find(rate => rate.code === 'GBP');

        
        console.log(`Dolar amerykański (USD): ${usdRate.mid} PLN`);
        console.log(`Euro (EUR): ${euroRate.mid} PLN`);
        console.log(`Funt szterling (GBP): ${gbpRate.mid} PLN`);


        app.get('/dolar', (req, res) => {
            res.json(usdRate.mid);
        });

        app.get('/euro', (req, res) => {
            res.json(euroRate.mid);
        });

        app.get('/funt', (req, res) => {
            res.json(gbpRate.mid);
        });
        

        const port = 1000;
        app.listen(port, () => {});
        
    }
    catch (error) {
        console.error('Wystąpił błąd podczas pobierania danych:', error.message);
    }
}
fetchCurrencyRates();