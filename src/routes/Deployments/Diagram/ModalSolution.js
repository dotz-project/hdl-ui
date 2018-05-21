import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Divider, List, Checkbox, Row, Col, Avatar, Menu, Modal, Switch } from 'antd';
import * as SRD from "storm-react-diagrams"
require("storm-react-diagrams/dist/style.min.css");
import { TrayWidget } from './TrayWidget'
import { TrayItemWidget } from "./TrayItemWidget";
import { Application } from "./Application";

import styles from './Diagram.less';

const InputGroup = Input.Group;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))

@Form.create()
export default class ModalSolution extends PureComponent {

    constructor(props) {
        super(props);
        this.showSolutionModal = this.showSolutionModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

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

    handleCancel(e) {
        e.preventDefault();
        this.props.onCancel(e);
    }
    
    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            if (!err) {
                this.props.onSuccess(values);
            } else {
                this.props.onFail(err);
            }
        });
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.onCancel(e);
        console.log(e)
    }
   
    componentDidMount() {
   
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
            <Modal
                title={this.props.title }
                visible = { this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="OK"
                cancelText="Close" >
                <Form onSubmit={this.handleUp} hideRequiredMark className={styles.advancedForm}>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Name" style={{ margin: 0 }}>
                                {getFieldDecorator('solution.name', {
                                    rules: [{ required: true, message: 'Enter name' }],
                                })(<Input placeholder="MicroService.API.Default" />)}
                            </FormItem>
                        </Col>
                        <Col span={8} offset={1}>
                            <FormItem label="Tecnology" style={{ margin: 0 }}>
                                {getFieldDecorator('solution.tecnology', {
                                    rules: [{ required: true, message: 'Enter name' }],
                                })(
                                    <Select
                                        mode="simple"
                                        placeholder="Tecnology"
                                        style={{
                                            margin: '00',
                                        }} >
                                        <Option value="1">netcore</Option>
                                        <Option value="2">golang</Option>
                                        <Option value="3">react</Option>
                                        <Option value="4">angular</Option>
                                        <Option value="5">node</Option>
                                        <Option value="6">php</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem
                                label="Application Type"
                                >
                                {getFieldDecorator('solution.type', {
                                    rules: [{ required: true, message: 'Select application type' }]
                                })(
                                    <RadioGroup  >
                                        <RadioButton value="0">Consumer</RadioButton>
                                        <RadioButton value="1">Web Aplication</RadioButton>
                                        <RadioButton value="2">Worker</RadioButton>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                        {this.props.form.getFieldValue('solution.type') == 1 &&
                        <Col span={12}>
                            <FormItem
                               
                                label="Activate HTTP Protocol"
                                >
                                {getFieldDecorator('solution.http', {
                                    rules : [],
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Switch />
                                )}
                            </FormItem>
                        </Col>
                        }
                        {this.props.form.getFieldValue('solution.type') == 1 &&

                        <Col span={12}>
                            <FormItem
                                
                                label="Activate HTTPS Protocol"
                                >
                                {getFieldDecorator('solution.https', {
                                    rules : [],
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(
                                    <Switch/>
                                )}
                            </FormItem>
                        </Col>
                        }
                       
                        { this.props.form.getFieldValue('solution.type') == 2 &&
                        <Col span={24}>
                            <FormItem
                                visible ={false}
                                label="Worker cronjob configure"
                                >
                                {getFieldDecorator('solution.worker', {
                                    rules: [],
                                })(
                                    <InputGroup compact>
                                        <Input style={{ width: '10%' }} placeholder="mm" defaultValue="" />
                                        <Input style={{ width: '10%' }} placeholder="hh" defaultValue="" />
                                        <Input style={{ width: '10%' }} placeholder="dd" defaultValue="" />
                                        <Input style={{ width: '10%' }} placeholder="MM" defaultValue="" />
                                        <Input style={{ width: '10%' }} placeholder="ss" defaultValue="" />
                                    </InputGroup>
                                    
                                )}
                            </FormItem>
                        </Col>
                        }
                        
                    </Row>
                </Form>
            </Modal>
        );
    }
}