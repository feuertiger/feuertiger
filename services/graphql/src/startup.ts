(async () => {
    // eslint-disable-next-line global-require
    const firebase = require('firebase');
    // eslint-disable-next-line global-require
    const secrets = require('@feuertiger/tools').getFirebaseAppSecrets();
    try {
        await firebase.initializeApp(secrets);
        // eslint-disable-next-line global-require
        require('./server')
            .gqlServer()
            .listen({ port: 4000 }, () =>
                // eslint-disable-next-line no-console
                console.log('🚀 Server ready at http://localhost:4000/graphql')
            );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error: ', error);
    }
})();
