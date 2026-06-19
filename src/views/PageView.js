export default class PageView {
    constructor() {
        this.userPhotoEl = document.querySelector(".user-photo");
        this.nameEl = document.querySelector(".full-name");
        this.addressEl = document.querySelector(".address");
        this.friendsCountEl = document.querySelector(".friends-count");
        this.friendsContainer = document.querySelector(
            ".friends-items-container",
        );
        this.quoteEl = document.querySelector(".quote");
        this.quoteAuthorEl = document.querySelector(".quote-author");
        this.pokemonPhotoEl = document.querySelector(".pokemon-photo");
        this.pokemonNameEl = document.querySelector(".pokemon-name");
        this.aboutEl = document.querySelector(".about-text");

        this.container = document.querySelector(".container");
        this.statusEl = this.#createStatusBanner();
    }

    /** Shows a error message at the top of the page. */
    showError(message) {
        this.statusEl.textContent = message;
        this.statusEl.hidden = false;
    }

    /** Hides any visible error message. */
    clearError() {
        this.statusEl.textContent = "";
        this.statusEl.hidden = true;
    }

    #createStatusBanner() {
        const banner = document.createElement("div");
        banner.className = "page-status";
        banner.setAttribute("role", "alert");
        banner.hidden = true;
        this.container.prepend(banner);
        return banner;
    }

    render(page) {
        this.#renderMainUser(page.mainUser);
        this.#renderFriends(page.friends);
        this.#renderQuote(page.quote);
        this.#renderPokemon(page.pokemon);
        this.#renderAbout(page.aboutMe);
    }

    #renderMainUser(user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        this.userPhotoEl.src = user.photo;
        this.userPhotoEl.alt = fullName;
        this.nameEl.textContent = fullName;
        this.addressEl.textContent = `${user.city}, ${user.state}`;
    }

    #renderQuote(quote) {
        this.quoteEl.textContent = `“${quote}”`;
        this.quoteAuthorEl.textContent = "- Kanye";
    }

    #renderPokemon(pokemon) {
        this.pokemonPhotoEl.src = pokemon.sprite;
        this.pokemonPhotoEl.alt = pokemon.name;
        // Proper Case is applied via CSS (text-transform: capitalize).
        this.pokemonNameEl.textContent = pokemon.name;
    }

    #renderAbout(aboutMe) {
        this.aboutEl.textContent = aboutMe;
    }

    #renderFriends(friends) {
        this.friendsCountEl.textContent = `(${friends.length})`;
        this.friendsContainer.replaceChildren(
            ...friends.map((friend) => this.#createFriendItem(friend)),
        );
    }

    #createFriendItem(friend) {
        const fullName = `${friend.firstName} ${friend.lastName}`;

        const item = document.createElement("div");
        item.className = "friends-item";

        const imageContainer = document.createElement("div");
        imageContainer.className = "friends-item-image-container";

        const img = document.createElement("img");
        img.src = friend.thumb;
        img.alt = fullName;
        imageContainer.append(img);

        const nameSpan = document.createElement("span");
        nameSpan.className = "friend-name";
        nameSpan.textContent = fullName;

        item.append(imageContainer, nameSpan);
        return item;
    }
}
