'use strict';

const FS_CONFIG = {
    SEARCH_ENDPOINT: 'https://api.foursquare.com/v2/venues/search',
    DETAILS_ENDPOINT: 'https://developer.foursquare.com/docs/api/venues/details',
    CLIENT_ID: 'WX3KR5YBPE3O2EJPJWWM5YHHTKH4QUGS5GAWUOKCQEWT5DUG',
    CLIENT_SECRET: 'KVQB5SIWQDDUPFRJX2PMLMOKNSTE5XVSDKAPNM4UMZITEC23'
};

const QUERY = {
    client_id: FS_CONFIG.CLIENT_ID,
    client_secret: FS_CONFIG.CLIENT_SECRET,
    ll: '40.7243,-74.0018',
    query: 'coffee',
    v: '20170801',
    limit: 1
};

function getFSData(endpoint, query) {
    $.getJSON(endpoint, query, function(res) {
        console.log(res);
    })
}

getFSData(FS_CONFIG.SEARCH_ENDPOINT, QUERY);