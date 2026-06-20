const STORAGE_KEY = "savedUser";

export default class StorageModel {
    /** Saves a snapshot of the given page object. */
    static saveUser(page) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(page));
    }

    /** Returns the saved page object, or null if none is saved. */
    static getSavedUser() {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }

    /** Whether a saved page currently exists. */
    static hasSavedUser() {
        return localStorage.getItem(STORAGE_KEY) !== null;
    }
}
