const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://UAInnovate611:b@dp@ssword@cluster0.lsnt06v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
    const client = new MongoClient(uri);

    await client.connect();

    await createListing(client, 
        {
            name: "Rowan Romanauskas",
            grad: "2026",
            officeLoc: "Alabama",
            email: "rowan@romanauskas.com",
            phone: "603-852-9639",
            LinkedIn: "RowanRoman",
            progress: "Complete",
            feedback: "good",
            gauage: true
        })

}

async function addApplicant(client, newApplicant){
    const result = await client.db("CGI").collection("Applicants").insertOne(newApplicant);
    console.log('New applicant created with the following id: ${result.insertedId}');
}
main.catch(console.error);

