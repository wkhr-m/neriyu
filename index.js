(function () {
  const shareButtonEl = document.querySelector('.share-button');
  const shareIconButtonEl = document.querySelector('.share-icon-button');
  const tooltipEl = document.querySelector('.tooltip_1');
  const tooltipEl2 = document.querySelector('.tooltip_2')
  const dialogEl = document.querySelector('#dialog');
  const modalTriggerEl = document.querySelector('.modal-trigger');
  const closeButtonEl = document.querySelector('.close-btn');
  const copyButtonEls = document.querySelectorAll('.button-copy-icon');
  const galleryEls = document.querySelectorAll('.gallery-img');
  const popperInstance = Popper.createPopper(shareButtonEl, tooltipEl, {
    placement: 'top',
    strategy: 'fixed',
  });
  const popperInstance2 = Popper.createPopper(shareIconButtonEl, tooltipEl2, {
    placement: 'top',
    strategy: 'fixed',
  });

  const showTooltip = (isIconButton) => {
    const targetEl = (isIconButton ? tooltipEl2 : tooltipEl)
    const targetInstance = (isIconButton ? popperInstance2 : popperInstance)
    targetEl.setAttribute('data-show', '');
    targetInstance.update();
    setTimeout(() => {
      targetEl.removeAttribute('data-show');
      targetInstance.update();
    }, 2000);
  };

  const cripborad = (value) => {
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(value)
        .then(function () { });
    } else {
      const input = document.createElement('input');
      input.type = 'hidden';
      document.body.appendChild(input);
      input.value = value;
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  }

  const sharelink = async (event, isIconButton) => {
    showTooltip(isIconButton);
    cripborad(window.location.href)
  };
  shareButtonEl.addEventListener('click', (event) => sharelink(event));
  shareIconButtonEl.addEventListener('click', (event) =>
    sharelink(event, true)
  );


  if (modalTriggerEl) {
    modalTriggerEl.addEventListener('click', () => {
      dialogEl.showModal();
    });
    closeButtonEl.addEventListener('click', () => {
      dialogEl.close();
    });

    copyButtonEls.forEach((copyButtonEl, index) => {
      const tooltipEl = document.querySelector(`.tooltip_${index + 3}`);
      const popperInstance = Popper.createPopper(copyButtonEl, tooltipEl, {
        placement: 'top',
        strategy: 'fixed',
      });

      copyButtonEl.addEventListener('click', (event) => {
        cripborad(event.currentTarget.title)

        tooltipEl.setAttribute('data-show', '');
        popperInstance.update();
        setTimeout(() => {
          tooltipEl.removeAttribute('data-show');
          popperInstance.update();
        }, 2000);
      });
    });
  }


  if (galleryEls) {
    galleryEls.forEach((galleryEl, index) => {

      galleryEl.addEventListener('click', (event) => {
        const backdropEl = window.document.createElement("div")
        window.document.body.appendChild(backdropEl);
        backdropEl.classList.add("backdrop")

        const viewerEl = window.document.createElement("div")
        window.document.body.appendChild(viewerEl);
        viewerEl.classList.add("viewer")

        const viewerImgEl = window.document.createElement("img")
        viewerImgEl.classList.add("viewer-img")
        viewerEl.appendChild(viewerImgEl)
        viewerImgEl.src = galleryEl.src

        document.body.classList.add("overflow-hidden")

        viewerEl.addEventListener('click', (event) => {
          if (!viewerImgEl.contains(event.target)) {
            backdropEl.remove()
            viewerEl.remove()
            document.body.classList.remove("overflow-hidden")
          }
        });
      });
    });
  }
})();
