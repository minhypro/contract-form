import { Route, Routes as ReactRoutes } from 'react-router-dom';

import ContractForm from 'screens/ContractForm/index';
import Dashboard from 'screens/Dashboard/index';

function Routes() {
  return (
    <ReactRoutes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/contract-form" element={<ContractForm />} />
    </ReactRoutes>
  );
}

export default Routes;
