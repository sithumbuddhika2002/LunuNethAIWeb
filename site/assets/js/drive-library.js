/* Google renders the live list. No credentials, scraping or saved file manifest. */
(() => {
  const frame=document.getElementById('drive-library');
  const button=document.getElementById('refresh-drive');
  const status=document.getElementById('drive-status');
  if(!frame||!button||!status)return;
  let timeout;
  function refresh(){
    clearTimeout(timeout);
    button.disabled=true;
    frame.setAttribute('aria-busy','true');
    status.textContent='Requesting the current folder from Google Drive…';
    // Reload the remote view, with a fresh URL rather than a local snapshot.
    const url=new URL('https://drive.google.com/embeddedfolderview');
    url.searchParams.set('id',frame.dataset.folderId);
    url.searchParams.set('_refresh',String(Date.now()));
    url.hash='list';
    frame.src=url.href;
    timeout=setTimeout(()=>{
      button.disabled=false;
      frame.removeAttribute('aria-busy');
      status.textContent='If the folder has not appeared, open it in Google Drive. Loading depends on your connection and the folder’s sharing settings.';
    },15000);
  }
  frame.addEventListener('load',()=>{
    clearTimeout(timeout);
    button.disabled=false;
    frame.removeAttribute('aria-busy');
    // Cross-origin restrictions prevent confirming the embedded contents.
    status.textContent='Google Drive view opened. If files are missing or access is requested, use Open folder in Google Drive.';
  });
  button.addEventListener('click',refresh);
  refresh();
})();
