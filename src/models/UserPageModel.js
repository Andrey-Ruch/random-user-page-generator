import ApiService from "./ApiService.js";

const RANDOM_USER_URL = "https://randomuser.me/api/?results=7";

export default class UserPageModel {
    /**
     * Generates a fresh page object.
     * @returns {Promise<{mainUser: object, friends: object[]}>}
     */
    static async generate() {
        const users = await UserPageModel.#fetchUsers();
        const [main, ...friends] = users;

        return {
            mainUser: {
                photo: main.picture.large,
                firstName: main.name.first,
                lastName: main.name.last,
                city: main.location.city,
                state: main.location.state,
            },
            friends: friends.map((friend) => ({
                firstName: friend.name.first,
                lastName: friend.name.last,
                thumb: friend.picture.thumbnail,
            })),
        };
    }

    static async #fetchUsers() {
        const data = await ApiService.getJSON(RANDOM_USER_URL);
        return data.results;
    }
}
