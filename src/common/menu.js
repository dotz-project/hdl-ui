import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Environments',
    icon: 'environment',
    path: 'environments',
    
  },
  {
    name: 'Components',
    icon: 'appstore',
    path: 'components',

  },
  {
    name: 'Deployments',
    icon: 'rocket',
    path: 'deployments',
    children: [
      {
        name: 'Dashboard',
        path: 'diagram0',
      },{
        name: 'New Deployment',
        path: 'diagram',
      },{
        name: 'All Deployments',
        path: 'diagram2'
      },{
        name: 'All Builds',
        path: 'diagram3',
      }, {
        name: 'Monitor',
        path: 'diagram4',
      }
    ]
  },
  {
    name: 'Users',
    icon: 'user',
    path: 'users',

  },
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    hideInMenu: true,
    children: [
      {
        name: 'Analysis',
        path: 'analysis',
      },
      {
        name: 'Monitor',
        path: 'monitor',
        hideInMenu: true,
      },
      {
        name: 'Workplace',
        path: 'workplace',
        // hideInBreadcrumb: true,
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'Form',
    icon: 'form',
    path: 'form',
    hideInMenu: true,
    children: [
      {
        name: 'Basic Form',
        path: 'basic-form',
      },
      {
        name: 'Step Form',
        path: 'step-form',
      },
      {
        name: 'Advanced Form',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: 'Table',
    icon: 'table',
    path: 'list',
    hideInMenu: true,

    children: [
      {
        name: 'Table list',
        path: 'table-list',
      },
      {
        name: 'Basic List',
        path: 'basic-list',
      },
      {
        name: 'Card List',
        path: 'card-list',
      },
      {
        name: 'Search',
        path: 'search',
        children: [
          {
            name: 'Articles',
            path: 'articles',
          },
          {
            name: 'Projects',
            path: 'projects',
          },
          {
            name: 'Applications',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: 'Profile',
    icon: 'profile',
    path: 'profile',
    hideInMenu: true,

    children: [
      {
        name: 'Basic',
        path: 'basic',
      },
      {
        name: 'Advanced',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: 'Result',
    icon: 'check-circle-o',
    path: 'result',
    hideInMenu: true,

    children: [
      {
        name: 'Success',
        path: 'success',
      },
      {
        name: 'Fail',
        path: 'fail',
      },
    ],
  },
  {
    name: 'Warnings',
    icon: 'warning',
    path: 'exception',
    hideInMenu: true,

    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: 'Trigger',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'Users',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    hideInMenu: true,
    children: [
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'Register',
        path: 'register',
      },
      {
        name: 'Register Result',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
