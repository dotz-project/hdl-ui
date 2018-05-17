import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Form, Card, Select, List, Divider, Button, Icon  } from 'antd';

import TagSelect from 'components/TagSelect';
import AvatarList from 'components/AvatarList';
import Ellipsis from 'components/Ellipsis';
import StandardFormRow from 'components/StandardFormRow';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './List.less';

const { Option } = Select;
const FormItem = Form.Item;

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class ComponentList extends PureComponent {
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
    const {loading, form } = this.props;
    const { getFieldDecorator } = form;

    
    const list = [
      {
        'name' : 'MongoDB Atlas',
        'avatar': 'mongo.png',
        'description': 'MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma'
      },
      {
        'name' : 'SQL Server',
        'avatar': 'sqlserver.png',
        'description': 'O Microsoft SQL Server é um sistema gerenciador de Banco de dados relacional (SGBD) desenvolvido pela Microsoft'
      },
      {
        'name' : 'Karafka',
        'avatar': 'karafka.png',
        'description': 'Apache Kafka é uma plataforma distribuída de mensagens e streaming'
      },
      {
        'name' : 'Rabbitmq',
        'avatar': 'cloudmqp.png',
        'description': 'RabbitMQ é um software de código aberto que foi implementado para suportar um protocolo de mensagens denominado Advanced Message Queuing'
      },
      {
        'name' : 'Redis',
        'avatar': 'redis.png',
        'description': 'O Redis é um armazenamento de estrutura de dados de chave-valor de código aberto e na memória'
      },
      {
        'name' : 'Elastic',
        'avatar': 'elastic.png',
        'description': ' Elasticsearch é um mecanismo de busca open source para pesquisas full-text'
      },
      {
        'name': 'Cassandra',
        'avatar': 'cassandra.png',
        'description': 'Apache Cassandra é um projeto de sistema de banco de dados distribuído altamente escalável de segunda geração, que reúne a arquitetura do DynamoDB, da Amazon Web Services e modelo de dados baseado no BigTable, do Google'
      },
      {
        'name': 'Kibana',
        'avatar': 'kibana.png',
        'description': 'O Kibana é um plugin de visualização de dados de fonte aberta para o Elasticsearch.'
      }
    ]

    const list2 = [
      {
        'name' : 'Members',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for obtaining and maintaining member data'
      },
      {
        'name': 'Sign',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for registering and login'
      },
      {
        'name': 'Redemptions',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for redemptions'
      },
      {
        'name': 'Wallet',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for wallet'
      },
      {
        'name': 'Rewards',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for rewards'
      },
      {
        'name': 'Agreements',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for agreements'
      },
      {
        'name': 'Billing',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for billing'
      },
      {
        'name': 'Deposits',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for deposits'
      },
      {
        'name': 'Offers',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for offers'
      },
      {
        'name': 'Purple',
        'avatar': 'dotz.png',
        'description': 'API feature responsible for purple'
      },
    ]

    
    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={['', ...list]}
        renderItem={item => 
          item ? (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.avatar} height={154} />}
            >
              <Card.Meta
                title={<a href="#">{item.name}</a>}
                description={<Ellipsis lines={2}>{item.description}</Ellipsis>}
              />
              
            </Card>
          </List.Item>
        ):(
          <List.Item>
            <Button type="dashed" className={styles.newButton}>
              <Icon type="plus" /> Create
            </Button>
          </List.Item>
        )}
      />
    ) : null;

    const cardList2 = list2 ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={['', ...list2]}
        renderItem={item => 
          item ? (
          <List.Item>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.title} src={item.avatar} height={154} />}
            >
              <Card.Meta
                title={<a href="#">{item.name}</a>}
                description={<Ellipsis lines={2}>{item.description}</Ellipsis>}
              />

            </Card>
          </List.Item>
        ):(
          <List.Item>
            <Button type="dashed" className={styles.newButton}>
              <Icon type="plus" /> Create
            </Button>
          </List.Item>
        )
      }
      />
    ) : null;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <PageHeaderLayout
        title="Components"
        content="List with all available components"
      >
      <h2>The 3rd</h2>
      <div className={styles.coverCardList}>
        <div className={styles.cardList}>{cardList}</div>
      </div>
      <Divider />
      <h2>Our</h2>
        <div className={styles.coverCardList}>
          <div className={styles.cardList}>{cardList2}</div>
        </div>
      </PageHeaderLayout>
    );
  }
}
