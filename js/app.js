// Create alert banner

const alertBanner = document.getElementById('alert');

alertBanner.innerHTML = `
  ;

alertBanner.addEventListener('click')




let mainTrafficCanvas = document.getElementById('mainTrafficChart');

let trafficData = {
	labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
	datasets: [
		{
			data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
			backgroundColor: 'rgba(116,119,191,.3',
			broderWidth: 1,
		},
	],
};

let trafficOptions = {
	aspectRatio: 2.5,
	animation: {
		duration: 0,
	},
};
