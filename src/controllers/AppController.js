import UserPageModel from "../models/UserPageModel.js";

export default class AppController {
    constructor(view) {
        this.view = view;
        this.currentPage = null;
        this.generateBtn = document.querySelector(".btn.primary");
    }

    /** Binds events and renders an initial page. */
    init() {
        this.generateBtn.addEventListener("click", () => this.generateUser());
        this.generateUser();
    }

    async generateUser() {
        this.#setLoading(true);
        this.view.clearError();

        try {
            this.currentPage = await UserPageModel.generate();
            this.view.render(this.currentPage);
        } catch (err) {
            console.error(err);
            this.view.showError(
                "Couldn't load a new user. Please check your connection and try again.",
            );
        } finally {
            this.#setLoading(false);
        }
    }

    #setLoading(isLoading) {
        this.generateBtn.disabled = isLoading;
        this.generateBtn.textContent = isLoading
            ? "Generating…"
            : "Generate user";
    }
}
