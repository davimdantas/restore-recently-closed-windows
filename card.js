const cardTemplate = document.createElement('template')

// cardTemplate.innerHTML = `
//   <div class="card">
//   <card-checkmark></card-checkmark>
//     <div class="card-body"></div>
//   </div>
// `

function createInnerHTML() {
	return `
	<div class="card">
	<card-checkmark></card-checkmark>
	  <div class="card-body"></div>
	</div>
  `
}

class Card extends HTMLElement {
	constructor() {
		super()
		cardTemplate.innerHTML = createInnerHTML()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true))

		// this.shadowRoot.querySelector('.card').innerText =
		// 	this.getAttribute('data-url')
		// this.shadowRoot.querySelector('img').src =
		// 	'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://minhaconta.magazineluiza.com.br/tickets&size=16'
	}

	connectedCallback() {
		console.log('this.attributes :', this.attributes)
		const sessionId = this.attributes['data-session-id'].value
		console.log('sessionId :', sessionId)
		this.innerHTML = `Hello ${userName}...`
	}
}

window.customElements.define('window-card', Card)
