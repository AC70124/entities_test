const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const prepare = require('mocha-prepare');

prepare(async done => {
    const https = require('https');
    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    const urls = [`${process.env.VUE_APP_SHELL}shell.umd.js`, 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js'];
    const options = [{ agent }, {}];

    await Promise.all(urls.map(async (u, index) => await fetch(u, options[index])))
        .then(responses => Promise.all(responses.map(res => res.text())))
        .then(scripts => {
            let body = `<body>
        <script>${scripts[1]}</script>
        <script>${scripts[0]}</script>
        </body>`;

            const dom = new JSDOM(body, { runScripts: 'dangerously' });

            window['chiUrl'] = dom.window.shell.library.chiUrl;
        })
        .then(async () => {
            await fetch(`${window['chiUrl']}js/chi.js`)
                .then(res => res.text())
                .then(res => {
                    let body = `<body>
                    <script>${res}</script>
                    </body>`;

                    const dom = new JSDOM(body, { runScripts: 'dangerously', pretendToBeVisual: true });
                    dom.window.document.createRange = () => ({
                        setStart: () => {},
                        setEnd: () => {},
                        commonAncestorContainer: {
                            nodeName: 'BODY',
                            ownerDocument: document,
                        },
                    });

                    window['chi'] = dom.window.chi;

                    done();
                });
        });
});
