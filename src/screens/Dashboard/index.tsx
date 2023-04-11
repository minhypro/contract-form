import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <h2 className='mb-4'>Contract form</h2>
      <Button onClick={() => navigate('/contract-form')}>Add new contract</Button>
    </div>
  );
}
export default Dashboard;
