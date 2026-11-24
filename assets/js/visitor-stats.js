(function () {
  "use strict";

  var script = document.currentScript;
  if (!script) return;

  var storageKey = "zishuai-visitor-stats-excluded";
  var excluded = false;
  var storageAvailable = true;
  var controls = document.getElementById("visitor-statistics-controls");
  var settingsStatus = document.getElementById("visitor-settings-status");
  var footerStatus = document.getElementById("visitor-stats-status");
  var countContainer = document.getElementById("visitor-stats-count");
  var countValue = document.getElementById("visitor-stats-total");
  var excludeButton = document.getElementById("visitor-stats-exclude");
  var includeButton = document.getElementById("visitor-stats-include");

  function setStatus(message) {
    if (footerStatus) footerStatus.textContent = message;
  }

  function renderPreference() {
    if (settingsStatus) {
      settingsStatus.textContent = !storageAvailable
        ? "The browser preference could not be read or saved. Visits from this page are not counted. Allow website storage and try again before visiting other pages."
        : excluded
          ? "This browser is excluded. Your visits will not be counted."
          : "This browser is included. Choose Exclude this browser to stop counting your own visits.";
    }
    if (excludeButton) excludeButton.disabled = storageAvailable && excluded;
    if (includeButton) includeButton.disabled = storageAvailable && !excluded;
  }

  function savePreference(value) {
    try {
      window.localStorage.setItem(storageKey, value ? "1" : "0");
      if (window.localStorage.getItem(storageKey) !== (value ? "1" : "0")) {
        throw new Error("Preference was not saved");
      }
      excluded = value;
      storageAvailable = true;
    } catch (error) {
      storageAvailable = false;
    }
    renderPreference();
    setStatus(storageAvailable ? (excluded ? "This browser is excluded." : "This settings page is not counted.") : "Statistics paused: browser storage unavailable.");
  }

  try {
    excluded = window.localStorage.getItem(storageKey) === "1";
  } catch (error) {
    // Do not submit a visit if we cannot check the exclusion preference.
    storageAvailable = false;
  }

  if (controls && window.location.hash === "#exclude") {
    savePreference(true);
  }
  renderPreference();
  if (excludeButton) excludeButton.addEventListener("click", function () { savePreference(true); });
  if (includeButton) includeButton.addEventListener("click", function () { savePreference(false); });

  if (!storageAvailable) {
    setStatus("Statistics paused: browser storage unavailable.");
    return;
  }
  if (excluded) {
    setStatus("This browser is excluded.");
    return;
  }
  if (script.getAttribute("data-count-enabled") !== "true") {
    setStatus("This settings page is not counted.");
    return;
  }

  try {
    if (window.location.origin !== new URL(script.getAttribute("data-site-url")).origin) {
      setStatus("Preview visits are not counted.");
      return;
    }
  } catch (error) {
    return;
  }
  if (!window.fetch) return;

  setStatus("Loading visitor count…");
  var finished = false;
  var controller = window.AbortController ? new window.AbortController() : null;
  var timeout = window.setTimeout(function () {
    finished = true;
    if (controller) controller.abort();
    setStatus("Visitor count unavailable.");
  }, 10000);

  // Match Busuanzi's public integration, omitting query strings and fragments.
  // https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js
  var referrer = "";
  try {
    if (document.referrer) {
      var referringURL = new URL(document.referrer);
      referrer = referringURL.origin + referringURL.pathname;
    }
  } catch (error) { /* An absent or invalid referrer is fine. */ }

  var options = {
    method: "POST",
    credentials: "omit",
    referrerPolicy: "origin",
    body: JSON.stringify({
      url: window.location.origin + window.location.pathname,
      referrer: referrer
    })
  };
  if (controller) options.signal = controller.signal;

  window.fetch("https://cdn.busuanzi.cc/api.php", options)
    .then(function (response) {
      if (!response.ok) throw new Error("Counter unavailable");
      return response.json();
    })
    .then(function (data) {
      if (finished) return;
      var total = data.busuanzi_site_uv;
      if (!/^\d+$/.test(String(total)) || !Number.isSafeInteger(Number(total))) {
        throw new Error("Invalid visitor count");
      }
      finished = true;
      window.clearTimeout(timeout);
      if (countValue) countValue.textContent = Number(total).toLocaleString("en-US");
      if (countContainer) countContainer.hidden = false;
      setStatus("");
    })
    .catch(function () {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      setStatus("Visitor count unavailable.");
    });
}());
