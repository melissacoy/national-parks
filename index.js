'use strict';
const apiKey ='vkjEfxb65gj444Dn2Dl1pV7R3e1b9RAqma2ZYE34';
const url = 'developer.nps.gov/api/v1/parks ';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function getParkList(pickState, maxResultst=10){

    const params = {
        api_key : apiKey,
        stateCode: pickState,
        limit: maxResultst
    }
    const queryString = generateQueryString(params);
    const url = searchUrl + '?' + queryString;

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        } else {
            throw new Error (response.statusText);
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $('.error-message').text(`Something went wrong: ${error.message}`);
    })
}
function displayResults(responseJson){
    $('#results').empty();
    for(let i=0; i < responseJson.data.length; i++){
        $('#results').append(`
        <li><h2>${responseJson.data[i].name}<h2>
        <p>Located In: ${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url} target="_blank">View Website</a>
        </li>`
    )}
    $('#results').removeClass('hidden');
};
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchState = $('#js-search-term').val();
        const pickState = searchState.replace(/\s+/g, '&statecode=');
        const maxResults = $('#js-max-results').val();
        getParkList(pickState, maxResults);
    })
}
$(watchForm);