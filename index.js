const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const connectionString = "postgres://macuser@localhost/macuser";
const massiveConnect = massive.connectSync({connectionString : connectionString});
const app = express();
const port = 3000;

app.set('db' , massiveConnect);
const db = app.get('db');
console.log(db);
db.getCigar('mr T special' , function(err , results){
    console.log(results);
})
// db.insertCigar(['crane' , 'usa', 10 , 9.99], function (err , newCigar){
//   console.log(err);
//   console.log(newCigar)
// });
// db.removeCigar([4] , function (err , removedCigar){
//   console.log(err);
//   console.log(removedCigar);
// });

// db.updateCigar(3 , function (err , updated){
//   console.log(err);
//   console.log(updated);
// });

app.use(json());
app.use(cors());
app.use(session({secret : 'keyboard cat'}));


app.get('/', function (req, res){
  db.getCigar( function (err, results){
      console.log('hi');
      res.send(results)
    })
  })

app.post('/' , function (req ,res ){


  db.insertCigar([req.body.name, req.body.country, req.body.rating , req.body.price], function (err , newCigar){
    console.log(err);
    console.log(newCigar)
    if (err) return res.status(500).json(err)
    return res.status(200).json(newCigar)
  });
})
app.put('/' , function (req , res){

  db.updateCigar([req.body.price , req.body.cigarid], function (err , updated){
    console.log(err);
    console.log(updated);
    if(err){
      return res.status(500).json(err)
    }
    return res.status(200).json(updated)
  })
});
app.delete( '/api/:cigarid' , function (req ,res){

  db.removeCigar(req.params.cigarid , function (err , removedCigar){
    if(err){
      console.log(err);
      return res.status(500).json(err)
    }
    console.log(removedCigar);
    return res.status(200).json(removedCigar)
  });

})

app.listen(port , () => {
  console.log(`listenin' to prot ${port}`);
});
