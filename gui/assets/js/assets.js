
/**
 * Custom Web component
 */
class asset extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
          <a href="`+ this.getAttribute('url') + `">
            <div class="asset">
              <h2>`+ this.getAttribute('title') + `</h2>
              <time>`+ this.getAttribute('date') + `</time>` +
            ((this.getAttribute('lang') != "") ?
                (`<span id="languages">` + splitLang(this.getAttribute('lang')) + `</span>`) : ``) +
            `<img src="` + this.getAttribute('picture') + `" alt="Picture" />
              <p>`+ this.getAttribute('description') + `</p>
            </div >
        <div id="arrow">
          <span class="material-symbols-outlined">arrow_forward</span>
        </div>
          </a >
        `;
    }
    connectedCallback() {
        this.innerHTML = `
                <div class="col m-auto">
                    <div class="card bg-light border-0 mb-3">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <a class="stretched-link" href="`+ this.getAttribute('url') + `"></a>
                                <div class="card-body">
                                    <h5 class="card-title">lostsh.github.io</h5>
                                    <p class="card-text">Active vulnerabilities overview</p>
                                </div>
                                <div class="card-body">
                                    <a href="`+ this.getAttribute('url') + `" class="card-link">`+ this.getAttribute('url') + `</a>
                                    <a href="https://owasp.org/www-project-developer-guide" class="card-link">Developer
                                        Guide</a>
                                </div>
                            </div>
                            <div class="col-md-7">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">HIGH</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-danger w-25" role="progressbar"
                                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">MEDIUM</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="30"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 30%">30%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">LOW</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="45"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 45%">45%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">INFO</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-info" role="progressbar" aria-valuenow="50"
                                                aria-valuemin="0" aria-valuemax="100" style="width: 60%">60%</div>
                                        </div>
                                    </li>
                                    <li class="list-group-item d-flex flex-column bg-light border-0">
                                        <span class="badge bg-white border text-dark">HEALTHY</span>
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-sucess" role="progressbar" aria-valuenow="80"
                                                aria-valuemin="0" aria-valuemax="100" style="width: `+ this.getAttribute('url') + `%">`+ this.getAttribute('url') + `%</div>
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

customElements.define('asset', asset);