const Express = require("express");
var session = require('express-session')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb://192.168.1.120:27017/?compressors=zlib&gssapiServiceName=mongodb";
const DATABASE_NAME = "BlogTestApp";


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("personnel");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

    app.post("/personnel", (request, response) => {
        collection.insert(request.body, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result.result);
        });
    });

    app.post("/register", (request, response) => {
        var body = {
            email = request.body.email,
            password = request.body.password
        }

        collection.findOne({ "email": new ObjectId(body.email) }, (error, result) => {
            if(error) {
                collection.insert(body, (error, result) => {
                    if(error) {
                        return response.status(500).send(error);
                    }
                    result.session.loggedinUser = true;
                    result.session.emailAddress = emailAddress;
                    response.send(result.result);
                });
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });

    router.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/login');
      });

    app.get("/personnel/:id", (request, response) => {
        collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });
});

