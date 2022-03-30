class Dashboard {
    static async getInstance() {
        const dashboard = new Dashboard();


        return Promise.resolve(dashboard);
    }

    async run() {
        const $this = this;
        await app.pageAuth();

        app.activateMenuItem(0);
        app.setPageTitle('Dashboard');

        $('body').fadeIn(() => $this.#init($this));
    }

    async #init($this) {

        app.hideLoader();
    }
}

const dashboard = await Dashboard.getInstance();
dashboard.run();