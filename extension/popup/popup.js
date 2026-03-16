// popup.js - Controls what the popup shows when you click the extension icon

// Read the currently detected problem from chrome.storage
chrome.storage.local.get(['currentProblem'], (result) => {
  const statusEl      = document.getElementById('status');
  const problemInfoEl = document.getElementById('problem-info');
  const noProblemEl   = document.getElementById('no-problem');
  const problemNameEl = document.getElementById('problem-name');
  const detectedTime  = document.getElementById('detected-time');
  const openBtn       = document.getElementById('open-coach-btn');

  if (result.currentProblem) {
    const { slug, detectedAt } = result.currentProblem;

    // Show the problem info block
    statusEl.innerText = '✅ LeetCode problem detected!';
    problemNameEl.innerText = slug;
    detectedTime.innerText = new Date(detectedAt).toLocaleTimeString();

    problemInfoEl.style.display = 'block';
    openBtn.style.display = 'block';
  } else {
    // No problem detected yet
    statusEl.style.display = 'none';
    noProblemEl.style.display = 'block';
  }
});

// "Open Thinking Coach" button — sends message to content script
document.getElementById('open-coach-btn').addEventListener('click', () => {
  // Get the active tab and tell the content script to show the panel
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'PROBLEM_DETECTED' });
    window.close(); // close the popup
  });
});
