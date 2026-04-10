import { useCallback } from 'react'

function Home () {
    const handleUserLogin = useCallback(async () => {
    const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name: "Gautham",
        age: 25,
        email: 'gautham.oct3@gmail.com'
        })
    });
    const data = await res.json();
    console.log('Login submit> ', data);
    }, []);

    const handleDownload = async() => {
    const response = await fetch("http://localhost:5000/download");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    }

    const createUser = useCallback(async () => {
    const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name: "Ganguly",
        age: 51,
        email: 'ganguly@gmail.com'
        })
    });
    const data = await res.json();
    console.log('Create user success', data)
    }, []);

    const updateUserScore = useCallback(async () => {
    const res = await fetch("http://localhost:5000/users/update-score", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        email: "dhoni@gmail.com",
        score: 120
        })
    })
    const data = await res.json();
    console.log('Update user score -> ', data);
    }, []);

    return ( 
        <>
            <h1>Vites + React</h1>
            <button onClick={handleUserLogin}> Login </button>
            <button onClick={createUser}> Create user </button>
            <button onClick={updateUserScore}> Update user score </button>
            <button onClick={handleDownload}> Download file </button>
        </>
    )
}

export default Home;