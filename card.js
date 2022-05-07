const template = document.createElement('template')

template.innerHTML = `
  <div class="card">
    <div class="card-body"></div>
  </div>
`

class Card extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.shadowRoot.querySelector('.card').innerText =
			this.getAttribute('data-url')
		this.shadowRoot.querySelector('img').src = this.getAttribute('avatar')
	}

	connectedCallback() {
		this.h3 = this.getAttribute('data-url')
		this.render()
	}

	render() {
		this.h3
	}
}
window.customElements.define('employee-card', Card)
