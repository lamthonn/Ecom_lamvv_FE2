import { Button } from 'antd';
import MainLayout from '../../../layout/MainLayout';
import { axiosConfig } from '../../../config/configApi';


const Dashboard = () => {
    const handleClick =() => {
        axiosConfig.get('/api/Authen/TestConnect')
        .then((res:any) => {
            console.log(res);
        })
        .catch((err:any) => {
            console.log(err);
        })
    }

    return(
        <MainLayout>
            <Button onClick={handleClick}>Dashboard</Button>
        </MainLayout>
    )
}
export default Dashboard;
