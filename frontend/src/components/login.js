import React, {useState} from "react";
import { Form, useNavigate } from "react-router-dom";
export default function Login(){
    const [form, setForm] = useState({ 
        name: "",
        password: "",
    });
    const navigate = useNavigate();

    function updateForm(value)
    {
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }
    async function onSubmit(e) {
    e.preventDefault();

    const newPerson = {...form};

    const response = await fetch("https://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
    .catch(error => {
        window.alert(error);
        return;
    });

    const data = await response.json();
    const { token, name} = data;
    console.log(name + " " + token)

    //save the JWT to localstorage
    localStorage.setItem("jwt", token);

    //optionally, save the username if needed
    localStorage.setItem("name", name);

    setForm({name: "", password: ""});
    navigate("/");
}
//html for the login page
return(
    <div>
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="tex" className="form-control" id="name"
                value={form.name}
                onChange={(e) => updateForm({name: e.target.value})}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">password</label>
                <input
                type="text"
                className="form-control"
                id="password"
                value={form.password}
                onChange={(e) => updateForm({password: e.target.value})}
                />
            </div>

            <div className="form-control">
                <input
                type="submit"
                value="Login"
                className="btn btn-primary"
                />
            </div>
        </form>
    </div>
 );
}