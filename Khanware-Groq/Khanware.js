
/* Khanware Groq - Startup Fix */
const ver = "V3.11.0";
let isDev = false;
let repoPath = "";

const GITHUB_REPO = "QuozzThien/K-NEW";
const BRANCH = isDev ? "dev" : "main";
const BASE_PATH = "Khanware-Groq/";

const availableCDNs = [
  `https://cdn.jsdelivr.net/gh/${GITHUB_REPO}@${BRANCH}/${BASE_PATH}`,
  `https://raw.githubusercontent.com/${GITHUB_REPO}/${BRANCH}/${BASE_PATH}`
];

const device = {
  mobile: /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent),
  apple: /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent),
  language: navigator.language.split("-")[0]
};

let user = {
  username: "Guest",
  nickname: "Guest",
  UID: 0
};

let loadedPlugins = [];
let translations = {};
let KWSection;

const dropdownMenu = document.createElement("dropDownMenu");
const watermark = document.createElement("watermark");
const statsPanel = document.createElement("statsPanel");
const splashScreen = document.createElement("splashScreen");

window.features = {
  customBanner: false,
  rgbLogo: false
};

window.featureConfigs = {
  customUsername: "",
  customPfp: "",
  groqKey: ""
};

window.debug = (...args) => console.debug("[Khanware]", ...args);

function t(key) {
  return translations[device.language]?.[key]
    || translations.en?.[key]
    || key;
}

const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

function playAudio(url) {
  const audio = new Audio(url);
  audio.play().catch(() => {});
}

function findAndClickBySelector(selector) {
  const element = document.querySelector(selector);
  if (element) element.click();
}

function sendToast(message, duration = 5000) {
  if (typeof Toastify === "function") {
    Toastify({
      text: message,
      duration,
      gravity: "bottom",
      position: "center",
      style: { background: "#222" }
    }).showToast();
  } else {
    console.info("[Khanware]", message);
  }
}

function showSplashScreen() {
  splashScreen.style.cssText = `
    position:fixed;
    inset:0;
    z-index:2147483647;
    background:#000;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font:30px Arial,sans-serif;
    transition:opacity .3s;
  `;

  splashScreen.innerHTML =
    '<span>KHANWARE</span><span style="color:#72ff72">.SPACE</span>';

  document.body.appendChild(splashScreen);
}

function hideSplashScreen() {
  splashScreen.remove();
}

async function fetchWithTimeout(url, timeout = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }

    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function loadScript(url, label) {
  const response = await fetchWithTimeout(url);
  const script = await response.text();

  if (!script.trim()) {
    throw new Error(`File rỗng: ${label}`);
  }

  // Chỉ tải mã từ nguồn bạn tin cậy.
  eval(script);

  loadedPlugins.push(label);
  console.info("[Khanware] Loaded:", label);
}

async function loadCss(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;

    const timer = setTimeout(() => {
      link.remove();
      reject(new Error(`CSS timeout: ${url}`));
    }, 10000);

    link.onload = () => {
      clearTimeout(timer);
      resolve();
    };

    link.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`CSS failed: ${url}`));
    };

    document.head.appendChild(link);
  });
}

async function initializeRepoPath() {
  for (const cdn of availableCDNs) {
    try {
      const response = await fetchWithTimeout(
        cdn + "utils/langs.json",
        8000
      );

      translations = await response.json();
      repoPath = cdn;

      console.info("[Khanware] CDN:", repoPath);
      return;
    } catch (error) {
      console.warn("[Khanware] CDN unavailable:", error);
    }
  }

  throw new Error("Không tìm thấy module trên GitHub.");
}

async function loadOptional(url, label) {
  try {
    await loadScript(url, label);
    return true;
  } catch (error) {
    console.warn(`[Khanware] ${label} failed:`, error);
    return false;
  }
}

async function setupMenu() {
  const modules = [
    ["visuals/mainMenu.js", "mainMenu"],
    ["visuals/statusPanel.js", "statusPanel"],
    ["visuals/donationOverlay.js", "donationOverlay"],
    ["visuals/viewCounter.js", "viewCounter"],
    ["visuals/tweaksTab.js", "tweaksTab"]
  ];

  for (const [path, label] of modules) {
    await loadOptional(repoPath + path, label);
  }
}

async function setupVisuals() {
  const modules = [
    ["functions/rgbLogo.js", "rgbLogo"],
    ["functions/customBanner.js", "customBanner"]
  ];

  for (const [path, label] of modules) {
    await loadOptional(repoPath + path, label);
  }
}

async function boot() {
  const watchdog = setTimeout(() => {
    hideSplashScreen();
    console.error("[Khanware] Startup timeout");
  }, 20000);

  try {
    showSplashScreen();

    await initializeRepoPath();

    await loadOptional(
      repoPath + "utils/utils.js",
      "utils"
    );

    await loadOptional(
      "https://cdn.jsdelivr.net/npm/toastify-js",
      "toastify"
    );

    try {
      await loadCss(
        "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
      );
    } catch (error) {
      console.warn("[Khanware] CSS:", error);
    }

    await setupMenu();
    await setupVisuals();

    sendToast("Khanware đã hoàn tất quá trình tải giao diện.");
    console.info("[Khanware] Startup completed");

  } catch (error) {
    console.error("[Khanware] Startup failed:", error);

    alert(
      "Khanware gặp lỗi:\n\n" +
      (error.message || String(error))
    );
  } finally {
    clearTimeout(watchdog);
    hideSplashScreen();
  }
}

boot();
