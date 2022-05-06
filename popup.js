function populateCardWithTabs(list, window = { tabs: [] }) {
	window.tabs.forEach((tab) => {
		const listItem = document.createElement('li')
		listItem.classList.add('tab')

		const span = document.createElement('span')
		const img = new Image(8, 8)
		img.src = tab.favIconUrl
		span.appendChild(img)
		listItem.appendChild(span)

		const title = document.createTextNode(tab.title)
		listItem.appendChild(title)
		list.appendChild(listItem)
	})
}

function restoreWindow(sessionId) {
	chrome.sessions.restore(sessionId)
}

function createCard(parentElement, window) {
	const card = document.createElement('div')
	card.classList.add('card')

	const button = document.createElement('button')
	button.innerHTML = 'Restore window'
	button.addEventListener(
		'click',
		() => restoreWindow(window.sessionId),
		false
	)
	card.appendChild(button)

	const container = document.createElement('div')
	container.classList.add('container')

	const list = document.createElement('ul')
	list.classList.add('tabs')
	populateCardWithTabs(list, window)

	container.appendChild(list)
	card.appendChild(container)

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

function shapeWindows(windows) {}

function handleRecentlyClosed(params, a = ' ') {
	const filteredWindows = filterWindows(params)

	const section = document.querySelector('#windows-container')
	filteredWindows.forEach((window) => createCard(section, window))
}

document.addEventListener(
	'DOMContentLoaded',
	function () {
		chrome.sessions.getRecentlyClosed(undefined, handleRecentlyClosed)
	},
	false
)
