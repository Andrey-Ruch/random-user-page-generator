import ApiService from "./ApiService.js";

const RANDOM_USER_URL = "https://randomuser.me/api/?results=7";
const KANYE_URL = "https://api.kanye.rest/";
const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const BACON_URL =
    "https://baconipsum.com/api/?type=meat-and-filler&paras=2&format=json";

const POKEMON_COUNT = 1025;

export default class UserPageModel {
    /**
     * Generates a fresh page object from all APIs.
     * @returns {Promise<object>} the full page data
     */
    static async generate() {
        const [users, quote, pokemon, aboutMe] = await Promise.all([
            UserPageModel.#fetchUsers(),
            UserPageModel.#fetchQuote(),
            UserPageModel.#fetchPokemon(),
            UserPageModel.#fetchAboutMe(),
        ]);

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
            quote,
            pokemon,
            aboutMe,
        };
    }

    static async #fetchUsers() {
        const data = await ApiService.getJSON(RANDOM_USER_URL);
        return data.results;
    }

    static async #fetchQuote() {
        const data = await ApiService.getJSON(KANYE_URL);
        return data.quote;
    }

    static async #fetchPokemon() {
        const id = Math.floor(Math.random() * POKEMON_COUNT) + 1;
        const data = await ApiService.getJSON(`${POKEMON_BASE_URL}${id}`);
        const sprite =
            data.sprites.front_default ||
            data.sprites.other?.["official-artwork"]?.front_default ||
            "";
        return { name: data.name, sprite };
    }

    static async #fetchAboutMe() {
        const paragraphs = await ApiService.getJSON(BACON_URL);
        return paragraphs.join(" ");
    }
}
