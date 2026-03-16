// content.js - Injected directly into LeetCode problem pages
// Has access to the page's DOM

// --- Detect problem info from the page ---
function getProblemDetails() {
  // LeetCode puts the problem title in this element
  const titleEl = document.querySelector('[data-cy="question-title"]')
    || document.querySelector('.text-title-large');

  const title = titleEl ? titleEl.innerText.trim() : document.title;

  // Difficulty badge
  const difficultyEl = document.querySelector('[diff]')
    || document.querySelector('.text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard');

  const difficulty = difficultyEl ? difficultyEl.innerText.trim() : 'Unknown';

  return { title, difficulty, url: window.location.href };
}

// --- Create the floating coach panel ---
function injectCoachPanel(problemSlug) {
  // Don't inject twice
  if (document.getElementById('ai-coach-panel')) return;

  const panel = document.createElement('div');
  panel.id = 'ai-coach-panel';
  panel.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 300px;
    background: #1e1e2e;
    color: #cdd6f4;
    border: 1px solid #89b4fa;
    border-radius: 12px;
    padding: 16px;
    font-family: sans-serif;
    font-size: 14px;
    z-index: 99999;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  `;

  panel.innerHTML = `
    <div style="font-weight:bold; font-size:15px; margin-bottom:8px;">
      🧠 AI Coding Coach
    </div>
    <div id="coach-problem-name" style="color:#89b4fa; margin-bottom:12px;">
      📌 ${problemSlug}
    </div>
    <div style="color:#a6e3a1; margin-bottom:12px;">
      ✅ Problem detected! Think before you code.
    </div>
    <div style="margin-bottom:8px; font-style:italic; color:#cba6f7;">
      💡 Before asking for hints, answer this:
    </div>
    <div id="coach-question" style="margin-bottom:12px;">
      What is the brute force approach for this problem?
    </div>
    <button id="coach-hint-btn" style="
      background:#89b4fa;
      color:#1e1e2e;
      border:none;
      border-radius:8px;
      padding:8px 14px;
      cursor:pointer;
      font-weight:bold;
      width:100%;
    ">
      Request Hint (Tier 1)
    </button>
    <div id="coach-close" style="
      text-align:right;
      margin-top:8px;
      cursor:pointer;
      color:#6c7086;
      font-size:12px;
    ">✕ Close</div>
  `;

  document.body.appendChild(panel);

  // Close button
  document.getElementById('coach-close').addEventListener('click', () => {
    panel.remove();
  });

  // Hint button (will connect to backend later)
  document.getElementById('coach-hint-btn').addEventListener('click', () => {
    document.getElementById('coach-question').innerText =
      '⏳ Thinking Coach is evaluating your approach...';
  });
}

// --- Listen for message from background.js ---
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'PROBLEM_DETECTED') {
    const details = getProblemDetails();
    console.log('AI Coach: Problem detected →', details);
    injectCoachPanel(message.problemSlug);
  }
});

// --- Also run on direct page load ---
window.addEventListener('load', () => {
  const match = window.location.href.match(/\/problems\/([\w-]+)/);
  if (match) {
    injectCoachPanel(match[1]);
  }
});
