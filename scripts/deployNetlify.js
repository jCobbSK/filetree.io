const NetlifyAPI = require('netlify');
const path = require('path');

const { netlifyToken, netlifySiteId } = require('../secrets.json');

const client = new NetlifyAPI(netlifyToken);

client
    .deploy(netlifySiteId, path.resolve(__dirname, '../build'))
    .then(() => {
        console.log('Site successfully deployed');
    })
    .catch((err) => {
        {
            console.log(err);
            console.log('Deploy FAILED!');
            process.exit(1);
        }
    });
