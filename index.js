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
    query: 'tea',
    v: '20170801',
    limit: 1
}

function getFSData(endpoint, query, callback) {
    $.getJSON(endpoint, query, callback);
}

function renderResult(data) {
    const {name, id, address, total} = data;
    return `
    <div>
        <h4>${name}</h4><br>
        <p>${address}</p><br>
        <p>${total}</p>
    </div>
    `
}

function displayFSSearchData(data) {
    console.log(JSON.stringify(data.response, null, 2)); 
    // console.log(data.response.venues[0].name);
    // console.log(data.response.venues[0].id);
    // console.log(data.response.venues[0].location.formattedAddress);
    // console.log(data.response.venues[0].hereNow.count);
    let results = '';
    let items = data.response.venues;
    for (let i=0; i<items.length; i++) {
        let current = items[i];
        const currentData = {
            name: current.name,
            id: current.id,
            address: current.location.formattedAddress[0] + current.location.formattedAddress[1],
            total: current.hereNow.count
        };
    results += renderResult(currentData);
    }
$('.js-search-results').html(results);
    }

function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        // console.log('clicked');
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val('');
        getFSData(FS_CONFIG.SEARCH_ENDPOINT, QUERY, displayFSSearchData);
    })
}

$(watchSubmit);