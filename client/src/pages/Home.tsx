import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateUser from '../components/CreateUser';
import UpdateScore from '../components/UpdateScore';

function Home () {
    const [action, setAction] = useState('createUser');
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:5000/api/logout', {
                method: 'POST',
                credentials: 'include' // 🔥 MUST
            });

            if (res.ok) {
                // 🔥 Redirect to login
                navigate('/login');
            }
        } catch (err) {
            console.error('Logout failed', err);
        }
    }, []);

    const handleDownload = useCallback(async() => {
        const response = await fetch("http://localhost:5000/download");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
    }, []);

    return ( 
        <>
            <h1>Vites + React</h1>
            <button onClick={() => setAction('createUser')}> Create user </button>
            <button onClick={() => setAction('updateScore')}> Update score </button>
            <button onClick={handleDownload}> Download file </button>
            <button onClick={handleLogout}>Logout</button>

            { action === 'createUser' && <CreateUser/> }
            { action === 'updateScore' && <UpdateScore/> }
        </>
    )
}

export default Home;