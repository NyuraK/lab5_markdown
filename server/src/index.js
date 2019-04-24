const config = require('./config/config')
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/vuenodedb").then(
//     () => {console.log('Database connection is successful') },
//     err => { console.log('Error when connecting to the database'+ err)}
// );

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(config.dbURL, config.dbOptions);
mongoose.connection
    .once('open', () => {
        console.log(`Mongoose - successful connection ...`);
        app.listen(process.env.PORT || config.port,
            () => console.log(`Server start on port ${config.port} ...`))
    })
    .on('error', error => console.warn(error));

app.get('/posts', (req, res) => {
    res.send(
        [{
            title: "Hello World!",
            description: "Hi there! How are you?"
        }]
    )
});
