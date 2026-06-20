// Entry point. Wires the MVC pieces together once the DOM is ready.
import PageView from "./views/PageView.js";
import SavedUsersView from "./views/SavedUsersView.js";
import AppController from "./controllers/AppController.js";

window.addEventListener("DOMContentLoaded", () => {
    const view = new PageView();
    const savedUsersView = new SavedUsersView();
    const controller = new AppController(view, savedUsersView);
    controller.init();
});
