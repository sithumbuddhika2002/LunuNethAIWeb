# Enable automatic Drive updates while preserving the original file rows

The site already contains the latest nine verified Drive files, displayed with the original View and Download buttons. A one-time Google Apps Script deployment is needed for future automatic updates. The connected Drive tool can read files for this chat, but cannot act as a public API for website visitors or deploy Apps Script.

1. Open https://script.google.com and create a project using the account with access to the project folder.
2. Paste the adjacent `Code.gs` into the script editor and save.
3. Select **Deploy → New deployment → Web app**.
4. Set **Execute as: Me** and **Who has access: Anyone**. Authorize the requested read access. This endpoint returns names and IDs only from the configured public project folder; it does not upload, delete, rename or change sharing permissions.
5. Copy the deployment URL ending in `/exec`.
6. Paste that URL into `site/assets/js/drive-config.js`, then upload the updated site. Alternatively send the URL back in this chat for configuration and a live check.

Keep the project folder and intended public documents accessible to anyone with the link. Private files and Drive shortcuts are omitted. Renames, additions and deletions are read afresh on page load and via Refresh files. The complete response replaces the previous list, including an empty result. Network/feed failures retain the last displayed list with an explicit status message. No private credentials or API keys belong in the HTML.

Google documentation: [Web app deployment](https://developers.google.com/apps-script/guides/web), [Content service and JSONP](https://developers.google.com/apps-script/guides/content).
