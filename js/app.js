const header = document.querySelector('header');
const newNotiIndicator = document.querySelector('.new-noti');
const notifications = document.getElementById('notifications');
const notiContainer = document.getElementsByClassName('notifications_container');

const nav = document.querySelector('nav');

const alertBar = document.getElementById('alert');

const trafficNav = document.querySelector('.traffic_nav');
const trafficNavItems = document.getElementsByClassName('traffic_nav--link');

const form = document.querySelector('form');
const userSearch = document.getElementsByClassName('userField');
const messageField = document.getElementById('messageField');
const userList = document.querySelector('.userList');
const userData = ['John Smith', 'Jane Doe', 'Karen Cook', 'Sharon Gill', 'Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver', 'Hieu Pham', 'Linh Vo'];
const errorMessage = document.createElement('p');
const sendButton = document.getElementById('send');

const settings = document.querySelector('.settings');
const emailToggle = document.querySelector('.settings_email').firstElementChild;
const privacyToggle = document.querySelector('.settings_privacy').firstElementChild;
const timezoneContainer = document.getElementById('settings_tz');
const timezoneSettings = document.getElementById('timezone');
let timezoneOptions = timezoneSettings.children;
const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

const trafficCanvas = document.getElementById('mainTrafficChart');
const dailyCanvas = document.getElementById('dailyChart');
const mobileCanvas = document.getElementById('usersChart');

let time = 'Weekly';

// Change styles for active navigation links
nav.addEventListener('click', (e) => {
	if (e.target.tagName == 'IMG') {
		let navItem = e.target.parentNode;
		let navIcons = navItem.parentNode.children;
		if (navItem.className !== 'selected') {
			navItem.classList.add('selected');
			for (let i = 0; i < navIcons.length; i++) {
				if (navIcons[i] !== navItem) {
					navIcons[i].classList.remove('selected');
				}
			}
		}
	}
});

// Close alert banner when click 'x' button
alertBar.addEventListener('click', (e) => {
	if (e.target.tagName == 'BUTTON') {
		alertBar.classList.add('closed');
	}
});

// Show/close notifications dropdown when click bell icon
header.addEventListener('click', (e) => {
	if (e.target.tagName == 'svg') {
		if (notifications.style.maxHeight) {
			notifications.style.maxHeight = null;
			for (let i = 0; i < notiContainer.length; i++) {
				notiContainer[i].classList.add('seen');
			}
		} else {
			notifications.style.maxHeight = '300px';
			newNotiIndicator.style.display = 'none';
		}
	}
});

// Close notification item when click 'x' button
notifications.addEventListener('click', (e) => {
	if (e.target.tagName == 'BUTTON') {
		e.target.parentNode.style.display = 'none';
	}
});

// Autocomplete feature for search box
function searchFilter() {
	resetList(userList);
	for (let i = 0; i < userData.length; i++) {
		let searchInput = '';
		searchInput += userField.value.toLowerCase();
		let userName = userData[i].toLowerCase();
		if (!searchInput) {
			resetList(userList);
		} else if (userName.includes(searchInput)) {
			let userItem = document.createElement('DIV');
			userItem.textContent = userData[i];
			userList.appendChild(userItem);
			userItem.classList.add('userList_item');
			userItem.addEventListener('click', () => {
				userField.value = userData[i];
				resetList(userList);
			});
		}
	}
	// Close suggestion list when click anywhere outside of the list
	document.addEventListener('click', () => {
		resetList(userList);
	});
}

// Reset user suggestion list
function resetList(parent) {
	while (parent.firstElementChild) {
		parent.removeChild(parent.firstElementChild);
	}
}

userField.addEventListener('keyup', searchFilter);

// Function to capitalize first Letter of each word
function toUpperFirst(str) {
	return str
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word[0].toUpperCase() + word.substr(1);
		})
		.join(' ');
}

// Actions when send message
form.addEventListener('submit', (e) => {
	e.preventDefault();
	let userNameInput = userField.value.toLowerCase();
	let messageInput = messageField.value;

	// Display error messages if user and message input are invalid
	const createErrorMessage = {
		invalid: () => {
			errorMessage.textContent = 'This user is not in the system.';
			errorMessage.classList.add('error');
			form.insertBefore(errorMessage, userList);
		},
		emptyUser: () => {
			errorMessage.textContent = 'This field cannot be blank.';
			errorMessage.classList.add('error');
			form.insertBefore(errorMessage, userList);
		},
		emptyMessage: () => {
			errorMessage.textContent = 'This field cannot be blank.';
			errorMessage.classList.add('error');
			form.insertBefore(errorMessage, sendButton);
		},
	};

	// Check if user input is in the system
	function checkValidUser() {
		if (userData.includes(toUpperFirst(userNameInput))) {
			return true;
		} else {
			createErrorMessage.invalid();
			return false;
		}
	}

	// Display success message and reset form input
	function displaySuccessMessage() {
		const successMessage = `
			<div class="success">
				<p>Your message has been sent!</p>
				<button type="button">Go Back</button>
			</div>`;
		form.insertAdjacentHTML('beforeend', successMessage);
		userField.value = null;
		messageField.value = null;
		const messageContainer = document.querySelector('.success');
		messageContainer.addEventListener('click', (e) => {
			if (e.target.tagName == 'BUTTON') {
				messageContainer.parentNode.removeChild(messageContainer);
			}
		});
	}

	if (userNameInput && checkValidUser() && messageInput) {
		displaySuccessMessage();
	} else if (!userNameInput) {
		createErrorMessage.emptyUser();
	} else if (!messageInput) {
		createErrorMessage.emptyMessage();
	}
});

// Clear error message when user reenter input
form.addEventListener('input', (e) => {
	if (e.target.nextElementSibling.tagName == 'P') {
		form.removeChild(e.target.nextElementSibling);
	}
});

// Change styles for switch toggles
settings.addEventListener('click', (e) => {
	if (e.target.classList[0] == 'toggle_circle') {
		resetMessage();
		let toggleBtn = e.target.parentNode;
		if (toggleBtn.classList[1] == 'active-btn') {
			toggleBtn.classList.remove('active-btn');
		} else {
			toggleBtn.classList.add('active-btn');
		}
	}
	if (e.target.tagName == 'SELECT') {
		resetMessage();
	}
});

// Save settings selection to local storage
saveButton.addEventListener('click', () => {
	if (emailToggle.classList[1] == 'active-btn') {
		localStorage.setItem('email', 'on');
	} else {
		localStorage.setItem('email', 'off');
	}
	if (privacyToggle.classList[1] == 'active-btn') {
		localStorage.setItem('public', 'on');
	} else {
		localStorage.setItem('public', 'off');
	}
	let selectedTimezone = timezoneSettings.value;
	localStorage.setItem('timezone', selectedTimezone);

	// Display success message
	let savedMessage = document.createElement('p');
	if (timezoneSettings.parentNode.nextElementSibling.tagName !== 'P') {
		savedMessage.textContent = `Your settings have been saved.`;
		savedMessage.classList.add('saved');
		timezoneSettings.parentNode.after(savedMessage);
	}
});

function resetMessage() {
	if (timezoneSettings.parentNode.nextElementSibling.tagName == 'P') {
		let message = document.getElementsByClassName('saved')[0];
		timezoneContainer.removeChild(message);
	}
}

function setTimezone(timezone) {
	if (!localStorage.getItem('timezone')) {
		timezoneOptions[0].selected = true;
	}
	for (let i = 0; i < timezoneOptions.length; i++) {
		if (timezone === timezoneOptions[i].textContent) {
			timezoneOptions[i].selected = true;
		}
	}
}

if (localStorage.getItem('email') === 'off') {
	emailToggle.classList.remove('active-btn');
}
if (localStorage.getItem('public') === 'off') {
	privacyToggle.classList.remove('active-btn');
}
setTimezone(localStorage.getItem('timezone'));

// Reset local storage
cancelButton.addEventListener('click', () => {
	localStorage.clear();
	resetMessage();
	if (emailToggle.classList[1] !== 'active-btn') {
		emailToggle.classList.add('active-btn');
	}
	if (privacyToggle.classList[1] !== 'active-btn') {
		privacyToggle.classList.add('active-btn');
	}
	timezoneOptions[0].selected = true;
});

// Change styles and chart data for active main traffic navigation
trafficNav.addEventListener('click', (e) => {
	if (e.target.tagName == 'LI') {
		if (e.target.classList[1] !== 'active') {
			e.target.classList.add('active');
			time = e.target.textContent;
			trafficChart.data.datasets[0].data = getTrafficData();
			trafficChart.update();
			for (let i = 0; i < trafficNavItems.length; i++) {
				if (trafficNavItems[i] !== e.target) {
					trafficNavItems[i].classList.remove('active');
				}
			}
		}
	}
});

// Default chart font settings
Chart.defaults.global.defaultFontFamily = 'Catamaran';
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontStyle = 'bold';

// Change dataset based on selected traffic navigation
function getTrafficData() {
	if (time === 'Hourly') {
		return [25, 95, 70, 79, 43, 47, 10, 95, 57, 96, 25];
	} else if (time === 'Daily') {
		return [142, 256, 140, 461, 376, 207, 500, 362, 313, 161, 159];
	} else if (time === 'Monthly') {
		return [6300, 4500, 5900, 3000, 7500, 5000, 6500, 9300, 3500, 6000, 8500];
	} else {
		return [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500];
	}
}

// Add main traffic chart
let trafficData = {
	labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
	datasets: [
		{
			data: getTrafficData(),
			backgroundColor: 'rgba(116,119,191,.3)',
			borderWidth: 2,
			pointBorderColor: 'rgba(116,119,191)',
			pointBackgroundColor: 'rgba(116,119,191)',
			pointRadius: 4,
			pointHoverRadius: 5,
			borderColor: 'rgba(116,119,191,.5)',
		},
	],
};

let trafficOptions = {
	responsive: true,
	aspectRatio: 3,
	animation: {
		duration: 0,
	},
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
	legend: {
		display: false,
	},
};

let trafficChart = new Chart(trafficCanvas, {
	type: 'line',
	data: trafficData,
	options: trafficOptions,
});

// Add daily traffic chart
const dailyData = {
	labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	datasets: [
		{
			label: '# of Hits',
			data: [75, 115, 175, 125, 225, 200, 100],
			backgroundColor: '#7477BF',
			borderWidth: 1,
		},
	],
};

const dailyOptions = {
	responsive: true,
	aspectRatio: 1.7,
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					fontSize: 20,
				},
			},
		],
		xAxes: [
			{
				ticks: {
					fontSize: 20,
				},
			},
		],
	},
	legend: {
		display: false,
	},
};

let dailyChart = new Chart(dailyCanvas, {
	type: 'bar',
	data: dailyData,
	options: dailyOptions,
});

// Add mobile users chart
const mobileData = {
	labels: ['Desktop', 'Tablet', 'Phones'],
	datasets: [
		{
			label: '# of Users',
			data: [2000, 550, 500],
			borderWidth: 0,
			backgroundColor: ['#7477BF', '#78CF82', '#51B6C8'],
		},
	],
};

const mobileOptions = {
	responsive: true,
	aspectRatio: 1.7,
	legend: {
		position: 'right',
		labels: {
			boxWidth: 20,
			fontStyle: 'bold',
			fontSize: 20,
			padding: 20,
		},
	},
};

let mobileChart = new Chart(mobileCanvas, {
	type: 'doughnut',
	data: mobileData,
	options: mobileOptions,
});
