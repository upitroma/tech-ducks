const title = document.getElementById('title');
const pageTitle = document.getElementById('pageTitle');
const desc = document.getElementById('desc');
const foundLog = document.getElementById('foundLog');
const info = document.getElementById('info');

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

            if (responseCode == 200) {
                info.hidden=false;
            
                //set title
                title.innerHTML = "You found "+data.duckName+"!";
                pageTitle.innerHTML = "You found "+data.duckName+"!";

                //set description
                if(data.foundLog.length == 0){
                    desc.innerHTML = "You are the first person to find "+data.duckName+"!";
                } else {
                    desc.innerHTML = data.duckName+" was found a total of " + data.foundLog.length + " times.";
                }

                //set log
                log="";
                for (i in data.foundLog){
                    date= new Date(data.foundLog[i].date)
                    date=date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                    log += "<li>"+data.duckName+" was found at "+date+". </li>";
                }
                foundLog.innerHTML = log;
            }
            else{
                title.innerHTML = "ERR: INVALID_DUCK";
                pageTitle.innerHTML = "ERR: INVALID_DUCK";
            }
        });
});