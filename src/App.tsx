import CommonLayout from './components/layout/CommonLayout';
import DocumentTitleUpdater from './components/layout/DocumentTitleUpdater';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <CommonLayout>
      <DocumentTitleUpdater />
      <Outlet />
    </CommonLayout>
  );
};

export default App;
