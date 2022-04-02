class UndanganIndex {
    static async getInstance() {
        const undanganIndex = new UndanganIndex();


        return Promise.resolve(undanganIndex);
    }

    async run() {
        await app.pageAuth();

        const $this = this;
        const api = app.api;
        app.activateMenuItem(1);
        app.setPageTitle('Undangan');

        const showScrollLoader = function(func = null) {
            $('.scroll-loader').fadeIn('slow', function() {
                if(typeof func == 'function')
                    return func();
            });
        };

        const hideScrollLoader = function(func = null) {
            $('.scroll-loader').fadeOut('slow', function() {
                if(typeof func == 'function')
                    return func();
            });
        };

        const initPage = async function() {    
            let pagination = {};
            let onXentPage = false;
            const btnLoadMore = $('.btn-load-more');
            const searchInputUndangan = $('#search-input-undangan');

            const requestApiUndangan = async function(page = 1, limit = 10, reset = true) {
                $(btnLoadMore.parent()).fadeOut('fast', async function() {
                    let query = searchInputUndangan.val().length > 0 ? searchInputUndangan.val().trim() : '';

                    return Promise.resolve(showScrollLoader(async function() {
                        const getUndanganResponse = await api.fetch({
                            path: `/undangan/?page=${page}&limit=${limit}&q=${query}`,
                            method: 'GET'
                        });
            
                        if(getUndanganResponse.success) {
                            pagination = getUndanganResponse.content.pagination;
                            $this.#loadDataToTable(getUndanganResponse.content.undangans, query.length > 0 ? 'tbody[class=filtered-table]' : 'tbody[class=main-table]', reset);
                            hideScrollLoader(function() {
                                if(pagination.total_results == limit) {
                                    $(btnLoadMore.parent()).fadeIn();
                                } else {
                                    $(btnLoadMore.parent()).fadeOut('fast');
                                }
                            });
                            return Promise.resolve(true);
                        }
    
                        hideScrollLoader();
                        return Promise.resolve(false);
                    }));
                });
            }

            requestApiUndangan();

            btnLoadMore.click(async () => {
                if (pagination.limit == pagination.total_results && !onXentPage) {
                    const nextPage = pagination.current_page + 1;
                    let reset = true;
                    onXentPage = true;
                    if(searchInputUndangan.val().length > 0 && searchInputUndangan.val().trim().length > 0)
                        reset = false;

                    await requestApiUndangan(nextPage, pagination.limit, reset);
                    onXentPage = false;
                }
            });

            const submitSearch = async function() {
                const filteredColumn = $('tbody[class=filtered-table]');
                const mainColumn = $('tbody[class=main-table]');
                const resultInfo = $('#filtered-info');

                if(searchInputUndangan.val().length < 1) {
                    filteredColumn.fadeOut('fast', function() {
                        filteredColumn.children().remove();
                        mainColumn.fadeIn('fast');
                    });

                    resultInfo.html('Undangan tersimpan:');

                    return;
                } else {
                    resultInfo.html(`Hasil pencarian untuk <b>"${searchInputUndangan.val()}"</b>:`);
                }

                let keywords = searchInputUndangan.val().trim();
                if(keywords.length < 1) {
                    filteredColumn.fadeOut('fast', function() {
                        filteredColumn.children().remove();
                        mainColumn.fadeIn('fast');
                    });
                    
                    return;
                }


                await requestApiUndangan();
            };

            let waiting;
            searchInputUndangan.on('keyup', () => {
                clearTimeout(waiting);
                waiting = setTimeout(submitSearch, 350);
            });


            app.hideLoader();
        };

        $('body').fadeIn(initPage);
    }

    async #loadDataToTable(undangans, tbody, reset = true) {
        if(tbody == 'tbody[class=filtered-table]') {
            if(reset)
                $(tbody).children().remove();

            $(tbody).fadeIn();
            $('tbody[class=main-table]').fadeOut('fast');
        }

        const api = app.api;
        const $this = this;
        const userData = await app.session.get('user_data');
        
        tbody = $(tbody);
        let startIndex = 0;

        for(let i = startIndex; i < undangans.length; i++) {
            let undangan = undangans[i];

            const newData = $this.#buildColumn(undangan, i%2 == 0 ?'odd' : 'even', userData);
            tbody.append(newData);
            
            let newColumn = $($(newData)[0]);
            newColumn = $(`#${newColumn.attr('id')}`);
            const child = $(newColumn.data('child'));
            const btnEditUndangan = child.find('.btn-edit-undangan');
            const btnCopyUndangan = child.find('.btn-copy-undangan');
            const btnShareUndangan = child.find('.btn-share-undangan');
            const btnRemoveUndangan = child.find('.btn-remove-undangan');

            const removeUndangan = () => app.showLoader(async() => {
                const removedResponse = await api.fetch({
                    path: `/undangan/${undangan.id}`,
                    method: 'DELETE'
                });

                if(removedResponse.success) {
                    $(newColumn.data('child')).remove();
                    newColumn.remove();
                } else {
                    app.showSnackbar({
                        text: 'an error occurred while deleting data',
                        timeout: 2500
                    });
                }

                app.hideLoader();
            });

            const showEditForm = () => {
                app.showSnackbar({
                    text: 'update feature is under development'
                });
            };
            
            newColumn.click(function() {
                if(newColumn.hasClass('parent')) {
                    child.fadeOut('fast');
                    newColumn.removeClass('parent');
                } else {
                    child.fadeIn('slow');
                    newColumn.addClass('parent');
                }
            });

            let snackbarShownEdit = false;
            btnEditUndangan.click(function(evt) {
                evt.preventDefault();

                if(userData.id !== undangan.created_by.id) {
                    if(snackbarShownEdit)
                        return;

                    return app.showSnackbar({
                        text: `only ${undangan.created_by.name.split(' ')[0]} can update this data`,
                        onShow: () => {
                            snackbarShownEdit = true;
                        },
                        onHide: () => {
                            snackbarShownEdit = false;
                        }
                    });
                }

                showEditForm();
            });

            btnCopyUndangan.click(function(evt) {
                evt.preventDefault();

                const message = app.buildWhatsappMessage(undangan, false);
                app.copyTextToClipboard(message, function(success) {
                    if(success)
                        return app.showSnackbar({
                            text: 'tempalate copied.'
                        });

                    app.showSnackbar({
                        text: 'failed to copy template.'
                    });
                });
            });

            btnShareUndangan.click(function(evt) {
                evt.preventDefault();

                const message = app.buildWhatsappMessage(undangan);
                app.openWhatsapp(message, undangan.phone_number != null ? undangan.phone_number : null)
            });

            let waitingConfim = false;
            let snackbarShown = false;
            btnRemoveUndangan.click(async function(evt) {
                evt.preventDefault();

                if(userData.id !== undangan.created_by.id) {
                    if(snackbarShown)
                        return;

                    return app.showSnackbar({
                        text: `only ${undangan.created_by.name.split(' ')[0]} can delete this data`,
                        onShow: () => {
                            snackbarShown = true;
                        },
                        onHide: () => {
                            snackbarShown = false;
                        }
                    });
                }

                if(!waitingConfim) {
                    const el = $(this);
                    el.addClass('btn-success');
                    el.removeClass('btn-danger');
                    if(!snackbarShown)
                        app.showSnackbar({
                            text: "click again to continue deleting",
                            timeout: 2500,
                            onHide: () => {
                                snackbarShown = false;
                            }
                        });

                    waitingConfim = setTimeout(function() {
                        el.addClass('btn-danger');
                        el.removeClass('btn-success');

                        waitingConfim = false;
                    }, 2500);
                    return;
                }

                removeUndangan();
            });
        }
    }

    #buildColumn(undangan, parentType = 'odd', userData) {
        const created_at = new Date(undangan.created_at);
        let createdAtFormated = "";
        createdAtFormated += ('0' + created_at.getDate()).slice(-2);
        createdAtFormated += '-';
        createdAtFormated += ('0' + (created_at.getMonth() + 1)).slice(-2);
        createdAtFormated += ' ';
        createdAtFormated += ('0' + created_at.getHours()).slice(-2);
        createdAtFormated += ':';
        createdAtFormated += ('0' + created_at.getMinutes()).slice(-2);

        return `
    <tr class="${parentType} parent-column" data-child="#child_${undangan.id}" id="parent-${undangan.id}">
                <td class="dtr-control" tabindex="0">${undangan.person_name.capitalize()}</td>
                <td class="sorting_1">${undangan.created_by.id == userData.id ? 'Me' : undangan.created_by.name.split(' ')[0].capitalize()}</td>
            </tr>
            <tr class="child${parentType == 'odd' ? ' bg-secondary' : ''}" style="display: none;" id="child_${undangan.id}">
                <td class="child" colspan="2">
                    <div class="mb-6">
                        <a href="#" class="btn btn-icon btn-primary mx-1 btn-copy-undangan">
                            <span class="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="7" y="2" width="14" height="16" rx="3" fill="black" />
                                    <rect x="3" y="6" width="14" height="16" rx="3" fill="black" />
                                </svg>
                            </span>
                        </a>
                        <a href="#" class="btn btn-icon btn-success mx-1 btn-share-undangan">
                            <span class="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15.43 8.56949L10.744 15.1395C10.6422 15.282 10.5804 15.4492 10.5651 15.6236C10.5498 15.7981 10.5815 15.9734 10.657 16.1315L13.194 21.4425C13.2737 21.6097 13.3991 21.751 13.5557 21.8499C13.7123 21.9488 13.8938 22.0014 14.079 22.0015H14.117C14.3087 21.9941 14.4941 21.9307 14.6502 21.8191C14.8062 21.7075 14.9261 21.5526 14.995 21.3735L21.933 3.33649C22.0011 3.15918 22.0164 2.96594 21.977 2.78013C21.9376 2.59432 21.8452 2.4239 21.711 2.28949L15.43 8.56949Z" fill="black" />
                                    <path opacity="0.3" d="M20.664 2.06648L2.62602 9.00148C2.44768 9.07085 2.29348 9.19082 2.1824 9.34663C2.07131 9.50244 2.00818 9.68731 2.00074 9.87853C1.99331 10.0697 2.04189 10.259 2.14054 10.4229C2.23919 10.5869 2.38359 10.7185 2.55601 10.8015L7.86601 13.3365C8.02383 13.4126 8.19925 13.4448 8.37382 13.4297C8.54839 13.4145 8.71565 13.3526 8.85801 13.2505L15.43 8.56548L21.711 2.28448C21.5762 2.15096 21.4055 2.05932 21.2198 2.02064C21.034 1.98196 20.8409 1.99788 20.664 2.06648Z" fill="black" />
                                </svg>
                            </span>
                        </a>
                        <a href="#" class="btn btn-icon btn-danger mx-1 btn-remove-undangan">
                            <span class="svg-icon svg-icon-muted svg-icon-2hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="black" />
                                    <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="black" />
                                    <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="black" />
                                </svg>
                            </span>
                            </i></a>
                    </div>
                    <ul data-dtr-index="49" class="dtr-details">
                        <li data-dtr-index="3" data-dt-row="49" data-dt-column="3">
                            <span class="dtr-title">Status</span>
                            <span class="dtr-data">: ${undangan.is_active == 1 ? '<span class="badge badge-light-success fw-bold">Active</span>' : '<span class="badge badge-light-danger fw-bold">Inactive</span>'}</span>
                        </li>
                        <li data-dtr-index="1" data-dt-row="49" data-dt-column="1">
                            <span class="dtr-title">Dibuat</span>
                            <span class="dtr-data">: ${createdAtFormated}</span>
                        </li>
                        <li data-dtr-index="2" data-dt-row="49" data-dt-column="2">
                            <span class="dtr-title">Tipe</span>
                            <span class="dtr-data">: ${undangan.undangan_type == 'O' ? 'Perorang' : 'Grup'}</span>
                        </li>
                        <li data-dtr-index="4" data-dt-row="49" data-dt-column="4">
                            <span class="dtr-title">Url</span>
                            <span class="dtr-data">: <a href="https://${undangan.link.replaceAll('BASE_URL', app_config.BASE_URL)}" target="_blank">${undangan.link.replaceAll('BASE_URL', app_config.BASE_URL)}</a></span>
                        </li>
                        <li data-dtr-index="4" data-dt-row="49" data-dt-column="4">
                            <span class="dtr-title">Data With</span>
                            <span class="dtr-data">: ${undangan.person_partner}</span>
                        </li>
                        <li data-dtr-index="4" data-dt-row="49" data-dt-column="4">
                            <span class="dtr-title">Relation Head</span>
                            <span class="dtr-data">: ${undangan.person_type.split('&lt;|&gt;')[0].trim()}</span>
                        </li>
                        <li data-dtr-index="4" data-dt-row="49" data-dt-column="4">
                            <span class="dtr-title">Relation Body</span>
                            <span class="dtr-data">: ${undangan.person_type.split('&lt;|&gt;')[1].trim()}</span>
                        </li>
                        <li data-dtr-index="4" data-dt-row="49" data-dt-column="4">
                            <span class="dtr-title">Data Lokasi</span>
                            <span class="dtr-data">: ${undangan.person_location}</span>
                        </li>
                        ${undangan.phone_number !== null ? `<li data-dtr-index="4" data-dt-row="49" data-dt-column="4">
                            <span class="dtr-title">Whatsapp</span>
                            <span class="dtr-data">: ${undangan.phone_number}</span>
                        </li>` : ''}
                    </ul>
                    <div class="text-center">
                        <a href="#" class="btn btn-info btn-edit-undangan">
                            <span class="svg-icon svg-icon-muted svg-icon-1hx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z" fill="black" />
                                    <path d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z" fill="black" />
                                    <path d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z" fill="black" />
                                </svg>
                            </span>
                            Edit
                        </a>
                    </div>
                </td>
            </tr>
        `;
    }
}

const undanganIndex = await UndanganIndex.getInstance();
undanganIndex.run();