// background.js - Service Worker
// Runs in the background, listens for tab events

// Fires every time a tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only act when the page has fully loaded
  if (changeInfo.status !== 'complete') return;

  // Check if the URL is a LeetCode problem page
  if (tab.url && tab.url.match(/https:\/\/leetcode\.com\/problems\/[\w-]+/)) {

    // Extract problem name from URL
    // e.g. https://leetcode.com/problems/two-sum/ → "two-sum"
    const match = tab.url.match(/\/problems\/([\w-]+)/);
    const problemSlug = match ? match[1] : 'unknown';

    console.log(`LeetCode problem detected: ${problemSlug}`);

    // Save the detected problem in chrome.storage
    // So popup.js and content.js can read it
    chrome.storage.local.set({
      currentProblem: {
        slug: problemSlug,
        url: tab.url,
        detectedAt: new Date().toISOString(),
      }
    });

    // Send a message to the content script on that tab
    chrome.tabs.sendMessage(tabId, {
      type: 'PROBLEM_DETECTED',
      problemSlug,
    });
  }
});
