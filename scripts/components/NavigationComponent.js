var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		})
	},
	render: function() {
		var links = [];

		links.push(this.createLink('', 'Home'));

		if (!Parse.User.current()) {
			links.push(this.createLink('login', 'Login'));
			links.push(this.createLink('register', 'Register'));
		} else {
			links.push(this.createLink('dashboard', 'Dashboard'));
			links.push(<li><a href="#" onClick={this.logout}>Logout</a></li>);
		}
		return (
			<div className="nav-wrapper">
				<a href="#" className="brand-logo left">Login Example</a>
				<ul id="nav-mobile" className="right">
					{links}
				</ul>
			</div>
		);
	},
	createLink: function(url, label) {
		var currentUrl = Backbone.history.getFragment();
		if (currentUrl === url) {
			return(<li className="active"><a href={'#'+url}>{label}</a></li>);
		} else {
			return (<li><a href={'#'+url}>{label}</a></li>);
		}
	},
	logout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('', {trigger: true});
	}
})