import * as React from "react";

import styles from './Diagram.less';

export class TrayItemWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div
				style={{ borderColor: this.props.color }}
				draggable={true}
				onDragStart={event => {
					event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model));
				}}
				className={styles.trayItem}
			>
				{this.props.name}
			</div>
		);
	}
}
