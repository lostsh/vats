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
            buildTable(scans);
        }else{
            console.log("Target not found exception!");
        }
    });
}

/**
 * For each scan unit, create a new column.
 * (eventually new row when needed)
 * @param {Array} scan_units list of scans files on the current target
 */
function buildTable(scan_units){
    console.log("There is actually", scan_units.length, "scans\n\nScans: ", scan_units)
    // for each scan unit create a new column
    for(var unit of scan_units){
        console.log("-> New Column for: ", unit)
        fetch(unit.file).then(data => data.json()).then(json => createColumn(json));
    }
}

/**
 * Create new Column for given the given scan.
 * (eventially create new row if needed)
 * @param {Object} scan_data content of a scan result
 */
function createColumn(scan_data){
    console.log("\t=> Now creating column", scan_data);
    document.querySelector('thead tr')
    .appendChild(theadRowElement(scan_data.vulnerabilities.length, scan_data.datetime));
    // create new row or add vulns to existing ones
    fillTableOrAddRow(scan_data.vulnerabilities);
}

/**
 * Create a table head node element.
 * @param {Int} total_vuln number of vuln in the scan
 * @param {String} datetime datetime of scan 
 * @returns 
 */
function theadRowElement(total_vuln, datetime){
    var thead = document.createElement("th");
    thead.setAttribute("scope", "col");
    thead.setAttribute("title", ("Total: "+total_vuln));
    thead.innerText = new Date(datetime).toLocaleString("en-US");
    return thead;
}

/**
 * Add criticity to current column for the right component.
 * If the component is not in the table, create a new row, 
 * and fill the row.
 * @param {Array} vulns List of the vuln in the current scan. 
 */
function fillTableOrAddRow(vulns){
    for(var vuln of vulns){
        //create new cell for this vuln
        var cell = document.createElement('td');
        cell.innerText = vuln.criticity;
        cell.setAttribute("title", vuln.comments);

        // add vuln to table
        var total_column = document.querySelectorAll('thead th').length-1;
        var rows_titles = Array.from(document.querySelectorAll('tbody tr th'));
        var row_index = rows_titles.findIndex(e => e.textContent == vuln.component);
        if(row_index > -1){
            var rows = Array.from(document.querySelectorAll('tbody tr'));
            // when vuln already in tab, just keep the highest criticity
            var total_entry_current_row = rows[row_index].childNodes.length-1;
            if(total_entry_current_row >= total_column){
                var current_vuln_cell = rows[row_index].childNodes[total_entry_current_row];
                var current_criticity = parseInt(current_vuln_cell.textContent);
                // update current value in cell if criticity inferior to current
                if(current_criticity < vuln.criticity){
                    current_vuln_cell.innerText = vuln.criticity;
                }
            }else{
                // add current vuln to the row
                rows[row_index].appendChild(cell);
            }
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
            
            for(var i=0; i<total_column-1; i++){
                var blank_cell = document.createElement('td');
                blank_cell.textContent = "-1";
                row.appendChild(blank_cell);
            }
            // add the criticity cell for this component
            row.appendChild(cell);
        }
    }
}