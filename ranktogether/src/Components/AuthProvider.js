import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";


function AuthProvider({ children }) {
    let [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/me")
            .then((r) => r.json())
            .then((data) => {
                if (!data.errors) {
                    setUser(data);
                }
            })
            .catch((error) => { console.log(error) })
    }, [])

    let signin = async (username, password) => {

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        }
        // do fetch to call /login in api
        return fetch("/login", configObj)
            .then((r) => r.json())
            .then((data) => {
                if (!data.error) {
                    setUser(data);
                }
                return data
            })
            .catch((error) => { console.log(error) })
    };

    let signout = async () => {
        return fetch("/logout", {
            method: "DELETE",
        }).then(() => {
            setUser(null);
        })
    };

    let value = { user, signin, signout, setUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider