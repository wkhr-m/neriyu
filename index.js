(function () {
  const shareButtonEl = document.querySelector('.share-button');
  const shareIconButtonEl = document.querySelector('.share-icon-button');
  const tooltipEl = document.querySelector('.tooltip_1');
  const tooltipEl2 = document.querySelector('.tooltip_2');
  const popperInstance = Popper.createPopper(shareButtonEl, tooltipEl, {
    placement: 'top',
  });
  const popperInstance2 = Popper.createPopper(shareIconButtonEl, tooltipEl2, {
    placement: 'top',
  });

  const showTooltip = (isIconButton) => {
    (isIconButton ? tooltipEl2 : tooltipEl).setAttribute('data-show', '');
    (isIconButton ? popperInstance2 : popperInstance).update();
    setTimeout(() => {
      (isIconButton ? tooltipEl2 : tooltipEl).removeAttribute('data-show');
      (isIconButton ? popperInstance2 : popperInstance).update();
    }, 2000);
  };

  const sharelink = async (event, isIconButton) => {
    showTooltip(isIconButton);
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(window.location.href)
        .then(function () {});
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
  shareIconButtonEl.addEventListener('click', (event) =>
    sharelink(event, true)
  );
})();
