/*
    ╔═════════════════════════════╗ 
    ║   ©  BY: lostsh ᓚᘏᗢ        ║▒
    ╟─────────────────────────────╢▒
    ║                             ║▒
    ╚═════════════════════════════╝▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
*/

function main(index_file) {
    console.log("Start showing !")
    var params = new URLSearchParams(document.location.search);
    var target = params.get("asset");
    console.log("Target is: ", target);

    fetch(index_file)
    .then(data => {
        return data.json();
    })
    .then(json => {
        // get scans from the current selected target
        var scans = json.assets[target];
        if(scans){
            console.log("On this target", target, ", there is those scans: ", scans);
            //TODO : not display input form user ! use only input from json files (trusted)
            document.getElementById('target-tab').innerText = target;

            // build table
            addScanColumn();
        }else{
            console.log("Target not found exception!");
        }
    });
}

function addScanColumn(){

    // for each scan unit create a new row
    fetch("assets/js/fraise.json").then(data => data.json()).then(json => createColumn(json));
}

function createColumn(scan_data){
    console.log(scan_data);
    document.querySelector('thead tr')
    .appendChild(theadRowElement(scan_data.vulnerabilities.length, scan_data.datetime));
    addRowsAndColumns(scan_data.vulnerabilities);
}

function theadRowElement(total_vuln, datetime){
    var thead = document.createElement("th");
    thead.setAttribute("scope", "col");
    thead.setAttribute("title", ("Total: "+total_vuln));
    thead.innerText = new Date(datetime).toLocaleString("en-US");
    return thead;
}

function addRowsAndColumns(vulns){
    for(var vuln of vulns){
        //create new cell for this vuln
        var cell = document.createElement('td');
        cell.innerText = vuln.criticity;
        cell.setAttribute("title", vuln.comments);

        // add vuln to table
        var rows_titles = Array.from(document.querySelectorAll('tbody tr th'));
        var row_index = rows_titles.findIndex(e => e.textContent == vuln.component);
        if(row_index > -1){
            // add current vuln to the row
            var rows = Array.from(document.querySelectorAll('tbody tr'));
            rows[row_index].appendChild(cell);
        }else{
            // create new row
            var tbody = document.querySelector('tbody');
            var row = document.createElement('tr');
            tbody.appendChild(row);
            // create row title
            var row_title = document.createElement('th');
            row_title.setAttribute('scope', 'row');
            row_title.innerText = vuln.component;
            row.appendChild(row_title);
            // fill the empty column of this component
            var total_column = document.querySelectorAll('thead th').length-2;
            for(var i=0; i<total_column; i++){
                var blank_cell = document.createElement('td');
                blank_cell.textContent = "-1";
                row.appendChild(blank_cell);
            }
            // add the criticity cell for this component
            row.appendChild(cell);
        }
    }
}