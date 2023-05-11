(function () {
  const shareButtonEl = document.querySelector('#share-button');
  const shareLinkEl = document.querySelector('#share-link');
  const copyEl = document.querySelector('#copy');

  const messageActive = () => {};

  const sharelink = async (event) => {
    console.log(event.currentTarget);
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(window.location.href)
        .then(function () {
          messageActive();
        });
    } else {
      const input = document.createElement('input');
      input.type = 'hidden';
      document.body.appendChild(input);
      input.value = window.location.href;
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  };
  shareButtonEl.addEventListener('click', (event) => sharelink(event));
  shareLinkEl.addEventListener('click', (event) => sharelink(event));
})();
