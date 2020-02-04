window.addEventListener('webArticleContextReady', () => {
    window.webArticleContext.pageLoaded()
});
const CCDESKTOP_MESSAGE_TYPE = 'ccdesktop-message';
const messageHeader = {
    "type": CCDESKTOP_MESSAGE_TYPE,
    "target": window.name,
    "version": "1",
};
window.addEventListener('keyup', (event) => {
    if (event.keyCode === 27) {
        let msg = {
            ...messageHeader,
            "message": {
                "action": "webArticleEscape",
            }
        };
        window.parent.postMessage(msg, "*");
    }
});
window.addEventListener('message', (event) => {
    const { message, type } = event.data || {};
    if (type !== CCDESKTOP_MESSAGE_TYPE) {
        return;
    }
    const { action } = message;
    if (action === 'webArticleContextReady') {
        let msg = {
            ...messageHeader,
            "message": {
                "action": "webArticleContextPageLoaded",
            }
        };
        window.parent.postMessage(msg, "*");
    }
}, false);
