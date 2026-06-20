// Renders the saved-users dropdown.

export default class SavedUsersView {
    constructor() {
        this.selectEl = document.querySelector(".saved-users-select");
    }

    /** Populates the dropdown from the saved entries. */
    renderOptions(savedUsers) {
        if (savedUsers.length === 0) {
            this.selectEl.replaceChildren(
                this.#createOption("", "No saved users yet"),
            );
            this.selectEl.disabled = true;
            return;
        }

        this.selectEl.disabled = false;
        this.selectEl.replaceChildren(
            ...savedUsers.map((entry) =>
                this.#createOption(entry.id, entry.label),
            ),
        );
    }

    /** The id of the currently selected saved user (empty string if none). */
    getSelectedId() {
        return this.selectEl.value;
    }

    /** Selects a given saved user in the dropdown. */
    selectId(id) {
        this.selectEl.value = id;
    }

    #createOption(value, label) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        return option;
    }
}
