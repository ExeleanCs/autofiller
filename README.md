diff --git a/README.md b/README.md
index 6553e079a116fc22a170c91cb2048df089e0adf8..68b4307153e697a90b2171021d8979de209ddcd5 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,13 @@
-# autofiller
+# Auto Refresh Chrome Extension
+
+This directory contains a simple Chrome extension that refreshes the active tab at a user defined interval. The chosen interval is remembered so refreshing continues even if the service worker is restarted.
+
+## Usage
+
+1. Open Chrome and navigate to `chrome://extensions`.
+2. Enable **Developer mode**.
+3. Click **Load unpacked** and choose this folder.
+4. Click the extension icon and enter the refresh interval in seconds.
+5. Press **Başlat** to start automatic refreshing or **Durdur** to stop.
+
+The extension uses `chrome.alarms` to schedule page reloads and stores the target tab and interval in `chrome.storage`.
