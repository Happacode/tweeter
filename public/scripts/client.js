/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* eslint-env jquery */
/* eslint-env es6 */
/* eslint-disable */
$(document).ready(function() {

  // prevent XSS attacks with escaping
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadtweets = () => {
    $.ajax('/tweets/', {
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    })
      .then(function(response) {
        renderTweets(response);
      });
  };

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
      <div class="user-avatars"><img src = ${escape(tweet.user.avatars)}></div>
      <div class="user-name">${escape(tweet.user.name)}</div>
      <div class="user-handle">${escape(tweet.user.handle)}</div>
    </header>
    <div class="text-input" action="/tweets">
      <div id="tweet-text">
      ${escape(tweet.content.text)}
      </div>
    </div>
    <footer class="container-footer">
      <div class="timeago" datetime="2021-04-20T09:24:17Z">${timeago.format(tweet["created_at"])}</div>
      <div class="icons"><i class="fab fa-font-awesome-flag"></i><i class="fas fa-retweet"></i><i class="far fa-heart"></i></div>
    </footer>
    </article>
    `);

    return $tweet;
  }

  // refactor how tweet data is submitted using jQuery
  // add an event listener that listens for the submit event
  // prevent the default behaviour of the submit event 
  // create an AJAX POST request in client.js that sends the form data to the server

    $('#submit-tweet').on('submit', function(event) {
      event.preventDefault();
      const formData = $(this).serialize()
      const tweetText = ("tweet.content.text");

      if (tweetText.length > 140) {
        $('#error-message').html('Your tweet is to long! Please keep below 140 character limit');
        $('#error-message').slideDown(300);
        return;
      }

      if (tweetText.length === 0) {
        $('#error-message').html('Your tweet is empty, please type in your tweet');
        $('#error-message').slideDown(300);
        return;
      }
      
      $('#error-message').slideUp(300);
      $('tweetText').val("");
      $('.counter').val(140);

    $.ajax('/tweets/', { url: 'http://localhost:8080/tweets', method: 'POST', data: formData })
        .then(function(response) {
          loadtweets(response);
        });
      
      $('#error-message').slideUp(300);
      $('tweetText').val("");
      $('.counter').val(140);

    });
    loadtweets();
});