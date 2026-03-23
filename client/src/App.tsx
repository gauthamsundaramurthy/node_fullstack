import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  useEffect(() => {
    const getRoot = async () => {
      const res = await fetch("http://localhost:5000");
      const data = await res.text();
      console.log('*** getRoot -> ', data);
    };

    const postUser = async () => {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Pragati",
          age: 18,
          email: 'pragati@gmail.com'
        })
      });
      const data = await res.json();
      console.log('*** post user api -> ', data);
    }

  const postLogin = async () => {
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
      console.log('*** post login api -> ', data);
    }

    const postAdmin = async () => {
      const res = await fetch("http://localhost:5000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "Admin",
          age: 60
        })
      });
      const data = await res.text();
      console.log('*** post admin api -> ', data);
    }
    
    //getRoot();
    postUser();
    //postAdmin();
    // postLogin();
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

  return (
    <>
      <h1>Vites + React</h1>
      <button onClick={handleDownload}>
          Download file
      </button>
    </>
  )
}

export default App
