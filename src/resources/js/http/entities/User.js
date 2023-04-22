import { BASE_URL, PAGE_ITEMS } from "../../constants";
import utils from "../../utils/Utils";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getPaginate(username, nameFamily, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/a/users`, {
            username: username,
            name_family: nameFamily,
            _pn,
            _pi,
        });
    }

    async get(id) {
        return await this.handlePost(`${BASE_URL}/a/users/show/${id}`);
    }

    async getFromUser() {
        return await this.handlePost(`${BASE_URL}/u/users/show`);
    }

    async store(
        username,
        password,
        confirmPassword,
        name,
        family,
        email,
        role,
        isActive
    ) {
        return await this.handlePost(`${BASE_URL}/a/users/store`, {
            username,
            password,
            password_confirmation: confirmPassword,
            name,
            family,
            email,
            role,
            is_active: isActive,
        });
    }

    async update(id, name, family, email, role, isActive) {
        return await this.handlePost(`${BASE_URL}/a/users/update/${id}`, {
            name,
            family,
            email,
            role,
            is_active: isActive,
        });
    }

    async updateFromUser(name, family) {
        return await this.handlePost(`${BASE_URL}/u/users/update`, {
            name,
            family,
        });
    }

    async changePassword(id, newPassword, confirmPassword) {
        return await this.handlePost(
            `${BASE_URL}/a/users/change_password/${id}`,
            {
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            }
        );
    }

    async changePasswordFromUser(newPassword, confirmPassword) {
        return await this.handlePost(`${BASE_URL}/u/users/change_password`, {
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
        });
    }

    async changeLanguage(language) {
        return await this.handlePost(`${BASE_URL}/u/users/set_language`, {
            language: language,
        });
    }

    async forgotPassword(email) {
        return await this.handlePost(`${BASE_URL}/u/users/forgot_password`, {
            email,
        });
    }

    async signup(username, password, confirmPassword, name, family, email) {
        return await this.handlePost(`${BASE_URL}/u/users/signup`, {
            username,
            password,
            password_confirmation: confirmPassword,
            name,
            family,
            email,
        });
    }

    logOut() {
        utils.clearLS();
    }
}
