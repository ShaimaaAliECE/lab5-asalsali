const express = require('express');
let jobs = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))

app.use(express.static('static'));


app.get('/categoryCount', (req, res) => {
    let count = {};  //creates array for count

    for (j in jobs){
        for (c of jobs[j].categories){ //goes through each category and counts the instances in the json file
            if(c in count){
                count[c]++;
            }
            else{
                count[c] = 1;
            }
        }
    }

    res.send(JSON.stringify(count)); //creates response
})

app.get('/:category', (req, res) => {
    let Jobs = {};  //creates array for job in specfic category

    for(j in jobs){
        for(c of jobs[j].categories){
            if (req.params.category == c){   //adds job to matched category parameter
                Jobs[j] = jobs[j];
            }
        }
    }

    res.send(Jobs); //sends array of specific jobs as a response
})

app.get('/checkJobsInCity', (req,res)=> {
 
    let jobsInCity = []; //creates array for jobs in specific city

    for (let j in jobs)
    {
    
        if (jobs[j].title.includes(req.query.cityName)) //queries the job with the approproate city name
        {
            jobs.push(j);
        }      
    }
    
    res.json(
        {
            jobsInThisCity: jobsInCity 
        }
    );
});

app.listen(80); 

