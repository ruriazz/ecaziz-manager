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
        const api = app.api;

        let dashboardData = await api.fetch({
            method: 'GET',
            path: '/'
        });

        if(dashboardData.success) {
            dashboardData = dashboardData.content;
        } else {
            dashboardData = {};
        }

        console.log(dashboardData);
        
        if(Object.keys(dashboardData).length == 4) {
            console.log('kjaghs')
            const undanganActive = $('span#undangan-active');
            const mainInfo = $('div#main-info');

            undanganActive.html(dashboardData.undangans_active);
            const bulletColors = ['bg-danger', 'bg-primary', 'bg-warning'];
            dashboardData.undangans_info.forEach((el, i) => {
                const info = `
                    <div class="d-flex fs-6 fw-bold align-items-center">
                        <div class="bullet w-8px h-6px rounded-2 ${bulletColors[i]} me-3"></div>
                        <div class="text-gray-500 flex-grow-1 me-4">${el.name.capitalize()}</div>
                        <div class="fw-boldest text-gray-700 text-xxl-end">${el.undangans} Undangan</div>
                    </div>
                `;

                mainInfo.append(info);
            });

            mainInfo.append(`
                <div class="d-flex fs-6 fw-bold align-items-center">
                    <div class="bullet w-8px h-6px rounded-2 me-3" style="background-color:#e4e6ef"></div>
                    <div class="text-gray-500 flex-grow-1 me-4">${dashboardData.undangans_response.total_response} Respon</div>
                    <div class="fw-boldest text-gray-700 text-xxl-end">dari ${dashboardData.undangans_response.total_undangan} Undangan</div>
                </div>
            `)
        }

        app.hideLoader();
    }
}

const dashboard = await Dashboard.getInstance();
dashboard.run();