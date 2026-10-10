// Read-only feed for the explicitly selected public project folder.
const ROOT_FOLDER_ID = '1rkH_ZjhUT8vOdDe2AyoqSrTQuTi7mQ6I';
function doGet(e) {
  const callback = String((e && e.parameter && e.parameter.callback) || '');
  if (callback && !/^lununethDrive_[a-zA-Z0-9_]+$/.test(callback)) {
    return ContentService.createTextOutput('{"error":"Invalid callback"}').setMimeType(ContentService.MimeType.JSON);
  }
  let result;
  try {
    const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const publicAccess = item => [DriveApp.Access.ANYONE, DriveApp.Access.ANYONE_WITH_LINK].indexOf(item.getSharingAccess()) !== -1;
    if (!publicAccess(root)) throw new Error('Project folder is not public');
    const files = [], seen = {};
    let count = 0;
    function scan(folder, category, depth) {
      if (seen[folder.getId()]) return;
      seen[folder.getId()] = true;
      if (depth > 12 || ++count > 2000) throw new Error('Folder traversal limit exceeded');
      const entries = folder.getFiles();
      while (entries.hasNext()) {
        const file = entries.next();
        if (++count > 2000) throw new Error('File limit exceeded');
        if (file.isTrashed() || !publicAccess(file) || file.getMimeType() === 'application/vnd.google-apps.shortcut') continue;
        files.push({id:file.getId(), filename:file.getName(), category:category || 'Other', mimeType:file.getMimeType()});
      }
      const folders = folder.getFolders();
      while (folders.hasNext()) {
        const child = folders.next();
        if (!child.isTrashed() && publicAccess(child)) scan(child, category || child.getName(), depth + 1);
      }
    }
    scan(root, '', 0);
    files.sort((a,b) => a.filename.localeCompare(b.filename));
    result = {files:files, updatedAt:new Date().toISOString()};
  } catch (error) {
    result = {error:'The document feed could not read the public project folder. Check deployment permissions and folder sharing.'};
  }
  const json = JSON.stringify(result).replace(/</g,'\\u003c');
  return ContentService.createTextOutput(callback ? callback + '(' + json + ');' : json)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
