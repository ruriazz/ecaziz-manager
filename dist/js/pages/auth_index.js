class Page {
    static async getInstance() {
        const page = new Page();

        return Promise.resolve(page);
    }

    initPage() {
        const $this = this;
        this.authForm = $('#auth-form');

        this.authForm.submit((evt) => $this.#submitAuth(evt, $this))
    }

    async run() {
        const $this = this;
        $(document).ready(async function() {
            if (app.isAuth) {
                $('body').remove();
                window.location.href = '/';
            }

            $this.initPage();
            app.hideLoader();
            $('body').fadeIn();
        });
    }

    async #submitAuth(evt, $this) {
        evt.preventDefault();
        $('.alert-server-error').removeClass('show');
        $('.alert-server-error').remove();

        const api = app.api;
        const session = app.session;
        const username = $('#input-username');
        const password = $('#input-password');
        const result = $this.#validateAuth(username, password);
        if (!result)
            return;

        app.showLoader();
        const auth = await api.fetch({
            path: '/users/auth',
            method: 'POST',
            data: result
        });

        if (auth == false) {
            return app.serverError();
        }

        if (auth.success) {
            await session.set('user_data', auth.content.user);
            return window.location.reload();
        }

        $this.#authError();
    }

    #authError() {
        const alert = `
            <div class="alert alert-dismissible bg-light-danger d-flex flex-column flex-sm-row w-100 p-5 mb-10 alert-server-error">
                <span class="svg-icon svg-icon-2hx svg-icon-danger me-4 mb-5 mb-sm-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M2 4V16C2 16.6 2.4 17 3 17H13L16.6 20.6C17.1 21.1 18 20.8 18 20V17H21C21.6 17 22 16.6 22 16V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4Z" fill="black"></path>
                        <path d="M18 9H6C5.4 9 5 8.6 5 8C5 7.4 5.4 7 6 7H18C18.6 7 19 7.4 19 8C19 8.6 18.6 9 18 9ZM16 12C16 11.4 15.6 11 15 11H6C5.4 11 5 11.4 5 12C5 12.6 5.4 13 6 13H15C15.6 13 16 12.6 16 12Z" fill="black"></path>
                    </svg>
                </span>
                <div class="d-flex flex-column pe-0 pe-sm-10">
                    <h4 class="fw-bold">Authentication failed</h4>
                    <span>Please correct your username and password.</span>
                </div>
                <button type="button" class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
                    <span class="svg-icon svg-icon-1 svg-icon-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                            <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                        </svg>
                    </span>
                </button>
            </div>
        `;

        $('body').append(alert);
        app.hideLoader(() => {
            $('#input-password').val('');
            $('#input-password').addClass('is-invalid');
            $('#input-username').addClass('is-invalid');
            $('#input-username').prop('readonly', false);
            $('#input-password').prop('readonly', false);
            $('#input-password').focus();
            $('.alert-server-error').addClass('show');
        });
    }

    #validateAuth(username, password) {
        let error = false;
        const result = {
            username: username.val().trim().length > 3 ? username.val().trim().toLowerCase() : false,
            password: password.val().trim().length >= 6 ? password.val().trim() : false
        };

        if (!result.username) {
            error = true;
            username.addClass('is-invalid');
        } else {
            username.removeClass('is-invalid');
        }

        if (!result.password) {
            error = true;
            password.addClass('is-invalid');
        } else {
            password.removeClass('is-invalid');
        }

        if (error)
            return false;

        username.prop('readonly', true);
        password.prop('readonly', true);
        return result;
    }
}

const page = await Page.getInstance();
page.run();