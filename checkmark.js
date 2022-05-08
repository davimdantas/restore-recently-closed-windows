const template = document.createElement('template')

template.innerHTML = `
<label class="checkmark-container">
	<input type="checkbox" checked>
	<span class="checkmark"></span>
</label>
`

class Checkmark extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.appendChild(template.content.cloneNode(true))
	}
}

window.customElements.define('card-checkmark', Checkmark)
