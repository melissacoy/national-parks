'use strict';
const apiKey ='vkjEfxb65gj444Dn2Dl1pV7R3e1b9RAqma2ZYE34';
const url = 'developer.nps.gov/api/v1/parks ';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}
function parkList(maxResultst=10; stateCode){
    stateCode = stateCode.toLowerCase().replace(/\s+g, '').split(',');

    const params = {
        api_key : apiKey,
        maxResults, 
        start: 1, 
        stateCode, 
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
        <li><h2>${responseJson.data[i].fullName}<h2>
        <p>Located In: ${responseJson.data[i].states}</p>
        <a href="${responseJson.data[i].url} target="_blank">View Website</a>
        </li`
    )}
}
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const stateCode = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
       
        parkList(maxResults, stateCode)
    })
}
$(watchForm);