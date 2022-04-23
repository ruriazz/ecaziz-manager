class Page {
    static async getInstance() {
        const page = new Page();

        return Promise.resolve(page);
    }

    async run() {
        await app.pageAuth();

        app.activateMenuItem(2);
        app.setPageTitle('Respon');

        $('body').fadeIn(() => this.#init());
    }

    async #init() {
        const api = app.api;

        let pagination = {
            current_page: 1,
            limit: 5,
            total_page: 1,
            total_results: 0,
            total_rows: 0,
        };
        let responses = await api.fetch({
            method: 'GET',
            path: '/ucapan/'
        });

        if(responses.success) {
            pagination = responses.content.pagination;
            responses = responses.content.ucapans;

            console.log(responses);
        }

        app.hideLoader();
    }
}

const ucapanIndex = await Page.getInstance();
ucapanIndex.run();