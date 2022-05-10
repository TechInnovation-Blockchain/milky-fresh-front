import { useRoutes } from 'react-router-dom';

// layouts
import LandingLayout from 'layout/landing';
import MainLayout from 'layout/main';
// pages
import Home from "views/home";
import Swap from "views/swap";
import Farm from "views/farm";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
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
  ]);
}