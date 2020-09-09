// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import Notifications from '@material-ui/icons/Notifications';

// core components/views for Admin layout
import DashboardPage from './views/Dashboard/Dashboard';
import UserProfile from './views/UserProfile/UserProfile';
import TableList from './views/TableList/TableList';

import NotificationsPage from './views/Notifications/Notifications';
  
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Reservas',   

    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/user',
    name: 'formulario ejmplo',   
    icon: Person,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/table',
    name: 'tabla ejemplo',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin'
  },
  
  {
    path: '/notifications',
    name: 'notificaciones',

    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin'
  },
  
];

export default dashboardRoutes;
