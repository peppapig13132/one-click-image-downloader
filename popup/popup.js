document.getElementById('download').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: downloadAllImages
    });
  });
});

function downloadAllImages() {
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    const imageUrl = img.src;
    const extension = imageUrl.split('.').pop().split(/\#|\?/)[0];
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image-${index + 1}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
