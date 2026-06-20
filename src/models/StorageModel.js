const STORAGE_KEY = "savedUsers";

export default class StorageModel {
    /** Returns all saved entries (always an array). */
    static getAll() {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    /** Saves a page snapshot and returns the created entry. */
    static saveUser(page) {
        const entry = {
            id: crypto.randomUUID(),
            label: `${page.mainUser.firstName} ${page.mainUser.lastName}`,
            page,
        };
        const users = StorageModel.getAll();

        users.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

        return entry;
    }

    /** Returns the saved entry with the given id, or null. */
    static getById(id) {
        return StorageModel.getAll().find((entry) => entry.id === id) ?? null;
    }
}
