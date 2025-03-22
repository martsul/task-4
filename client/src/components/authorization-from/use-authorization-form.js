import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getLink = (thereIsAccount) =>
    thereIsAccount
        ? "https://server-6g34.onrender.com/api/login"
        : "https://server-6g34.onrender.com/api/signup";

const getData = (form) => {
    const formData = new FormData(form);
    return JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });
};

const handlerFetch = async (data, thereIsAccount, navigate, setError) => {
    const response = await fetch(getLink(thereIsAccount), {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
        navigate(result.redirect);
    } else {
        setError(result.message);
    }
};

export const useAuthorizationForm = (thereIsAccount) => {
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handlerSubmit = async (event) => {
        event.preventDefault();
        const data = getData(event.target);

        handlerFetch(data, thereIsAccount, navigate, setError);
    };

    return { handlerSubmit, error };
};
