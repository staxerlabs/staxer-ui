import { Dashboard } from './Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { Onboard } from './examples/Onboard';
import { BatchExample } from './examples/BatchExample';


const links = [
  { path: '/gas-free', label: 'Onboard', element: <Onboard /> },
  // { path: '/bundle', label: 'Bundle Transactions', element: <BatchExample /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard children={<Outlet />}
      links={links} />,
    errorElement: <Navigate to={'/'} replace />,
    children: [
      {
        index: true,
        element: <Navigate to={links[0].path} replace />
      },
      ...links
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
