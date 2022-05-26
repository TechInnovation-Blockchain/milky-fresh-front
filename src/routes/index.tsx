import { useRoutes } from 'react-router-dom';

// layouts
import LandingLayout from 'layout/landing';
import MainLayout from 'layout/main';
// pages
import Home from "views/home";
import Swap from "views/swap";
import Farm from "views/farm";

import Test from 'components/Test';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes(
    process.env.REACT_APP_PRODUCTION !== 'DEV' ? [
      {
        path: '/',
        element: <LandingLayout />,
        children: [
          { index: true, element: <Home /> },
        ],
      },
      {
        path: '/swap',
        element: <MainLayout />,
        children: [
          { index: true, element: <Swap /> }
        ]
      },
      {
        path: '/farm',
        element: <MainLayout />,
        children: [
          { index: true, element: <Farm /> }
        ]
      },
    ] : [
      {
        path: '/',
        element: <Test/>
      }
    ]
  );
}