import * as React from "react";

import styles from './Diagram.less';

export class TrayWidget extends React.Component {
	
	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <div className={styles.tray}>{this.props.children}</div>;
	}
}
