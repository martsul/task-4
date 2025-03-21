import { pool } from "../db/index.js";
import { NoAvailable } from "../errors/no-available.js";
import { InvalidMail } from "../errors/invalid-mail.js";
import { InvalidPassword } from "../errors/invalid-password.js";

class AuthorizationController {
    #response;
    #request;
    #next;
    #receivedData;
    #error = {
        ER_CHECK_CONSTRAINT_VIOLATED:
            "The password must contain at least 1 character.",
        ER_DUP_ENTRY: "A user with such an email already exists",
    };

    constructor(request, response, next) {
        this.#response = response;
        this.#request = request;
        this.#next = next;
        this.#receivedData = request.body;
    }

    #setCookies() {
        this.#response.cookie("userEmail", this.#receivedData.email, {
            maxAge: 108000,
            httpOnly: true,
        });

        this.#response.cookie("userPassword", this.#receivedData.password, {
            maxAge: 108000,
            httpOnly: true,
        });
    }

    async #emailValidate() {
        const [result] = await pool.query(
            "SELECT email FROM users WHERE email = ?",
            [this.#receivedData.email]
        );
        if (!result.length) {
            throw new InvalidMail();
        }
    }

    async #requestData() {
        const [result] = await pool.query(
            "SELECT email FROM users WHERE email = ? AND password = ?",
            [this.#receivedData.email, this.#receivedData.password]
        );

        if (!result.length) {
            throw new InvalidPassword();
        }

        return result[0];
    }

    #validateBan(isBlocked) {
        if (isBlocked) {
            throw new NoAvailable();
        }
    }

    async #validate() {
        await this.#emailValidate();
        const { isBlocked } = await this.#requestData();
        this.#validateBan(isBlocked);
    }

    async #updateLastEntry() {
        await pool.query(
            "UPDATE users SET lastEntry = CURRENT_TIMESTAMP WHERE email = ?",
            [this.#receivedData.email]
        );
    }

    async #successfulLogin() {
        await this.#updateLastEntry();
        this.#setCookies();
        this.#response.json({ message: "Ok", redirect: "/" });
    }

    async login() {
        try {
            await this.#validate();
            this.#successfulLogin();
        } catch (error) {
            this.#response.status(401).json({ message: error.message });
        }
    }

    async signup() {
        try {
            await pool.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?);",
                [
                    this.#receivedData.name,
                    this.#receivedData.email,
                    this.#receivedData.password,
                ]
            );
            this.#successfulLogin();
        } catch (error) {
            if (error.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
            }
            this.#response
                .status(401)
                .json({ message: this.#error[error.code] });
        }
    }
}

export const authorizationController = (operation) => {
    return (request, response, next) => {
        const controller = new AuthorizationController(request, response, next);
        controller[operation]();
    };
};
