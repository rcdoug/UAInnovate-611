const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("express"));

app.use(express.static('public'));
app.get('', function(req,res){
    res.sendFile(path.join(__dirname+'/public/html/applyform.html'));
  });

app.use(bodyParser.urlencoded({extended:true}));

app.post('/submit-form', (req, res) => {
    try {
      const data = fs.readFileSync('applicants.json', 'utf8');
      const jsonData = JSON.parse(data);
      jsonData.applicants.push({
        name: req.body.stdName,
      });
      fs.writeFileSync('applicants.json', JSON.stringify(jsonData, null, 2));
      res.send('Form submitted successfully!');
    } catch (error) {
      console.error('Error processing form submission:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);