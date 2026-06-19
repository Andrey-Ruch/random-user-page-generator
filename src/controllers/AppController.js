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
        try {
            this.currentPage = await UserPageModel.generate();
            this.view.render(this.currentPage);
        } catch (err) {
            console.error(err);
        }
    }
}
