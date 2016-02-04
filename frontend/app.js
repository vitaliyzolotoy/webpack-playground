document.getElementById('loginButton').onclick = function () {

	require.ensure([], function () {
		var login = require('./login');

		login();
	}, 'auth');
};

document.getElementById('logoutButton').onclick = function () {

	require.ensure([], function () {
		var logout = require('./logout');

		logout();
	}, 'auth');
};

import Menu from './menu';

let pandaMenu = new Menu({
	title: 'Меню панди',
	items: [{
		text: 'Яйця',
		href: '#eggs'
	}, {
		text: 'М`ясо',
		href: '#meat'
	}, {
		text: 'Бамбук',
		href: '#bamboo'
	}]
});

document.body.appendChild(pandaMenu.elem);
