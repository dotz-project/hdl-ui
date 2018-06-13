import * as React from "react";
import { CompNodeModel } from "./CompNodeModel";
import { PortWidget } from "storm-react-diagrams";

export class CompNodeWidget extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                className={"comp-node"}
                style={{
                    position: "relative",
                    width: this.props.size,
                    height: this.props.size
                }}
            >
                <svg
                    width={this.props.size}
                    height={this.props.size}
                    dangerouslySetInnerHTML={{
                        __html:
                            `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="purple" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="10,` +
                            this.props.size / 2 +
                            ` ` +
                            this.props.size / 2 +
                            `,10 ` +
                            (this.props.size - 10) +
                            `,` +
                            this.props.size / 2 +
                            ` ` +
                            this.props.size / 2 +
                            `,` +
                            (this.props.size - 10) +
                            ` "/>
          </g>
        `
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        top: this.props.size / 2 - 4,
                        left: -8
                    }}
                >
                    <PortWidget name="center" node={this.props.node} />
                </div>
                
            </div>
        );
    }
}