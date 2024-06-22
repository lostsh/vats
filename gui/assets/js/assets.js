/*
    ╔═════════════════════════════╗ 
    ║   ©  BY: lostsh ᓚᘏᗢ        ║▒
    ╟─────────────────────────────╢▒
    ║                             ║▒
    ╚═════════════════════════════╝▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
*/

function main() {
    fetch('assets/js/in.json')
        .then(data => {
            return data.json();
        })
        .then(json => {
            for (const [key, val] of Object.entries(json.assets)) {
                const tileBuilder = createAssetTile(key, val);
                tileBuilder.then((tileElement) => {
                    document.getElementById('assetsList').appendChild(tileElement);
                })
            }
        });
}

/**
 * Create an asset tile reading from files
 * @param {*} target target name
 * @param {*} scans list of scans of the target
 * @returns Node element
 */
async function createAssetTile(target, scans) {
    const builder = buildAttributes(target, scans)
    return builder.then((attributes) => {
        var tile = document.createElement("asset-tile");
        for (var attribute in attributes) {
            tile.setAttribute(attribute, attributes[attribute]);
        };
        return tile;
    });
}

/**
 * Read files and compute statistics about assets for tile.
 * @returns array of attributes to build a asset tile
 */
async function buildAttributes(target, scan_units) {

    // gather all stats
    const scans = new Array();
    for (var i in scan_units) {
        console.log("Fetching infos from : ", scan_units[i]);
        scans[i] = getStats(scan_units[i].file);
    }

    return Promise.all(scans).then((attrib) => {
        console.log("Got all the stats damn !")
        console.log(attrib);
        //TODO: compute statistics about this
        return attrib[0];

        var attributes = new Array();
        attributes["url"] = target;
        attributes["high"] = "3";
        attributes["medium"] = "5";
        attributes["low"] = "8";
        attributes["info"] = "12";
        attributes["healthy"] = "7";
        return attributes;
    });
}

async function getStats(file) {
    return fetch(file)
        .then(data => {
            return data.json();
        })
        .then(json => {
            var stats = new Array();
            stats["url"] = json.target;
            stats["datetime"] = json.datetime;
            stats["high"] = 0;
            stats["medium"] = 0;
            stats["low"] = 0;
            stats["info"] = 0;
            stats["healthy"] = 0;
            stats["total-vulns"] = json.vulnerabilities.length;
            for (var vuln of json.vulnerabilities) {
                console.log(vuln.criticity);
                if (vuln.criticity <= 2) {
                    stats["healthy"] += 1
                } else if (vuln.criticity <= 4) {
                    stats["info"] += 1
                } else if (vuln.criticity <= 6) {
                    stats["low"] += 1
                } else if (vuln.criticity <= 8) {
                    stats["medium"] += 1
                } else if (vuln.criticity <= 10) {
                    stats["high"] += 1
                }
            }
            stats["high"] = (stats["high"]*100)/stats["total-vulns"];
            stats["medium"] = (stats["medium"]*100)/stats["total-vulns"];
            stats["low"] = (stats["low"]*100)/stats["total-vulns"];
            stats["info"] = (stats["info"]*100)/stats["total-vulns"];
            stats["healthy"] = (stats["healthy"]*100)/stats["total-vulns"];
            return stats
        });
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