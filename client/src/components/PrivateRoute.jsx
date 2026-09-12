import { Outlet } from 'react-router-dom';

// Placeholder skeleton — real auth check + redirect lands in task 18.
function PrivateRoute() {
  return <Outlet />;
}

export default PrivateRoute;
