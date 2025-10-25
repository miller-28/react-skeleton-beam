export const fetchService = {

    /**
     * Fetch JSON from a URL.
     * options.cache maps to the Fetch API `cache` option. Default is 'no-store' to avoid HTTP cache.
     */
    async getJson(url, { cache = "no-store", headers = {} } = {}) {
        const resp = await fetch(url, {
            cache,
            headers: { Accept: "application/json", "Cache-Control": "no-cache", ...headers },
        });

        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
    }
};