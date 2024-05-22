const express = require('express');
const app = express()
const bodyParser = require('body-parser')

const PORT = 3001;

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))



const getAllFlightsFromMySQL = () => {
    // DUMMY
    const flights = [
        { airlineName: 'El Al', destination: 'Israel', arrivalTime: '10:00' },
        { airlineName: 'WizzAir', destination: 'NY', arrivalTime: '11:00' },
        { airlineName: 'Lufthansa', destination: 'Dubai', arrivalTime: '13:00' }
    ]
    return flights
}


app.get('/', (req, res) => {
    const flights = getAllFlightsFromMySQL();
    res.render('index.ejs', { flights })
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    console.log(req.body)
    const formData = req.body
    const validData = true; //This is we should check in database 
    if (!validData) {
        res.render('register.ejs', {message: `The user ${req.body.name} is already exist` , formData})
    } else {
        res.redirect('/')
    }
})

app.get('/api/flights', (req, res) => {
    res.json(flights)
})

app.post('/', (req, res) => {
    console.log('hello from express post')
    res.send('hello from express post')
})

app.delete('/', (req, res) => {
    console.log('hello from express delete')
    res.send('hello from express delete')
})


app.listen(PORT, () => {
    `express server is running on port ${PORT}`
})