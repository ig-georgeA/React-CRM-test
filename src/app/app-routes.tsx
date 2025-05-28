import { redirect } from 'react-router-dom';
import Home from './home/home';
import Accounts from './accounts/accounts';
import AccountDetail from './account-detail/account-detail';
import Contacts from './contacts/contacts';
import Contracts from './contracts/contracts';
import Reports from './reports/reports';
import Calendar from './calendar/calendar';
import Tasks from './tasks/tasks';

export const routes = [
  { index: true, loader: () => redirect('home') },
  { path: 'home', element: <Home />, text: 'Home' },
  { path: 'accounts', element: <Accounts />, text: 'Accounts' },
  { path: 'account-detail/:rCustomerID', element: <AccountDetail />, text: 'Account detail' },
  { path: 'contacts', element: <Contacts />, text: 'Contacts' },
  { path: 'contracts', element: <Contracts />, text: 'Contracts' },
  { path: 'reports', element: <Reports />, text: 'Reports' },
  { path: 'calendar', element: <Calendar />, text: 'Calendar' },
  { path: 'tasks', element: <Tasks />, text: 'Tasks' }
];
