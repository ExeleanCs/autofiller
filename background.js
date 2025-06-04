// Initialize storage on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({refreshTabId: null, refreshInterval: null});
});

// Restore alarm when the service worker starts
async function restoreAlarm() {
  const {refreshTabId, refreshInterval} = await chrome.storage.local.get([
    'refreshTabId',
    'refreshInterval'
  ]);
  if (refreshTabId !== null && refreshInterval && refreshInterval > 0) {
    chrome.tabs.get(refreshTabId, tab => {
      if (chrome.runtime.lastError || !tab) {
        chrome.storage.local.set({refreshTabId: null, refreshInterval: null});
      } else {
        chrome.alarms.create('autoRefresh', {periodInMinutes: refreshInterval / 60});
      }
    });
  }
}

restoreAlarm();

// Listen for alarm to reload the tab
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'autoRefresh') {
    chrome.storage.local.get(['refreshTabId'], ({refreshTabId}) => {
      if (refreshTabId !== null) {
        chrome.tabs.get(refreshTabId, tab => {
          if (chrome.runtime.lastError || !tab) {
            // Tab no longer exists, stop alarm
            chrome.alarms.clear('autoRefresh');
            chrome.storage.local.set({refreshTabId: null, refreshInterval: null});
          } else {
            chrome.tabs.reload(refreshTabId);
          }
        });
      }
    });
  }
});