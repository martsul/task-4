import { redirect } from "react-router-dom";
import { pool } from "../db/index.js";

class UsersController {
    #response;
    #request;
    #next;
    #requestData;
    #email;
    #password;

    constructor(request, response, next) {
        this.#response = response;
        this.#request = request;
        this.#next = next;
        this.#requestData = request.body;
    }

    #resetCookies() {
        this.#response.cookie("userEmail", this.#email, {
            maxAge: 1080000,
            httpOnly: true,
        });
        this.#response.cookie("userPassword", this.#password, {
            maxAge: 1080000,
            httpOnly: true,
        });
    }

    #getCookies() {
        this.#email = this.#request.cookies.userEmail;
        this.#password = this.#request.cookies.userPassword;

        this.#resetCookies();
    }

    #checkYourself() {
        return new Set(this.#requestData).has(this.#email);
    }

    #handlerDeleteBan() {
        if (this.#checkYourself()) {
            this.#response.status(300).json({ redirect: "/signin" });
        } else {
            this.#response.json({ message: "ok" });
        }
    }

    async getUsers() {
        const [result] = await pool.query(
            "SELECT * FROM users ORDER BY lastEntry DESC"
        );

        this.#response.send(result);
    }

    async deleteUsers() {
        await pool.query("DELETE FROM users WHERE email IN (?)", [
            this.#requestData,
        ]);

        this.#handlerDeleteBan();
    }

    async bannedUsers() {
        await pool.query("UPDATE users SET isBlocked = 1 WHERE email in (?)", [
            this.#requestData,
        ]);

        this.#handlerDeleteBan();
    }

    async unbannedUsers() {
        await pool.query("UPDATE users SET isBlocked = 0 WHERE email in (?)", [
            this.#requestData,
        ]);

        this.#response.json({ message: "ok" });
    }

    async authorizationVerification() {
        this.#getCookies();

        const [result] = await pool.query(
            "SELECT isBlocked FROM users WHERE email = ? AND password = ?",
            [this.#email, this.#password]
        );

        if (!(result.length && !result[0].isBlocked)) {
            this.#response.status(300).json({ redirect: "/signin" });
            return true;
        }
    }
}

export const usersController = (operation) => {
    return async (request, response, next) => {
        try {
            const controller = new UsersController(request, response, next);

            if (await controller.authorizationVerification()) return;

            await controller[operation]();
        } catch (error) {
            console.log(error);
        }
    };
};
