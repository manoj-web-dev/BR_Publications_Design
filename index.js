// function loadComponent(targetId, path) {
//   fetch(path)
//     .then(res => res.text())
//     .then(html => document.getElementById(targetId).innerHTML = html);
// }

// // Make loadPage GLOBAL
// window.loadPage = function(pageName) {
//   loadComponent('main-content', `components/${pageName}/${pageName}.html`);
// };

// // Load the static parts
// loadComponent('header', 'components/dashboard-components/dashboard-components.html');
// loadComponent('footer', 'components/footer-components/footer-components.html');

// // Default landing page
// window.loadPage('home-components');


// Load dashboard once
loadDashboard();

async function loadDashboard() {
    const base = "components/dashboard-components/dashboard-components";

    // Load dashboard HTML
    const html = await fetch(base + ".html").then(r => r.text());
    document.getElementById("dashboard").innerHTML = html;

    // Load dashboard CSS
    loadCSS(base + ".css", "dashboard-style");

    // Load dashboard JS
    loadScript(base + ".js", "dashboard-script");

    // Load default page
    loadPage("home-components");
}

// ---------------------------
// CORE FUNCTION: LOAD PAGE
// ---------------------------
window.loadPage = async function (pageName, sectionId = null) {

    const base = `components/${pageName}/${pageName}`;

    // 1. Load main page HTML
    const html = await fetch(base + ".html").then(r => r.text());
    document.getElementById("main-content").innerHTML = html;

    // 2. Remove old page CSS then load new CSS
    removeByAttr("data-page-style");
    loadCSS(base + ".css", "page-style", true);

    // 3. Remove old page JS then load new JS
    removeByAttr("data-page-script");
    loadScript(base + ".js", "page-script", true);

    // 3️⃣ Initialize tabs AFTER HTML exists
    initTabs();

    // SCROLL TO SECTION
    if (sectionId) {
        // Wait a short time to ensure DOM is updated
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 150);
    }
};

// ---------------------------
// UTILITY: Load CSS file
// ---------------------------
function loadCSS(href, attrName, isPage = false) {
    fetch(href).then(res => {
        if (res.status === 200) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            link.setAttribute("data-" + attrName, "1");
            document.head.appendChild(link);
        }
    });
}

// ---------------------------
// UTILITY: Load JS file
// ---------------------------
// function loadScript(src, attrName, isPage = false) {
//     fetch(src).then(res => {
//         if (res.status === 200) {
//             const script = document.createElement("script");
//             script.src = src;
//             script.setAttribute("data-" + attrName, "1");
//             document.body.appendChild(script);
//         }
//     });
// }

function loadScript(src, attrName, isPage = false, callback = null) {
    fetch(src).then(res => {
        if (res.status === 200) {
            const script = document.createElement("script");
            script.src = src;
            script.setAttribute("data-" + attrName, "1");

            script.onload = () => {
                if (callback) callback();
            };

            document.body.appendChild(script);
        }
    });
}

// ---------------------------
// UTILITY: Remove old CSS/JS
// ---------------------------
function removeByAttr(attr) {
    document.querySelectorAll("[" + attr + "]").forEach(el => el.remove());
}

// After main HTML is inserted
function initTabs() {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all buttons and contents
            buttons.forEach(b => b.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // Activate clicked button and corresponding content
            btn.classList.add("active");
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add("active");

            // Optional: scroll tabs into view
            const tabsContainer = document.querySelector(".tabs-container");
            if (tabsContainer) {
                tabsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

