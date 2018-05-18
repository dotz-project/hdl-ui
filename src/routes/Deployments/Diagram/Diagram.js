import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu, Modal } from 'antd';

import * as SRD from "storm-react-diagrams"
require("storm-react-diagrams/dist/style.min.css");
require("./Diagram.css");

import {TrayWidget} from './TrayWidget'
import {TrayItemWidget} from "./TrayItemWidget";
import {Application} from "./Application";

import styles from './Diagram.less';

export default class Diagram extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            app: new Application(),
            visible: false,
            compName : ""
        };

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    showModal(compName){
        this.setState({
            visible: true,
            compName: compName
        });
    }

    handleOk(e){
        
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel(e){
        console.log(e);
        this.setState({
            visible: false,
        });
    }



    componentDidMount() {
        /*
        this.props.dispatch({
            type: 'list/fetch',
            payload: {
                count: 8,
            },
        });
        */
    }

    render() {
        return (
            <div className="content">
                <Modal
                    title={"Configurar componente: " + this.state.compName}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="OK"
                    cancelText="Close"
                >
                    <p>Para continuar e adicionar este componente por favor preencha os campos abaixo:</p>
                    <hr />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <TrayWidget>
                    <TrayItemWidget model={{ type: "out", name:"Mongo" }} name="Mongo" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"AMPQ" }} name="AMPQ" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"Kafka" }} name="Kafka" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"Elastic" }} name="Elastic" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"Logs" }} name="Logs" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"Redis" }} name="Redis" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"Memcached" }} name="Memcached" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"Cassandra" }} name="Cassandra" color="rgb(192,255,0)" />
                    <TrayItemWidget model={{ type: "out", name:"SQL Server" }} name="SQL Server" color="rgb(192,255,0)" />
                </TrayWidget>
                <TrayWidget>    
                    <TrayItemWidget model={{ type: "out", name:"Members" }} name="Members" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"SignUp" }} name="SignUp" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Wallet" }} name="Wallet" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Rewards" }} name="Rewards" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Redemptions" }} name="Redemptions" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Agreements" }} name="Agreements" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Billing" }} name="Billing" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Deposits" }} name="Deposits" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Offers" }} name="Offers" color="rgb(192,255,200)" />
                    <TrayItemWidget model={{ type: "out", name:"Purple" }} name="Purple" color="rgb(192,255,200)" />
                </TrayWidget>
                <div
                    className="diagram-layer"
                    onDrop={event => {
                        var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
                        var nodesCount = Object.keys(
                            this.state.app
                                .getDiagramEngine()
                                .getDiagramModel()
                                .getNodes()
                        ).length;
                        var node = null;
                        var port;
                        if (data.type === "out") {
                            node = new SRD.DefaultNodeModel(data.name, "rgb(192,255,0)");
                            port = node.addOutPort("out");
                        } 
                        var points = this.state.app.getDiagramEngine().getRelativeMousePoint(event);
                        node.x = points.x;
                        node.y = points.y;
                        console.log(this.state.app.getMsInPort());
                       
                        this.state.app
                            .getDiagramEngine()
                            .getDiagramModel()
                            .addAll(node);

                        this.forceUpdate();
                       
                        /*
                        var link = port.link(this.state.app.getMsInPort());
                        link.addLabel("OK");
    
                        this.state.app
                            .getDiagramEngine()
                            .getDiagramModel()
                            .addAll(link);

                        this.forceUpdate();
                        */
                        //this.showModal(data.name);
                        this.forceUpdate();

                        

                    }}
                    onDragOver={event => {
                        event.preventDefault();
                    }}
                    >
                    <SRD.DiagramWidget className={styles.srdDemoCanvas} diagramEngine={this.state.app.getDiagramEngine()}  />
                </div>
            </div>
        )
    }
}