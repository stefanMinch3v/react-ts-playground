import { Outlet } from 'react-router-dom';

import MainHeader from '../components/navigation/MainHeader';

export default function Root() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
