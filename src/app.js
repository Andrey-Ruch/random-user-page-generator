import UserPageModel from "./models/UserPageModel.js";
import PageView from "./views/PageView.js";

window.addEventListener("DOMContentLoaded", async () => {
    const view = new PageView();

    try {
        const page = await UserPageModel.generate();
        view.render(page);
    } catch (err) {
        console.error(err);
    }
});
