// Copy+paste into browser console to initialize the mParticle SDK and load testing functions

// Initialize SDK
var githubUrl = 'https://raw.githubusercontent.com/cqvo/gfm-mparticle-testing/main/gfm-mparticle.js';
fetch(githubUrl)
    .then(response => response.text())
    .then(scriptText => {
        const script = document.createElement('script');
        script.text = scriptText;
        document.head.appendChild(script);
    })
    .catch(error => console.error('Error fetching script:', error));

// Load testing functions
var githubUrl = 'https://raw.githubusercontent.com/cqvo/gfm-mparticle-testing/main/mp-test-funcs.js';
fetch(githubUrl)
    .then(response => response.text())
    .then(scriptText => {
        const script = document.createElement('script');
        script.text = scriptText;
        document.head.appendChild(script);
    })
    .catch(error => console.error('Error fetching script:', error));
