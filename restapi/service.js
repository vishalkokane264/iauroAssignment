const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const mysql_conn = mysql.createConnection({
    host: 'localhost',
    user: 'vishal',
    password: 'Vishal@12',
    database: 'test'
});

mysql_conn.connect();

app.get('/', function (req, res) {
    return res.send({ error: true, message: "Rest service using CRUD ops." });
});

//Retrive users by id
app.get('/user/:id', function (req, res) {

    let user_id = req.params.id;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Enter userID' });
    }

    mysql_conn.query('SELECT * FROM user where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        else {
            console.log('Retrive successful');
            return res.end(JSON.stringify(results));

        }
    });

});

//Retrive all users
app.get('/user', function (req, res) {
    mysql_conn.query('SELECT * FROM user', function (error, results, fields) {
        if (error) throw error;
        else {
            console.log('Retrive successful');
            res.end(JSON.stringify(results));
        }
    });
});


// Add a new user  
app.post('/user', function (req, res) {
    var userdata = req.body;
    //    console.log(userdata);
    if (!req.body.id) {
        return res.status(400).send({ error: true, message: 'Please enter userid' });
    }

    mysql_conn.query('INSERT INTO user SET ?', userdata, function (error, results, fields) {
        if (error) throw error;
        else {
            console.log("User added successfully");
            res.end(JSON.stringify(results));
        }
    });
});

//  Update username with id
app.put('/user', function (req, res) {

    let user_id = req.body.id;
    let name = req.body.name;
    //    console.log('my user id '+user_id+name);

    if (!user_id || !name) {
        return res.status(400).send({ error: task, message: 'Enter user id and name' });
    }

    mysql_conn.query("UPDATE user SET name = ? WHERE id = ?", [name, user_id], function (error, results, fields) {
        if (error) throw error;
        else {
            console.log('User update successfully');
            return res.send({ error: false, data: results, message: 'User updated successfully.' });
        }
    });
});


//  Delete user
app.delete('/user/:id', function (req, res) {

    let user_id = req.params.id;

    mysql_conn.query('DELETE FROM user WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        else {
            console.log('User delete successfully');
            return res.send({ error: false, data: results, message: 'User deleted successfully.' });
        }
    });
});

// All other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('Page not found');
});

//Port must be set to 8080 because incoming http request are routed from 80 to 8080

app.listen(45150, function () {

    console.log('App is running on port 45150');

});

