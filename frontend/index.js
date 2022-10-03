const title = document.getElementById('title');
const pageTitle = document.getElementById('pageTitle');
const foundCount = document.getElementById('foundCount');
const remainingCount = document.getElementById('remainingCount');
const foundLog = document.getElementById('foundLog');
const info = document.getElementById('info');
const foundDucks = document.getElementById('foundDucks');
const foundDucksList = document.getElementById('foundDucksList');
const foundDucksRemainingCount = document.getElementById('foundDucksRemainingCount');

const urlParams = new URLSearchParams(location.search);

duckID = urlParams.get('id');

// call api
responseCode="";

// TODO: non-hardcoded api url
fetch('http://localhost:8080/api?id=' + duckID)
    .then(response => {
        responseCode = response.status;
        response.json().then(data => {

            console.log(data);
            console.log(data.ducks)

            if (responseCode == 200) {

                // if duck found
                if(data.duckName){
                    info.hidden=false;
                
                    //set title
                    title.innerHTML = "You found "+data.duckName+"!";
                    pageTitle.innerHTML = "You found "+data.duckName+"!";

                    //set foundCount
                    if(data.foundLog.length == 0){
                        foundCount.innerHTML = "You are the first person to find "+data.duckName+"!";
                    } else {
                        foundCount.innerHTML = data.duckName+" was found a total of " + data.foundLog.length + " times.";
                    }

                    //set remainingCount
                    remainingCount.innerHTML = "There are 100 ducks in total. Currently, " + data.ducksNotFound + " ducks have yet to be found.";

                    //set log
                    log="";
                    for (i in data.foundLog){
                        date= new Date(data.foundLog[i].date)
                        date=date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                        log += "<li>"+data.duckName+" was found at "+date+". </li>";
                    }
                    foundLog.innerHTML = log;
                }
                else if(data.ducks){
                    foundDucks.hidden=false;

                    pageTitle.innerHTML = "Found Ducks";
                    title.innerHTML = "Found Ducks";
                    foundDucksRemainingCount.innerHTML = "("+data.ducks.length+"/"+data.totalCount+") Ducks have been found.";
                    
                    foundDucksList.innerHTML=data.ducks.map(duck => `<li>${duck.name}</li>`).join('');
                }
            }
            else{
                title.innerHTML = "ERR: INVALID_DUCK";
                pageTitle.innerHTML = "ERR: INVALID_DUCK";
            }
        });
});