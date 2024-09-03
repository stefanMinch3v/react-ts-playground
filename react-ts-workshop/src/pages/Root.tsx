import { Outlet } from 'react-router-dom';

import MainHeader from '../components/navigation/MainHeader';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function Root() {
  return (
    <Provider store={store}>
      <MainHeader />
      <Outlet />
    </Provider>
  );
}
