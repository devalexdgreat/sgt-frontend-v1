function copyToClipboard(text) {
    if (typeof window !== 'undefined' && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(text)
        .then(() => {
            alert('Copied Voting link to clipboard');
        })
        .catch((error) => {
          alert(`Error copying link to clipboard: ${error}`);
        });
    } else {
      alert('Clipboard API not supported');
    }
  }
  
  export default copyToClipboard;
  