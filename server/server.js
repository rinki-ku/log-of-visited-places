const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;

let maps = [
    {
        "id": 1,
        "latitude": 52.500772,
        "longitude": 13.472764,
        "name": "Rummels Bucht",
        "image URL": "ABC"
    }
];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read
app.get('/maps', (req, res) => {
    res.json(maps);
});

// Create
app.post('/map', (req, res) => {
    const map = req.body;

    if (Object.keys(map).length === 0) {
        res.send('not proper data');
    } else {
        maps.push(map);
        res.send({ message: 'new map entry is added to the database' });
    }

});

// Delete
app.delete('/map/:id', (req, res) => {
    // find item from array of data
    let found = maps.find((item) => {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = maps.indexOf(found);
        maps.splice(targetIndex, 1);
        res.send({ message: 'Deleted' });
    }
});

/*
app.get('/map/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;

    // Searching maps for the isbn
    for (let map of maps) {
        if (map.ID === id) {
            console.log(newMap)
            res.json(map);
            return;
        }
    }

    // Sending 404 when not found
    res.status(404).send('map not found');
});
*/

app.post('/map/:id', (req, res) => {
    // Reading id from the URL
    const id = req.params.id;
    const newMap = req.body;

    // Remove item from the books array
    for (let i = 0; i < maps.length; i++) {
        let map = maps[i]
        if (map.ID === id) {
            maps[i] = newMap;
        }
    }

    res.send('map is edited');
});




app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));