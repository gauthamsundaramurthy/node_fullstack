import React, { useCallback, useState } from 'react';

type FormData = {
  email: string;
  password: string;
  name: string;
  age: number | "";
};

function CreateUser() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        name: "",
        age: ""
    });

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? Number(value): value
        }))
    }, []);

    const handleOnSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/users", { // TODO send credentials
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log('Create user success', data)
    }, [formData])

    return (
        <form name="user-form" id="user-form" onSubmit={handleOnSubmit}>
            <div>
                <label> Email </label>
                <input type="text" name="email" onChange={handleOnChange} value={formData.email}></input>
            </div>
            <div>
                <label> Password </label>
                <input type="text" name="password" onChange={handleOnChange} value={formData.password}></input>
            </div>
            <div>
                <label> Name </label>
                <input type="text" name="name" onChange={handleOnChange} value={formData.name}></input>
            </div>
            <div>
                <label> Age </label>
                <input type="number" name="age" onChange={handleOnChange} value={formData.age}></input>
            </div>
            <input type="submit" value="submit"></input>
        </form>
    );
}

export default CreateUser;