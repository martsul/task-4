import { useNavigate } from "react-router-dom";
import { useSelectUsers } from "../context/select-users/use-select-users";
import { useState } from "react";
import { getUsers } from "../../hooks/use-users";

class PostData {
    #links = {
        banned: "https://server-6g34.onrender.com/api/banned",
        unbanned: "https://server-6g34.onrender.com/api/unbanned",
        delete: "https://server-6g34.onrender.com/api/delete",
    };
    #messages = {
        banned: "Users are blocked",
        unbanned: "Users are unblocked",
        delete: "Users are deleted",
    };
    #workMessage;
    #workLink;
    #navigate;
    #response;
    #data;

    constructor(operation, navigate, data) {
        this.#workLink = this.#links[operation];
        this.#workMessage = this.#messages[operation];
        this.#navigate = navigate;
        this.#data = data;
    }

    async #postData() {
        this.#response = await fetch(this.#workLink, {
            method: "POST",
            body: this.#data,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            "Cache-Control": "no-cache",
        });
    }

    #handlerResult() {
        if (this.#response.status === 300) {
            this.#navigate("/signin");
            return;
        }
        if (this.#response.ok) {
            return this.#workMessage;
        }
    }

    async post() {
        await this.#postData();
        return this.#handlerResult();
    }
}

export const useToolbar = () => {
    const { getSelectedUsers, setUsers } = useSelectUsers();
    const selectedUsers = JSON.stringify(getSelectedUsers());
    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const handlerClick = async (event) => {
        const operation = event.currentTarget.id;
        const postData = new PostData(operation, navigate, selectedUsers);
        const result = await postData.post();
        setMessage(result);
        setTimeout(() => {
            setMessage(null);
        }, 800);
        getUsers().then(setUsers);
    };

    return { handlerClick, message };
};
