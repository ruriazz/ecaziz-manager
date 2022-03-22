class APIClient {
    constructor() {

    }

    /**
     * @param {string} method test
     * @param {string} path test
     * @param {object} data test
     * @param {Function} onSuccess test
     * @param {Function} onError test
     */
    async fetch(method, path, data, onSuccess, onError) {

    }

    async refreshToken() {

    }

    static async getInstance() {
        const client = new APIClient();

        await client.fetch()


        return client;
    }
}