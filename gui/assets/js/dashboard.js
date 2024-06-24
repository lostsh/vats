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
    });
}

//get list of componenets on all scans
// and then for each scan put the associated criticity value, none if not present