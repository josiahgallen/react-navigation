'use strict';
var React = require('react');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize(
	'ZNBDTpwitBRguJj6RMpzbIAJ5yd5QTWucsz41sQb',
	'eCpv4XIiCN0f1HX2rs3AfiTSui63u7HK3TqaSA9K'
);

var NavigationComponent = require('./components/NavigationComponent');
var HomeComponent = require('./components/HomeComponent');
var DashboardComponent = require('./components/DashboardComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register'
	},
	home: function() {
		React.render(<HomeComponent />, app);
	},
	dashboard: function() {
		if(Parse.User.current()) {
		React.render(<DashboardComponent />, app);
	} else {
		React.render(
			this.navigate('login', {trigger: true})
		);
	}
	},
	login: function() {
		if (!Parse.User.current()) {
		React.render(<LoginComponent router={r} />, app);
		} else {
			this.navigate('dashboard', {trigger: true})
		}
	},
	register: function() {
		if (!Parse.User.current()) {
		React.render(<RegisterComponent router={r} />, app);
	} else {
		this.navigate('dashboard', {trigger: true});
	}
	}
});

var r = new Router();
Backbone.history.start();

React.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);