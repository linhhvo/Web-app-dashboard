const header = document.querySelector('header');
const newNotiIndicator = document.querySelector('.new-noti');
const notifications = document.getElementById('notifications');
const notiContainer = document.getElementsByClassName('notifications_container');

const nav = document.querySelector('nav');

const alertBar = document.getElementById('alert');

const userSearch = document.getElementsByClassName('userField');
let userList = document.querySelector('.userList');
const userData = ['John Smith', 'Jane Doe', 'Karen Cook', 'Sharon Gill', 'Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver', 'Hieu Pham', 'Linh Vo'];

const settings = document.querySelector('.settings-2');

const trafficCanvas = document.getElementById('mainTrafficChart');
const dailyCanvas = document.getElementById('dailyChart');
const mobileCanvas = document.getElementById('usersChart');

// Change styles for switch toggles
settings.addEventListener('click', (e) => {
	if (e.target.classList[0] == 'toggle_circle') {
		let toggleBtn = e.target.parentNode;
		if (toggleBtn.classList[1] == 'active-btn') {
			toggleBtn.classList.remove('active-btn');
		} else {
			toggleBtn.classList.add('active-btn');
		}
	}
});

// Change styles for active navigation links
nav.addEventListener('click', (e) => {
	if (e.target.tagName == 'IMG') {
		let navItem = e.target.parentNode;
		let navIcons = navItem.parentNode.children;
		if (navItem.classList[1] !== 'selected') {
			navItem.classList.add('selected');
			for (let i = 0; i < navIcons.length; i++) {
				if (navIcons[i].classList[0] !== navItem.classList[0]) {
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

// Add main traffic chart
let trafficData = {
	labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
	datasets: [
		{
			data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
			backgroundColor: 'rgba(116,119,191,.3)',
			borderWidth: 2,
			pointBorderColor: 'rgba(116,119,191)',
			pointHoverBackgroundColor: 'rgba(116,119,191)',
			pointRadius: 4,
			pointHoverRadius: 5,
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
	labels: {
		defaultFontSize: 20,
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
	legend: {
		position: 'right',
		labels: {
			boxWidth: 20,
			fontStyle: 'bold',
		},
	},
};

let mobileChart = new Chart(mobileCanvas, {
	type: 'doughnut',
	data: mobileData,
	options: mobileOptions,
});
