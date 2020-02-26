const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyparser.urlencoded({extended: false}));

// api token pk_e270e0276ce447c38bbaa0d3bb6c2514
function call_api(callback,ticker){
    request(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_e270e0276ce447c38bbaa0d3bb6c2514`, { json: true }, (err, res, body)=>{
    if (err) { return console.log(err)};
    if(res.statusCode === 200){
       callback(body);
    }
});
}

app.get('/', (req,res) => {
    call_api((result) => {
        res.render('home',{
            stock: result
        });
    }, 'fb');
});

app.post('/', (req,res) => {
    const ticker = posted_stuf = req.body.stock_ticker;
    call_api((result) => {
        res.render('home',{
            stock: result,
        });
    }, ticker);
});

app.get('/about', (req,res) => {
    res.render('about');
});


app.use(express.static(path.join(__dirname, 'views')));

app.listen(PORT, () => console.log('Server listening on port: ' + PORT))