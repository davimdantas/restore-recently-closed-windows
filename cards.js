const cardsTemplate = document.createElement('template')

function createCardsInnerHTML(windows) {
	console.log('windows :', windows)
	let teste = windows.reduce(
		(
			prev,
			curr
		) => `${prev}  <window-card data-session-id="${curr.sessionId}"></window-card>
			`,
		'<p>teste</p>'
	)
	console.log('teste :', teste)

	return teste
}

class Cards extends HTMLElement {
	windows
	constructor() {
		super()
		console.log(
			"this.attributes['data-sessions-ids'].value :",
			document.querySelector('cards-container')
		)
		console.log("this.attributes['data-sessions-ids'].value :", this)
		console.log('this.windows :', this.windows)
		this.attachShadow({ mode: 'open' })
		cardsTemplate.innerHTML = createCardsInnerHTML(this.windows)

		this.shadowRoot.appendChild(cardsTemplate.content.cloneNode(true))
	}

	connectedCallback() {
		console.log('this.windows 2:', this.windows)
		this.windows = JSON.parse(this.attributes['data-sessions-ids'].value)
		cardsTemplate.innerHTML = createCardsInnerHTML(windows)
		// this.innerHTML = createCardsInnerHTML(windows)
	}
}

window.customElements.define('cards-container', Cards)
