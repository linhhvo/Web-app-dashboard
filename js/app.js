const settings = document.querySelector('.settings');
const nav = document.querySelector('nav');

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

nav.addEventListener('click', (e) => {
	if (e.target.tagName == 'IMG') {
		if (e.target.parentNode.classList[1] !== 'selected') {
			e.target.parentNode.classList.add('selected');
		}
	}
});
