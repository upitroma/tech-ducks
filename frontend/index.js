const title = document.getElementById('title');
    const foundLog = document.getElementById('foundLog');

    const urlParams = new URLSearchParams(location.search);

    duckID = urlParams.get('id');

    // call api on port 8080
    fetch('http://localhost:8080/api?id=' + duckID)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            title.innerHTML = data.duckName;
            log="";
            for (i in data.foundLog){
                date= new Date(data.foundLog[i].date)
                date=date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
                log += "<li>" + date + "</li>";
            }
            foundLog.innerHTML = log;
    });