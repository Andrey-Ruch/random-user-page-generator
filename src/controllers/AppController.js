import UserPageModel from "../models/UserPageModel.js";
import StorageModel from "../models/StorageModel.js";

export default class AppController {
    constructor(view) {
        this.view = view;
        this.currentPage = null;
        this.generateBtn = document.querySelector(".generate-btn");
        this.saveBtn = document.querySelector(".save-btn");
        this.loadBtn = document.querySelector(".load-btn");
    }

    /** Binds events and renders an initial page. */
    init() {
        this.generateBtn.addEventListener("click", () => this.generateUser());
        this.saveBtn.addEventListener("click", () => this.saveUser());
        this.loadBtn.addEventListener("click", () => this.loadUser());

        this.#refreshLoadButton();
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

    saveUser() {
        if (!this.currentPage) return;

        StorageModel.saveUser(this.currentPage);

        this.#refreshLoadButton();
        this.#flashSaved();
    }

    loadUser() {
        const page = StorageModel.getSavedUser();

        if (!page) return;

        this.currentPage = page;

        this.view.clearError();
        this.view.render(page);
    }

    #setLoading(isLoading) {
        this.generateBtn.disabled = isLoading;
        this.generateBtn.textContent = isLoading
            ? "Generating…"
            : "Generate user";
    }

    /** Enables the Load button only when a saved user exists. */
    #refreshLoadButton() {
        this.loadBtn.disabled = !StorageModel.hasSavedUser();
    }

    /** Confirms a successful save on the Save button. */
    #flashSaved() {
        this.saveBtn.textContent = "Saved ✓";
        clearTimeout(this.savedTimer);
        this.savedTimer = setTimeout(() => {
            this.saveBtn.textContent = "Save user page";
        }, 1200);
    }
}
