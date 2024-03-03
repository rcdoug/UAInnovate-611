const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');
const fs = require('fs');
const assert = require('assert');

const uri = "mongodb+srv://UAInnovate611:badpassword@cluster0.lsnt06v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(uri);

async function main() {
    await client.connect();
    const db = client.db("CGI"); 
    var bucket = new mongodb.GridFSBucket(db, {bucketName: "Resumes"});
    const Resumes = db.collection("Resumes.files");
    
    await uploadResume(bucket, "Resume.docx", "rowan@romanauskas.com");
    //await bucket.openDownloadStreamByName("Resume.docx").pipe(fs.createWriteStream('./outputFile.docx'));

    await downloadResume2(bucket);
    //downloadResume(bucket, "rowan@romanauskas.com");


    
    await addApplicant(client, 
        {
            name: stdName,
            grad: "2026",
            officeLoc: "Alabama",
            email: "rowan@romanauskas.com",
            phone: "603-852-9639",
            LinkedIn: "RowanRoman",
            progress: "Complete",
            feedback: "good",
            gauge: true
        })

    await client.close();
}
async function getValues(){
    var stdName = document.getElementById("stdName").value;
    
}
async function addApplicant(client, newApplicant){
    const result = await client.db("CGI").collection("Applicants").insertOne(newApplicant);
    console.log('New applicant created with the following id:' + result.insertedId);
}

async function uploadResume(bucket, fileName, email){
    fs.createReadStream('./' + fileName).pipe(bucket.openUploadStream(fileName, {
        chunkSizeBytes: 1048576,
        metadata: {email: email}
    }));
}
async function downloadResume2(bucket){
    await client.connect();
    const db = client.db("CGI");
    await bucket.openDownloadStreamByName("Resume.docx").pipe(fs.createWriteStream('./outputFile.docx'));
}

async function downloadResume(bucket, userEmail){
    const cursor = await bucket.find({});
    for await (const doc of cursor){
        if(doc.metadata.email == userEmail)
            console.log(doc.filename)
            bucket.openDownloadStreamByName(doc.filename).pipe(fs.createWriteStream('./outputFile.docx'));
            console.log("here");
    }
}
main().catch(console.error);

