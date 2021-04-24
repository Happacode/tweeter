/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-env jquery */
/* eslint-env es6 */
/* eslint-disable */
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

const createTweetElement = function (tweet) {
  /* Your code for creating the tweet element */
  const $tweet = (`
  <article id="tweets-container" class="archive-tweet">
  <header class="tweet-container">
    <div class="user-avatars"><img src = ${tweet.user.avatars}></div>
    <div class="user-name">${tweet.user.name}</div>
    <div class="user-handle">${tweet.user.handle}</div>
  </header>
  <div class="text-input" action="/tweets">
    <div for="tweet-text">
      Content: Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Commodi esse tenetur suscipit rem quod quis expedita animi in, ut, incidunt, et fugiat eveniet eligendi at.
    </div>
  </div>
  <footer class="container-button">
    <div class="timeago" datetime="2021-04-20T09:24:17Z">${tweet.created_at}</div>
    <div class="icons"><i class="fab fa-font-awesome-flag"></i><i class="fas fa-retweet"></i><i class="far fa-heart"></i></div>
  </footer>
  </article>
  `);

  return $tweet;
}

const $tweet = createTweetElement(data);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

renderTweets(data);


// refactor how tweet data is submitted using jQuery
// add an event listener that listens for the submit event
// prevent the default behaviour of the submit event 
// create an AJAX POST request in client.js that sends the form data to the server
$(document).ready(function() {
  $('#submit-tweet').on('submit', function(event) {
    event.preventDefault();
    console.log(event.preventDefault());
    
    const formData = $(this).serialize()

    $.ajax('/tweets/', { url: 'http://localhost:8080/tweets', method: 'POST', data: formData })
        .then(function(response) {
          renderTweets(response);
        });
  });
});


// Timeago function
$(document).ready(function (timeago) {

  timeago.format(data["created_at"]);

});

console.log(timeago.format(1619025180007));