/* eslint-env jquery */
/* eslint-env es6 */
/* eslint-disable */
//Function expression to select elements
$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on("input", function() {
    let maxChar = 140 - $(this).val().length;
    $(".counter").text(maxChar);
    
    if (maxChar < 0) {
      $("#counter").css("color", "#DC143C");
    } else {
      $("#error").hide();
      $("#counter").css("color", "#545149");
    }
  });
});
console.log("document-callback:", document);