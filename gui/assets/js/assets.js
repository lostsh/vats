/*
    ╔═════════════════════════════╗ 
    ║   ©  BY: lostsh ᓚᘏᗢ        ║▒
    ╟─────────────────────────────╢▒
    ║                             ║▒
    ╚═════════════════════════════╝▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
*/

/**
 * Read the post index file,
 * for each post create an tile,
 * add the tile to the container
 *//*
function main() {
    fetch('assets/js/in.json')
        .then(data => {
            return data.json();
        })
        .then(json => {
            json.assets.forEach(target => {
                document.getElementById('assetList')
                    .appendChild(createAssetTile(target));
            });
        });
}
*/
function main() {
    fetch('assets/js/in.json')
        .then(data => {
            return data.json();
        })
        .then(json => {
            for(const [key, val] of Object.entries(json.assets)){
                document.getElementById('assetList')
                    .appendChild(createAssetTile(key, val));
                console.log(key);
                console.log(val);
            }
        });
}


/**
 * Create a Node of <blog-post> type frome inputed args
 * @param {*} attributes attibutes for the webcomponent
 * @returns Node element
 */
function createAssetTile(target, scans) {
    console.log("Hi now creating tiles", target, "scans are :", scans);
    var tile = document.createElement("asset-tile");
    var attributes = new Array()
    // now supposed to get statistics on each scan
    // put data into this array
    attributes["url"] = target
    attributes["high"] = "3"
    attributes["medium"] = "5"
    attributes["low"] = "8"
    attributes["info"] = "12"
    attributes["healthy"] = "7"
    attributes["total-vulns"] = "23"
    for (var attribute in attributes) {
        tile.setAttribute(attribute, attributes[attribute]);
    };
    return tile;
}

/**
 * Custom Web component
 */
class asset extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
                <div class="col m-auto">
                    <div class="card bg-light border-0 mb-3">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <a class="stretched-link" href="`+ this.getAttribute('url') + `"></a>
                                <div class="card-body">
                                    <h5 class="card-title">`+ this.getAttribute('url') + `</h5>
                                    <p class="card-text">Active vulnerabilities overview</p>
                                </div>
                                <div class="card-body">
                                    <a href="`+ this.getAttribute('url') + `" class="card-link">` + this.getAttribute('url') + `</a>
                                    <a href="https://owasp.org/www-project-developer-guide" class="card-link">Developer Guide</a>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">HIGH</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-danger" role="progressbar"
                                                aria-valuemin="0" aria-valuemax="100" style="width: `+ this.getAttribute('high') + `%">` + this.getAttribute('high') + `%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">MEDIUM</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="30"
                                                aria-valuemin="0" aria-valuemax="100" style="width: `+ this.getAttribute('medium') + `%">` + this.getAttribute('medium') + `%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">LOW</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="45"
                                                aria-valuemin="0" aria-valuemax="100" style="width: `+ this.getAttribute('low') + `%">` + this.getAttribute('low') + `%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">INFO</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-info" role="progressbar" aria-valuenow="50"
                                                aria-valuemin="0" aria-valuemax="100" style="width: `+ this.getAttribute('info') + `%">` + this.getAttribute('info') + `%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">HEALTHY</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-sucess" role="progressbar" aria-valuenow="80"
                                                aria-valuemin="0" aria-valuemax="100" style="width: `+ this.getAttribute('healthy') + `%">` + this.getAttribute('healthy') + `%</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"
                            title="total active vulnerabilities">`+ this.getAttribute('total-vulns') + `<span class="visually-hidden">total active
                                vulnerabilities</span></span>
                    </div>
                </div>
        `;
    }
}

customElements.define('asset-tile', asset);