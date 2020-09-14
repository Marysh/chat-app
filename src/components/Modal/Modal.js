import React from 'react';
import { createPortal } from 'react-dom';
import styles from "./Modal.module.css"

const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
	constructor( props ) {
		super(props);
		this.element = document.createElement('div');
		this.element.className = styles.my_modal;
	};


	componentDidMount() {
		modalRoot.appendChild(this.element);
	}

	componentWillUnmount() {
		modalRoot.removeChild(this.element);
	}

	render() {
		return createPortal(this.props.children, this.element);
	}
}

export default Modal;

