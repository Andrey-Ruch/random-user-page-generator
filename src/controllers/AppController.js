// Coordinates user actions with the model and views.
import UserPageModel from "../models/UserPageModel.js";
import StorageModel from "../models/StorageModel.js";

export default class AppController {
    constructor(view, savedUsersView) {
        this.view = view;
        this.savedUsersView = savedUsersView;
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

        this.#refreshSavedUsers();
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

        const entry = StorageModel.saveUser(this.currentPage);
        this.#refreshSavedUsers();
        this.savedUsersView.selectId(entry.id);
        this.#flashSaved();
    }

    loadUser() {
        const id = this.savedUsersView.getSelectedId();
        if (!id) return;

        const entry = StorageModel.getById(id);
        if (!entry) return;

        this.currentPage = entry.page;
        this.view.clearError();
        this.view.render(entry.page);
    }

    #setLoading(isLoading) {
        this.generateBtn.disabled = isLoading;
        this.generateBtn.textContent = isLoading
            ? "Generating…"
            : "Generate user";
    }

    /** Repopulates the dropdown and toggles the Load button. */
    #refreshSavedUsers() {
        const savedUsers = StorageModel.getAll();
        this.savedUsersView.renderOptions(savedUsers);
        this.loadBtn.disabled = savedUsers.length === 0;
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
