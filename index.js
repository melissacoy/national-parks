'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');    
}

function parkList(searchUrl, stateAbrv, maxResults, apiKey) {
    
    const params = {
        stateCode: stateAbrv,
        limit: maxResults
    }
    
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString + '&api_key=' + apiKey;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, maxResults) {
    $('#js-error-message').empty();
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('#results-list').append(`
          <li><h2>${responseJson.data[i].fullName}</h2>
            <p>${responseJson.data[i].description}</p>       
            <p><a href="${responseJson.data[i].url}" target="_blank">visit park website</a></p>    
          </li>`
         );
    }
    $('#results').removeClass('hidden');
}

function watchForm() {
  $('#js-form').on('submit', function(event) { 
    event.preventDefault();
    let stateAbrv = $('#js-search-term').val().split(",");
    let maxResults = $('#js-max-results').val();
    let apiKey = 'vkjEfxb65gj444Dn2Dl1pV7R3e1b9RAqma2ZYE34';
    let searchURL = 'https://developer.nps.gov/api/v1/parks';
    parkList(searchURL, stateAbrv, maxResults, apiKey);
  })  
}

$(watchForm);