import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip, Dropdown, Menu } from 'antd';


import * as SRD from "storm-react-diagrams"
require("storm-react-diagrams/dist/style.min.css");
require("./List.css");

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './List.less';


const { Option } = Select;
const FormItem = Form.Item;

const formatWan = val => {
  const v = val * 1;
  if (!v || isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <em className={styles.wan}>s</em>
      </span>
    );
  }
  return result;
};

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class EnvironmentList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    setTimeout(() => {
      form.validateFields(err => {
        if (!err) {
          dispatch({
            type: 'list/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  };


  render() {
    const { list: { list }, loading, form } = this.props;
    const { getFieldDecorator } = form;

    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>Nodes</p>
          <p>3</p>
        </div>
        <div>
          <p>VCPU/RAM</p>
          <p>8/18</p>
        </div>
        <div>
          <p>Pods</p>
          <p>
            <span style={{color : 'green'}}>12</span>/
            <span style={{ color: 'red' }}>3</span>
          </p>
        </div>
        <div>
          <p>Services</p>
          <p>5</p>
        </div>
        <div>
          <p>Deployments</p>
          <p>15</p>
        </div>
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );

    // 1) setup the diagram engine
    var engine = new SRD.DiagramEngine();
    engine.installDefaultFactories();

    // 2) setup the diagram model
    var model = new SRD.DiagramModel();

    // 3) create a default node
    var node1 = new SRD.DefaultNodeModel("MICRO SERVIÇO", "rgb(0,192,255)");
    let port1 = node1.addOutPort(" ");
    node1.setPosition(100, 100);

    // 4) create another default node
    var node2 = new SRD.DefaultNodeModel("Mongo", "rgb(192,255,0)");
    let port2 = node2.addInPort(" ");
    node2.setPosition(400, 100);


    var node3 = new SRD.DefaultNodeModel("Kafka", "rgb(192,255,0)");
    let port3 = node3.addInPort(" ");
    node3.setPosition(400, 300);

    var node4 = new SRD.DefaultNodeModel("Elastic", "rgb(192,255,0)");
    let port4 = node4.addInPort(" ");
    node4.setPosition(400, 500);


    // 5) link the ports
    let link1 = port1.link(port2);
    let link2 = port1.link(port3);
    let link3 = port1.link(port4);

    link1.addLabel("Custom label 1");

    // 6) add the models to the root graph
    model.addAll(node1, node2, node3, node4, link1, link2, link3);

    model.addListener({
      selectionChanged: action("selectionChanged")
    });
  

    // 7) load model into engine
    engine.setDiagramModel(model);


    return (
      <div style={{ width: '100vw', height: '100vh'}}>
        <SRD.DiagramWidget diagramEngine={engine} className={styles.srdDemoCanvas}/>
        </div>
    )

    return (
      <PageHeaderLayout
        title="Environments"
        content="List with all available environments"
      >

        <div className={styles.filterCardList}>
          
          <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip title="Downloads">
                      <Icon type="download" />
                    </Tooltip>,
                    <Tooltip title="Edit">
                      <Icon type="edit" />
                    </Tooltip>,
                    <Tooltip title="Share">
                      <Icon type="share-alt" />
                    </Tooltip>,
                    <Dropdown overlay={itemMenu}>
                      <Icon type="ellipsis" />
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
                  <div className={styles.cardItemContent}>
                    <CardInfo
                      activeUser={formatWan(item.activeUser)}
                      newUser={numeral(item.newUser).format('0,0')}
                    />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
