class UcapanIndex {
    static async getInstance() {
        const ucapanIndex = new UcapanIndex();


        return Promise.resolve(ucapanIndex);
    }

    async run() {
        await app.pageAuth();

        app.activateMenuItem(2);
        app.setPageTitle('Respon');

        $('body').fadeIn(() => app.hideLoader());
    }
}

const ucapanIndex = await UcapanIndex.getInstance();
ucapanIndex.run();