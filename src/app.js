import ApiService from "./models/ApiService.js";

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await ApiService.getJSON(
            "https://randomuser.me/api/?results=1",
        );
        console.log("data:", data);
    } catch (err) {
        console.error(err);
    }
});
