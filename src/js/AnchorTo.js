/**
 * AnchorTo Class
 *
 * The `AnchorTo` class enables smooth scrolling from a trigger element to a target destination within a webpage.
 * It offers customizable settings such as scroll speed, offset, URL updates, and emits custom events during the scroll process.
 *
 * @example
 * // Usage Example:
 * const anchor = new AnchorTo({
 *     trigger: document.querySelector('.my-button'),
 *     destination: document.querySelector('#section4'),
 *     offset: 50,
 *     url: 'hash',
 *     speed: 500,
 *     emitEvents: true,
 *     popstate: true
 * });
 *
 * @param {Object} options - Configuration options for AnchorTo.
 * @param {HTMLElement} options.trigger - The element that triggers the scroll when clicked.
 * @param {HTMLElement} options.destination - The target element to scroll to.
 * @param {number|function} [options.offset=0] - The distance in pixels from the target destination or a function returning a number.
 *                                               If a function is provided, it receives `element` (destination) and `toggle` (trigger) as parameters.
 * @param {string} [options.url='hash'] - Determines how the URL is updated during the scroll. Possible values:
 *                                        - 'hash': Adds the target `id` as a hash in the URL (e.g., `#section`).
 *                                        - 'query': Adds the target `id` as a query parameter in the URL (e.g., `?scrollto=section`).
 *                                        - 'none': Does not update the URL.
 * @param {number} [options.speed=1500] - The scroll speed in milliseconds.
 * @param {boolean} [options.emitEvents=true] - If `true`, emits custom events at the start and end of the scroll.
 *                                              Specifically, `anchorToStart` is emitted when the scroll begins, and `anchorToEnd` is emitted when the scroll completes.
 *                                              These events are dispatched from the `trigger` element, allowing other scripts or listeners
 *                                              to respond to the start and end of the scroll animation.
 * @param {boolean} [options.popstate=true] - If `true`, enables smooth scrolling when the browser's forward and back navigation buttons are used.
 *
 * Methods:
 * - init(): Initializes the class and assigns necessary event listeners.
 * - events(): Adds event listeners for `click` on `trigger` and `popstate` on `window`.
 * - handleClick(event): Handles the `click` event to perform the scroll and update the URL.
 * - handlePopstate(): Handles the `popstate` event to scroll to the target based on the URL.
 * - scrollTo(element): Executes the scroll animation to the destination element.
 * - ease(t, b, c, d): Easing function to smoothen the scroll animation.
 * - emitEvent(name): Emits a custom event on `trigger` at the beginning and end of the scroll.
 * - destroy(): Removes the `click` and `popstate` event listeners.
 */

class AnchorTo {
	constructor({
		trigger,
		destination,
		offset = 0,
		url = 'hash',
		speed = 1500,
		emitEvents = true,
		popstate = true,
	}) {
		// Configuración de propiedades y elementos del DOM
		this.DOM = {
			trigger: trigger,
			destination: destination,
		};
		this.offset = typeof offset === 'function' ? offset : () => offset;
		this.url = url;
		this.speed = speed;
		this.emitEvents = emitEvents;
		this.popstate = popstate;

		// Inicialización
		this.init();
		this.events();
	}

	init() {

	}

	events() {
		if (this.DOM.trigger) {
			// Agrega el event listener para el click usando función flecha para mantener el contexto de `this`
			this.DOM.trigger.addEventListener('click', (event) => this.handleClick(event));
		}

		if (this.popstate) {
			// Agrega el event listener para el popstate usando función flecha para mantener el contexto de `this`
			window.addEventListener('popstate', (event) => this.handlePopstate(event));
		}
	}

	handleClick(event) {
		event.preventDefault();
		this.scrollTo(this.DOM.destination);

		// Actualiza la URL según la opción seleccionada
		if (this.url !== 'none') {
			const targetID = this.DOM.destination.id || 'section';
			if (this.url === 'hash') {
				history.pushState(null, null, `#${targetID}`);
			} else if (this.url === 'query') {
				const params = new URLSearchParams(window.location.search);
				params.set('scrollto', targetID);
				history.pushState(null, null, `${window.location.pathname}?${params}`);
			}
		}

		if (this.emitEvents) {
			this.emitEvent('anchorToStart');
		}
	}

	handlePopstate() {
		const destinationID = this.url === 'query'
			? new URLSearchParams(window.location.search).get('scrollto')
			: window.location.hash.substring(1);

		const destinationElement = document.getElementById(destinationID);

		if (destinationElement) {
			this.scrollTo(destinationElement);
		}
	}

	scrollTo(element) {
		const startPosition = window.pageYOffset;
		const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - this.offset(element, this.DOM.trigger);
		const distance = targetPosition - startPosition;
		const duration = this.speed;

		let startTime = null;

		const animation = (currentTime) => {
			if (!startTime) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = this.ease(timeElapsed, startPosition, distance, duration);

			window.scrollTo(0, run);

			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			} else if (this.emitEvents) {
				this.emitEvent('anchorToEnd');
			}
		};

		requestAnimationFrame(animation);
	}

	ease(t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}

	emitEvent(name) {
		const event = new CustomEvent(name, { detail: { element: this.DOM.trigger } });
		this.DOM.trigger.dispatchEvent(event);
	}

	destroy() {
		// Remueve los event listeners para click y popstate
		if (this.DOM.trigger) {
			this.DOM.trigger.removeEventListener('click', (event) => this.handleClick(event));
		}

		if (this.popstate) {
			window.removeEventListener('popstate', (event) => this.handlePopstate(event));
		}
	}
}

export default AnchorTo;
