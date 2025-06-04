const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

// Load previously saved interval if any
chrome.storage.local.get('refreshInterval', ({refreshInterval}) => {
  if (refreshInterval) {
    secondsInput.value = refreshInterval;
  }
});

startBtn.addEventListener('click', () => {
  const seconds = parseInt(secondsInput.value, 10);
  if (!seconds || seconds <= 0) {
    alert('Lütfen geçerli bir süre girin.');
    return;
  }
  const minutes = seconds / 60;
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const tabId = tabs[0].id;
    chrome.storage.local.set({refreshTabId: tabId, refreshInterval: seconds}, () => {
      chrome.alarms.create('autoRefresh', {periodInMinutes: minutes});
      window.close();
    });
  });
});

stopBtn.addEventListener('click', () => {
  chrome.alarms.clear('autoRefresh');
  chrome.storage.local.set({refreshTabId: null, refreshInterval: null});
});