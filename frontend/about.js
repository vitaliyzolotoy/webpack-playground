import welcome from './welcome';

welcome('about');

exports.welcome = welcome;

import Menu from './menu';

let aboutMenu = new Menu({
	title: 'Про сайт',
	items: [{
		text: 'Хто придумав',
		href: '#think'
	}, {
		text: 'Хто зробив?',
		href: '#do'
	}, {
		text: 'Хто оплатив?',
		href: '#pay'
	}]
});

document.body.appendChild(aboutMenu.elem);
