import { useCallback, useState } from 'react';
import CreateUser from '../components/CreateUser';
import UpdateScore from '../components/UpdateScore';

function Home () {
    const [action, setAction] = useState('createUser');

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

            { action === 'createUser' && <CreateUser/> }
            { action === 'updateScore' && <UpdateScore/> }
        </>
    )
}

export default Home;