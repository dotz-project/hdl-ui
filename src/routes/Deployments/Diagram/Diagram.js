import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import {Form,Input,DatePicker,Select,Button,Card,InputNumber,Radio,Icon,Tooltip,Divider,List,Checkbox,Row,Col,Avatar,Menu,Modal} from 'antd';
import * as SRD from "storm-react-diagrams"
require("storm-react-diagrams/dist/style.min.css");

import {TrayWidget} from './TrayWidget'
import {TrayItemWidget} from "./TrayItemWidget";
import {Application} from "./Application";

import ModalSolution from "./ModalSolution";

import styles from './Diagram.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))

@Form.create()
export default class Diagram extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            app: new Application(),
            modal : {
                component : {
                    name : "",
                    visible : false,
                    data : {}
                },
                solution: {
                    name: "",
                    visible: false,
                    data: {},
                }
            }
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.delSolution = this.delSolution.bind(this);
        this.editSolution = this.editSolution.bind(this);

        this.showComponentModal = this.showComponentModal.bind(this);
        this.handleComponentModalOk = this.handleComponentModalOk.bind(this);
        this.handleComponentModalCancel = this.handleComponentModalCancel.bind(this);

        this.showSolutionModal = this.showSolutionModal.bind(this);
        this.handleSolutionModalOk = this.handleSolutionModalOk.bind(this);
        this.handleSolutionModalCancel = this.handleSolutionModalCancel.bind(this);

    }

    showComponentModal(name,data){
        this.setState({
            modal : {
                ...this.state.modal,
                component : {
                    visible: true,
                    name : name,
                    data: data
                }
            }
        });
    }

    handleComponentModalOk(e){
        e.preventDefault();
        this.setState({
            modal: {
                ...this.state.modal,
                component: {
                    visible: false
                }
            }
        });
    }

    handleComponentModalCancel(e){
        e.preventDefault();
        this.setState({
            modal: {
                ...this.state.modal,
                component: {
                    visible: false
                }
            }
        });
    }

    showSolutionModal(e) {
        e.preventDefault();
        this.setState({
            modal: {
                ...this.state.modal,
                solution: {
                    visible: true,
                    name: "",
                    data: {}
                }
            }
        });
    }

    handleSolutionModalOk(e) {
        e.preventDefault();
        this.setState({
            modal: {
                ...this.state.modal,
                solution: {
                    visible: false
                }
            }
        });
    }

    handleSolutionModalCancel(e) {
        e.preventDefault();
        this.setState({
            modal: {
                ...this.state.modal,
                solution: {
                    visible: false
                }
            }
        });
    }

    addSolution(sol){
        _solutions = this.props.form.getFieldsValue('solutions')
        _solutions.push(sol)
        this.props.form.setFieldsValue({ solutions: _solutions})
    }
    
    delSolution(e) {
        e.preventDefault();
        var _solutions = this.props.form.getFieldValue('solutions');
        this.props.form.setFieldsValue({ solutions: [] })
    }

    editSolution(e) {
        _solutions = this.props.form.getFieldsValue('solutions')
        _solutions.push(sol)
        this.props.form.setFieldsValue({ solutions: _solutions })
    }

    handleCreate(e) {
        e.preventDefault();
        
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                this.props.dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    }

    handleCancel(e) {
        console.log(e)
    }

    ms;
    msp;

    componentDidMount() {
        /** Carrega dos ambientes */
        this.props.dispatch({type:'environments/list',payload:{}});
        /** Carrega os componentes disponíveis */
        this.props.dispatch({type:'components/list',payload:{}});
        /** Cria o node referente ao deployment */
        this.ms = new SRD.DefaultNodeModel("MICRO SERVIÇO", "rgb(0,192,255)");
        this.ms.setPosition(140, 100);
        this.msp = this.ms.addInPort(" ");
        /** Adiciona no palco */
        this.state.app.getDiagramEngine().getDiagramModel().addAll(this.ms);
        this.props.form.setFieldsValue({ solutions: [] })

    }

    render() {
        const { submitting } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
                md: { span: 6 },
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                md: { span: 18 },
                xs: { span: 24 },
                sm: { span: 12 }
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                md: { span: 24, offset: 0 },
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        const data = [
            'MicroServico.API.Default',
            'MicroServico.API.Private'
        ];

        const fields = {
            "name": "API.Private",
            "tecnology": "netcore",
            "public": false,
            "http": false,
            "https": false,
            "consumer": false,
            "worker": false
        };

        return (
            <div className="content">
                {/*Modal Components*/}
                <Modal 
                    title={this.state.modal.component.name} 
                    visible={this.state.modal.component.visible} 
                    onOk={this.handleComponentModalOk} 
                    onCancel={this.handleComponentModalCancel} 
                    okText="OK" 
                    cancelText="Close" >
                    <p>Para continuar e adicionar este componente por favor preencha os campos abaixo:</p>
                    <hr />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                {/*Modal Solutions*/}
                <ModalSolution
                    title = "Solution"
                    visible = {this.state.modal.solution.visible}
                    onOk={this.handleSolutionModalOk}
                    onCancel={this.handleSolutionModalCancel}
                    onSuccess = {(data)=>{
                        var _solutions = this.props.form.getFieldValue('solutions');
                        if (typeof _solutions != "object"){
                            _solutions = [];    
                        }
                        _solutions.push(data.solution);
                        this.props.form.setFieldsValue({'solutions': _solutions});
                        this.setState({
                            modal: {
                                ...this.state.modal,
                                solution: {
                                    visible: false
                                }
                            }
                        });             
                    }}
                    onFail={(err) => { console.log(err)}}
                    okText="OK"
                    cancelText="Close" />
                
                {/*View Application*/}
                <Row>
                    {/*First col form*/}
                    <Col span={10}>
                        <Card bordered={false}>
                            <Form onSubmit={this.handleCreate}  hideRequiredMark className={styles.advancedForm}>
                                <FormItem { ...formItemLayout} label="Name" style={{ margin: 0 }}>
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: 'Please correctly fill in the name of deployment.',}],
                                    })(<Input placeholder="MicroServico" />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Environments" style={{ margin: 0 }}>
                                    {getFieldDecorator('environments', {
                                        rules: [{required: true,message: 'Please select at least one.'}],
                                    })(
                                        <Select
                                            mode="multiple"
                                            placeholder="Environments"
                                            style={{
                                                margin: '8px 0',
                                            }} >
                                            <Option value="1">DEV</Option>
                                            <Option value="2">UAT</Option>
                                            <Option value="3">PROD</Option>
                                            <Option value="4">NEXT.DEV</Option>
                                            <Option value="5">NEXT.UAT</Option>
                                            <Option value="6">NEXT.PROD</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Git/URL" style={{ margin: 0 }}>
                                    {getFieldDecorator('girUrl', {
                                        rules: [{required: true, message: 'Please correctly fill in the git url.'}],
                                    })(<Input placeholder="git@github.com:dotz-project/hdl-api.git" />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Git/Branch" style={{ margin: 0 }}>
                                    {getFieldDecorator('girBrach', {rules: [{required: true,message: 'Please correctly fill in the git branch.'}],
                                    })(<Input placeholder="master"  setFieldsValue="master"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Solutions" style={{ margin: 0 }}>
                                    {getFieldDecorator('solutions', { rules: [{required: true,message: 'Please add at least one.'}],
                                    })(
                                        <List
                                            setFieldsValue={{}}
                                            size="small"
                                            footer={<Button type="dashed" htmlType="submit" style={{width:'100%'}} size="small" onClick={this.showSolutionModal} >Add Solution</Button>}
                                            bordered
                                            dataSource={this.props.form.getFieldValue('solutions')}
                                            renderItem={item => (
                                                <List.Item style={{ fontSize: 10 }} actions={[<Button icon="edit" size="small" onClick={this.editSolution} data={item} />, <Button type="danger" icon="delete" onClick={this.delSolution} data={item} size="small" />]}>
                                                        {item.name}
                                                </List.Item>
                                            )}
                                        />
                                    )}
                                   
                                </FormItem>
                                {/*
                                <FormItem {...formItemLayout} label="Advanced" style={{ margin: 0 }}>
                                    <Button.Group size="default">
                                        <Button type="primary" icon="solution" ><small> Dockerfile </small></Button>
                                        <Button type="primary" icon="cloud" ><small> POD (yml)</small></Button>
                                        <Button type="primary" icon="download" ><small> Ing (yml) </small></Button>
                                    </Button.Group>
                                </FormItem>
                                */}
                                <Divider />
                                <FormItem  style={{ marginTop: 0 }}>
                                    <Button.Group size="large" style={{ width: '100%' }}>
                                        <Button style={{ width: '25%' }}>CANCEL</Button>
                                        <Button type="primary" style={{ width: '75%' }} htmlType="submit" loading={submitting} >CREATE</Button>
                                    </Button.Group>
                                </FormItem>
                                {getFieldDecorator('components',{ rules: [{ required: false, message: '' }] })(<Divider />)}
                            </Form>
                        </Card>








































                        
                    </Col> 
                    {/*Second col diagram canvas*/}
                    <Col span={14}>
                        <Row>
                            {/*Ours Components*/}
                            <Col span={4} offset={1}>
                                <TrayWidget>
                                    <TrayItemWidget model={{ type: "out", name: "Members" }} icon="team" name="Members" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "SignUp" }}  icon="user" name="SignUp" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Wallet" }}  icon="wallet" name="Wallet" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Rewards" }}  icon="gift" name="Rewards" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Redemptions" }}  icon="bank" name="Redemptions" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Agreements" }}  icon="form" name="Agreements" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Billing" }}  icon="calculator" name="Billing" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Deposits" }} icon="download" name="Deposits" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Offers" }}  icon="shop" name="Offers" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Purple" }}  icon="star" name="Purple" color="rgb(95,125,100)" />
                                </TrayWidget>
                            </Col>
                            {/*Diagram Canvas*/}
                            <Col span={15}>
                                <div
                                    className="diagram-layer"
                                    onDrop={ event => {
                                        var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
                                        var nodesCount = Object.keys(this.state.app.getDiagramEngine().getDiagramModel().getNodes()).length;
                                        var node = null;
                                        var port;
                                        node = new SRD.DefaultNodeModel(data.name, "rgb(192,255,0)");
                                        port = node.addOutPort(" ");
                                        /*var points = this.state.app.getDiagramEngine().getRelativeMousePoint(event);
                                        node.x = points.x;
                                        node.y = points.y;*/
                                        var link = port.link(this.msp);
                                        this.state.app.getDiagramEngine().getDiagramModel().addAll(node, link);
                                        this.forceUpdate();
                                        this.showComponentModal(data.name);
                                        this.props.form.setFieldsValue({ components: this.state.app.getDiagramEngine().getDiagramModel().getNodes() })
                                    }}
                                    onDragOver={event => {
                                        event.preventDefault();
                                    }}
                                >
                                    <SRD.DiagramWidget smartRouting={false} className={styles.srdDemoCanvas} diagramEngine={this.state.app.getDiagramEngine()} />
                                </div>
                            </Col>
                            {/*3rd Components*/}
                            <Col span={4} >
                                <TrayWidget>
                                    <TrayItemWidget model={{ type: "out", name: "Mongo" }} icon="database" name="Mongo" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Kafka" }} icon="database" name="Kafka" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "AMPQ" }} icon="database" name="AMPQ" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Redis" }} icon="database" name="Redis" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Cassandra" }} icon="database" name="Cassandra" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "SQL Server" }} icon="database" name="SQL Server" color="rgb(95,125,100)" />
                                    <TrayItemWidget model={{ type: "out", name: "Elastic" }} icon="database" name="Elastic" color="rgb(95,125,100)" />
                                    
                                </TrayWidget>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}