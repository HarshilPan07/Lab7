// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let body = document.querySelector('body');
let title = document.querySelector('header').querySelector('h1');
let journal_entries;
let settings = document.querySelector('header').querySelector('img');
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
      
      history.pushState({page: 'home'}, '', '#home');

      journal_entries = document.querySelector('main').querySelectorAll('journal-entry');
      
      for(let [index, journal_entry] of journal_entries.entries()) {
        journal_entry.addEventListener('click', (event) => {
          history.pushState({page: index}, '', `#entry=${index+1}`)
          setState(index, journal_entry);
        });  
      }
    });
});


settings.addEventListener('click', (event) => {
  history.pushState({page: 'settings'}, '', '#settings');
  setState();
})

window.addEventListener('popstate', (event) => {
  //  Going from some page to home
  if(event.state['page'] == 'home'){
    title.textContent = 'Journal Entries';
    body.classList.remove('settings');
    body.classList.remove('single-entry');
    
    body.removeChild('entry-page');
  }
  //  Going from settings back to some entry page
  else
  {

  }
  // history.back();
  // console.log(event.state['page']);
});