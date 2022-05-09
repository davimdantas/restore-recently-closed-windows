function populateCardWithTabs(list, window = { tabs: [] }) {
	window.tabs.forEach((tab) => {
		const listItem = document.createElement('li')
		listItem.classList.add('tab')

		const span = document.createElement('span')
		const img = new Image(8, 8)
		img.src =
			tab.favIconUrl ||
			`http://www.google.com/s2/favicons?domain=${
				new URL(tab.url).origin
			}` ||
			`${new URL(tab.url).origin}/favicon.ico`
		span.appendChild(img)
		listItem.appendChild(span)

		const title = document.createTextNode(tab.title)
		listItem.appendChild(title)
		list.appendChild(listItem)
	})
}

function restoreWindows() {
	document.querySelectorAll('card-checkmark').forEach((card) => {
		const sessionId = card.getAttribute('data-session-id')
		if (card.shadowRoot.querySelector('input').checked) {
			chrome.sessions.restore(sessionId)
		}
	})
}

function createCard(parentElement, window) {
	const card = document.createElement('div')
	card.classList.add('card')

	const checkmark = document.createElement('card-checkmark')
	checkmark.setAttribute('data-session-id', window.sessionId)
	card.appendChild(checkmark)

	const cardBody = document.createElement('div')
	cardBody.classList.add('card-body')

	const list = document.createElement('ul')
	list.classList.add('tabs')
	populateCardWithTabs(list, window)

	cardBody.appendChild(list)
	card.appendChild(cardBody)

	card.setAttribute('data-session-id', window.sessionId)

	parentElement.appendChild(card)
}

function filterWindows(recentlyClosedWindows = []) {
	const windows = []

	for (
		let windowIndex = 0;
		windowIndex < recentlyClosedWindows.length;
		windowIndex++
	) {
		const closedItem = recentlyClosedWindows[windowIndex]
		if (
			closedItem.hasOwnProperty('window') &&
			!closedItem.window.incognito
		) {
			windows.push(closedItem.window)
		}
	}

	return windows
}

function handleRecentlyClosed(params, a = ' ') {
	const filteredWindows = filterWindows(params)

	const section = document.querySelector('#windows-container')

	const cards = document.createElement('cards-container')
	cards.setAttribute(
		'data-sessions-ids',
		JSON.stringify(filteredWindows.map((window) => window.sessionId))
	)

	// filteredWindows.forEach((window) => {
	// 	createCard(section, window)
	// })

	document.querySelector('body').appendChild(cards)
}

document.addEventListener(
	'DOMContentLoaded',
	function () {
		chrome.sessions.getRecentlyClosed(undefined, handleRecentlyClosed)
	},
	false
)

const button = document.querySelector('#open-windows')
button.addEventListener('click', () => restoreWindows(), false)
