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
app.use(express.static('html'));

app.get('', function(req,res){
    res.sendFile(path.join(__dirname, "html", "index.html"));
  });

app.use(bodyParser.urlencoded({extended:true}));

app.post('/submit-form', (req, res) => {
    try {
      const data = fs.readFileSync('applicants.json', 'utf8');
      const jsonData = JSON.parse(data);
      jsonData.applicants.push({
        name: req.body.stdName,
        email: req.body.stdEmail,
        date: req.body.stdDate,
        location: req.body.question,
        phone: req.body.stdPhone,
        school: req.body.stdScool,
        role: req.body.stdRole,
        LinkedIn: req.body.stdLinkedIn,
        resume: req.body.stdResume,
        progress: "N/A",
        gauge: "N/A",
        feedback: "N/A"
      });
      fs.writeFileSync('applicants.json', JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.error('Error processing form submission:', error);
    }
  });

  app.post('/submit-form-hr', (req, res) => {
    try {
      const data = fs.readFileSync('applicants.json', 'utf8');
      const jsonData = JSON.parse(data);
      jsonData.applicants.push({
        name: req.body.stdName,
        email: req.body.stdEmail,
        date: req.body.stdDate,
        location: req.body.question,
        phone: req.body.stdPhone,
        school: req.body.stdScool,
        role: req.body.stdRole,
        LinkedIn: req.body.stdLinkedIn,
        resume: req.body.stdResume,
        progress: "N/A",
        gauge: "N/A",
        feedback: "N/A"
      });
      fs.writeFileSync('applicants.json', JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.error('Error processing form submission:', error);
    }
  });

  app.post('/search-form', (req,res) => {

  })

  app.post('/edit-form', (req,res) => {
    try{
      const data = fs.readFileSync('applicants.json', 'utf8');
      const jsonData = JSON.parse(data);
      const applicantEmail = req.body.searchVal;
      const applicant = jsonData.applicants.find(applicant => applicant.email == applicantEmail);
      if(applicant) {
        applicant.name = req.body.stdName;
        applicant.email = req.body.stdEmail;
        applicant.date = req.body.stdDate;
        applicant.location = req.body.question;
        applicant.phone = req.body.stdPhone;
        applicant.school = req.body.stdScool;
        applicant.role = req.body.stdRole;
        applicant.LinkedIn = req.body.stdLinkedIn;
        applicant.progress = req.body.stdProgress;
        applicant.gauge = req.body.stdGauge;
        applicant.feedback = req.body.stdFeedback;

        fs.writeFileSync('applicants.json', JSON.stringify(jsonData,null, 2));
      }
    } catch(error){
      console.error("Error editing applicant: ", error);
    }
  });
  
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);