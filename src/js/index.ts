import './../scss/style.scss';
import AnchorTo from './AnchorTo.js';



var elements = document.querySelectorAll('.js--scroll-to');
elements.forEach((element) => {
  const destinationSelector = element.getAttribute('data-section');
  const destinationElement = document.querySelector(destinationSelector);

  if (destinationElement) {
    new AnchorTo({
      trigger: element,
      destination: destinationElement,
      offset: (element, toggle) => toggle.closest('.my-header-nav') ? 25 : 50,
      url: 'query', // Cambia la URL a hash
      speed: 300,
      emitEvents: true,
      popstate: true
    });
  } else {
    console.warn(`No se encontró el elemento destino para el selector: ${destinationSelector}`);
  }
});