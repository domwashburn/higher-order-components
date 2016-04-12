import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function( ComposedComponent ) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if(!this.props.authenticated) {
				this.context.router.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if(!nextProps.authenticated) {
				this.context.router.push('/');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
	function mapStateToProps(state){
		return { authenticated: state.authenticated };
	}
	return connect(mapStateToProps)(Authentication);
}

// TO USE THIS: 
// In the file for the component we want to use this in ...
// --------------------------------------------------------
// import Authentication from './path/to/hoc' // This is the Higher Order Component
// import Resources from './path/to/component' // this is the component that I want to wrap in the Higher Order Component
// 
// const ComposedComponent = Authentication(resources); // Name the variable anything
// --------------------------------------------------------
// in a render method...
// <ComposedComponent dummyProp="to map"/>
//
// FYI: You bookmarked this on Udemy. It's in Advanced Redux: Section 4, video 41 -- HOC Scaffold Code