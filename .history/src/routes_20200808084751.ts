// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';
import Language from '@material-ui/icons/Language';
// core components/views for Admin layout
import DashboardPage from './views/Dashboard/Dashboard';
import UserProfile from './views/UserProfile/UserProfile';
import TableList from './views/TableList/TableList';
import Typography from './views/Typography/Typography';
import Icons from './views/Icons/Icons';
import Maps from './views/Maps/Maps';
import NotificationsPage from './views/Notifications/Notifications';
import UpgradeToPro from './views/UpgradeToPro/UpgradeToPro';
// core components/views for RTL layout
import RTLPage from './views/RTLPage/RTLPage';

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
    name: 'Clientes',   
    icon: Person,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin'
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
    component: Typography,
    layout: '/admin'
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
    component: Icons,
    layout: '/admin'
  },
 
  {
    path: '/notifications',
    name: 'Notifications',

    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin'
  },
  
];

export default dashboardRoutes;
