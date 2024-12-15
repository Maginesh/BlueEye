import { DashboardOutlined, LineChartOutlined, EnvironmentOutlined, AlertOutlined, CloudOutlined , UserSwitchOutlined, LogoutOutlined} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  LineChartOutlined,
  EnvironmentOutlined,
  AlertOutlined,
  CloudOutlined,
  UserSwitchOutlined,
  LogoutOutlined
};


const dashboard = {
  id: 'group-dashboard',
  title: 'Components',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: true
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/dashboard/analytics',
      icon: icons.LineChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'map',
      title: 'Map',
      type: 'item',
      url: '/dashboard/map',
      icon: icons.EnvironmentOutlined,
      breadcrumbs: false
    },
    {
      id: 'alerts',
      title: 'Alerts',
      type: 'item',
      url: '/dashboard/alerts',
      icon: icons.AlertOutlined,
      breadcrumbs: false
    },
    {
      id: 'fms',
      title: 'FMS',
      type: 'item',
      url: '/dashboard/fms',
      icon: icons.CloudOutlined,
      breadcrumbs: false
    },
    {
      id: 'spoc',
      title: 'SPOC Details',
      type: 'item',
      url: '/dashboard/spoc',
      icon: icons.UserSwitchOutlined,
      breadcrumbs: false
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/dashboard/logout',
      icon: icons.LogoutOutlined,
      breadcrumbs: false
    },
  ]
};

export default dashboard;
