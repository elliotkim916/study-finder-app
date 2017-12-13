'use strict';

const FS_CONFIG = {
    SEARCH_ENDPOINT: 'https://api.foursquare.com/v2/venues/search',
    DETAILS_ENDPOINT: 'https://api.foursquare.com/v2/venues/',
    COUNT_ENDPOINT: 'https://api.foursquare.com/v2/venues/5294d26911d23075f72fc8ea/herenow',
    CLIENT_ID: 'WX3KR5YBPE3O2EJPJWWM5YHHTKH4QUGS5GAWUOKCQEWT5DUG',
    CLIENT_SECRET: 'KVQB5SIWQDDUPFRJX2PMLMOKNSTE5XVSDKAPNM4UMZITEC23'
};



// const countQuery = {
//     client_id: FS_CONFIG.CLIENT_ID,
//     client_secret: FS_CONFIG.CLIENT_SECRET,
//     startAt: '1284286794',
//     fields: 'newCheckins'
// };

function getFSTotalCount(searchTerm, callback) {
    const countQuery = {
    client_id: FS_CONFIG.CLIENT_ID,
    client_secret: FS_CONFIG.CLIENT_SECRET,
    VENUE_ID: `${searchTerm}`,
    limit: 100
};
$.getJSON(FS_CONFIG.COUNT_ENDPOINT, countQuery, callback);
}

function getFSDetails(venueID, callback) {
    const detailsQuery = {
        client_id: FS_CONFIG.CLIENT_ID,
        client_secret: FS_CONFIG.CLIENT_SECRET,
        // VENUE_ID: venueID
    }
    $.getJSON(FS_CONFIG.DETAILS_ENDPOINT + venueID, detailsQuery, callback);
}
// '5294d26911d23075f72fc8ea'
getFSDetails('5294d26911d23075f72fc8ea', function(data){console.log(data);});

function getFSData(searchTerm, callback) {
    const QUERY = {
        client_id: FS_CONFIG.CLIENT_ID,
        client_secret: FS_CONFIG.CLIENT_SECRET,
        // ll:
        near: `${searchTerm}`,
        query: 'coffee, tea, library, cafe, study', 
        v: '20171212',
        limit: 50
    };
    $.getJSON(FS_CONFIG.SEARCH_ENDPOINT, QUERY, callback);
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
    console.log(JSON.stringify(data, null, 2)); 
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
        const queryTarget = $(event.currentTarget).find('.js-query');
        const query = queryTarget.val();
        queryTarget.val('');
        getFSData(query, displayFSSearchData);
        getFSTotalCount(query, displayFSSearchData);
    })
}

$(watchSubmit);