export default class ApiService {
    /**
     * Fetches a URL and returns parsed JSON.
     */
    static async getJSON(url) {
        let response;

        try {
            response = await fetch(url);
        } catch (err) {
            throw new Error(
                `Network error while requesting ${url}: ${err.message}`,
            );
        }

        if (!response.ok) {
            throw new Error(
                `Request to ${url} failed with status ${response.status}`,
            );
        }

        try {
            return await response.json();
        } catch (err) {
            throw new Error(`Could not parse JSON from ${url}: ${err.message}`);
        }
    }

    /**
     * Fetches a URL and returns the raw response text.
     */
    static async getText(url) {
        let response;
        
        try {
            response = await fetch(url);
        } catch (err) {
            throw new Error(
                `Network error while requesting ${url}: ${err.message}`,
            );
        }

        if (!response.ok) {
            throw new Error(
                `Request to ${url} failed with status ${response.status}`,
            );
        }

        return response.text();
    }
}
