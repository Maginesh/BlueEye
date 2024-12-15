import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Analytics from 'pages/analytics';
import MapComponent from 'pages/map';
import Home from 'pages/home';
import DashboardDefaultNew from 'pages/dashboard2.0';
import BulkDs from 'pages/bulkDs';
import Alerts from 'pages/alerts';
import CardContainer from 'pages/fms';
import Spoc from 'pages/spoc';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const HomePage = Loadable(lazy(() => import('pages/home/index')))


const MainRoutes = {
  // path: '/',
  // element: <Dashboard />,
  // children: [
  //   {
  //     path: '/',
  //     element: <DashboardDefault />
  //   },
  //   {
  //     path: 'dashboard',
  //     children: [
  //       {
  //         path: 'default',
  //         element: <DashboardDefault />
  //       }
  //     ]
  //   },
  //   {
  //     path: 'analytics',
  //     children: [
  //       {
  //         path: '/analytics',
  //         element: <Analytics/>
  //       }
  //     ]
  //   },
  //   {
  //     path: 'map',
  //     children: [
  //       {
  //         path: '/map',
  //         element: <MapComponent/>
  //       }
  //     ]
  //   }
  // ]

  path: '/',
  children: [
    {
      path: '/',
      element: <HomePage /> 
    },
    {
      path: 'default',
      element: <DashboardDefault />
    },
    {
      path: 'analytics',
      element: <Analytics />
    },
    {
      path: 'map',
      element: <MapComponent />
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'analytics',
          element: <BulkDs />
        },
        {
          path: 'map',
          element: <MapComponent />
        },
        {
          path: 'alerts',
          element: <Alerts />
        },
        {
          path: 'fms',
          element: <CardContainer/>
        },
        {
          path: 'spoc',
          element: <Spoc />
        },
    
      ]
    }
  ]


};

export default MainRoutes;
