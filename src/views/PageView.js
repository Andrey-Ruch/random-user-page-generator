export default class PageView {
    constructor() {
        this.userPhotoEl = document.querySelector(".user-photo");
        this.nameEl = document.querySelector(".full-name");
        this.addressEl = document.querySelector(".address");
        this.friendsCountEl = document.querySelector(".friends-count");
        this.friendsContainer = document.querySelector(
            ".friends-items-container",
        );
    }

    render(page) {
        this.#renderMainUser(page.mainUser);
        this.#renderFriends(page.friends);
    }

    #renderMainUser(user) {
        const fullName = `${user.firstName} ${user.lastName}`;
        this.userPhotoEl.src = user.photo;
        this.userPhotoEl.alt = fullName;
        this.nameEl.textContent = fullName;
        this.addressEl.textContent = `${user.city}, ${user.state}`;
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
