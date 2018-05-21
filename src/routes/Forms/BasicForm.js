import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Divider,
  List,
  Modal,
  Checkbox,
  Row,
  Col,
  Avatar
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      compName: ""
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

  }

  showModal(compName) {
    this.setState({
      visible: true,
      compName: compName
    });
  }

  handleOk(e) {

    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  }




  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };


    const data = [
      'MicroServico.API.Default',
      'MicroServico.API.Private',
      'MicroServico.UI.Default'
    ];

    const fields =
      {
        "name": "API.Private",
        "tecnology": "netcore",
        "public": false,
        "http": false,
        "https": false,
        "consumer": false,
        "worker": false
      };
    return (

        <Card bordered={false}>

          <h2>Deployment Config</h2>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem label="Name" style={{ margin: 0 }}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Enter deployment name',
                  },
                ],
              })(<Input placeholder="MicroServico" />)}
            </FormItem>
            <FormItem label="Environments" style={{ margin: 0 }}>
              <Select
                mode="multiple"
                placeholder="Environments"
                style={{
                  margin: '8px 0',
                }}
              >
                <Option value="1">DEV</Option>
                <Option value="2">UAT</Option>
                <Option value="3">PROD</Option>
                <Option value="4">NEXT.DEV</Option>
                <Option value="5">NEXT.UAT</Option>
                <Option value="6">NEXT.PROD</Option>
              </Select>
            </FormItem>
         
            <FormItem label="Git/URL" style={{ margin: 0 }}>
              {getFieldDecorator('gitURL', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
            })(<Input placeholder="git@github.com:dotz-project/hdl-api.git" />)}
            </FormItem>

          <FormItem label="Git/Branch" style={{ margin: 0 }}>
              {getFieldDecorator('gitBranch', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(<Input placeholder="master" />)}
            </FormItem>


          <FormItem label="Solutions" style={{ margin: 0 }}>
          
          </FormItem>
          
          
          <List
            size="small"
            footer={<Button type="primary" htmlType="submit" onClick={()=>{this.showModal('')}} >Add</Button>}
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item actions={[<Button icon="edit" size="small" />, <Button type="danger" icon="delete" size="small" />]}>
                <List.Item.Meta
                  title={item}
                />
              </List.Item>
            )}
          />



          <FormItem label="Advanced" style={{ margin: 0 }}>

            <Button.Group size="default">

              <Button type="primary" icon="solution" ><small> Dockerfile </small></Button>
              <Button type="primary" icon="cloud" ><small> POD (yml)</small></Button>
              <Button type="primary" icon="download" ><small> Ing (yml) </small></Button>

            </Button.Group>
          </FormItem>


          <Divider />

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                OK
              </Button>
              <Button style={{ marginLeft: 8 }}>CANCEL</Button>
            </FormItem>
          </Form>
        </Card>
    );
  }
}
