import * as fs from 'fs';
export function getValues(){

    // Read the contents of the JSON file
    const data = fs.readFileSync('applicants.json');
    // Parse the JSON data into a JavaScript object
    const jsonData = JSON.parse(data);
    
    console.log("Before Adding data",JSON.stringify(jsonData, null, 4));
    
    // Modify the JavaScript object by adding new data
    jsonData.applicants.push({
        name: "Questing",
        email: "james.den@example.com"
    });
    
    
    // Convert the JavaScript object back into a JSON string
    const jsonString = JSON.stringify(jsonData);
    
    fs.writeFileSync('applicants.json', jsonString, 'utf-8', (err) => {
      if (err) throw err;
      console.log('Data added to file');
    });
    
    const update_data = fs.readFileSync('applicants.json');
    const updated_jsonData = JSON.parse(update_data);
    console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4));
    }

export default getValues;    
    