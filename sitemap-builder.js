require('@babel/register');

const router = require('./frontend/static/frontend/js/components/Routes').default;
const Sitemap = require('react-router-sitemap').default;

(
    new Sitemap(router)
        .build('https://kvdomingo.xyz')
        .save('./sitemap.xml')
);

console.log('Sitemap built.');
