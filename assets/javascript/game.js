
var words = ["DarthVader"];
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var count = 10;
var answer = "";

var wins = " ";
var losses =" ";

$(document).ready(function() {
$("#count").text(count);
chooseWord();
createLetterButtons();

$("#wins-span").text(localStorage.getItem("wins"));
$("#lose-span").text(localStorage.getItem("losses"));
});


//Create letter buttons
function createLetterButtons() {

      for (var i=0; i<letters.length; i++) {
        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color");
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $("#buttons").append(letterBtn);

      }

      //Add click event to the letter buttons
      $(".letter-button").on("click", function(){
      	if($("*#hidden-letter-" + $(this).attr("data-letter")).length !== 0){ 
          console.log($("*#hidden-letter-" + $(this).attr("data-letter")).length)
          //Change _ to matched data letter value
      		$("*#hidden-letter-" + $(this).attr("data-letter")).text($(this).attr("data-letter"));
          //Removes button
          $(this).remove();

          
        if($("#blank-word").children().text().indexOf("_ ") == -1){
          wins ++;
          $("#buttons").remove();
          $("#title").text("Guessed Correct, You have.");
          $("#play").append("<br><button onclick='reloadPage()'>Play Again!</button>");
          }
          
      	}else{
          
      		count -= 1;
	      	$("#wrong-letters").append($(this).attr("data-letter")); 
        
          $("#count").text(count);
          
	        if(count==0){
            losses ++;
            $("#blank-word").replaceWith('<div class="answer">' + answer + '</div');
	        	$("#buttons").remove();
	        	$("#title").text("Out of guesses you are.");
	        	$("#play").append("<br><button onclick='reloadPage()'>Play Again!</button>");
	        }
	      	$(this).remove(); //Removes letters choices leftover
      	}
                    var temp = document.getElementById("wins-span");
                    temp.textContent = wins;

                    var temp = document.getElementById("lose-span");
                    temp.textContent = losses;

                    localStorage.setItem("wins", wins);
                    localStorage.setItem("losses", losses);
      	
	})
};

//Randomly chooses word and convert it to upper case
function chooseWord () {
    var word = words[Math.floor(Math.random() * words.length)];
    answer = word.toUpperCase();
    hiddenWord(answer);
}

//Creates the span element with the underscore for each letter of the hidden word
function hiddenWord (word) {
$.each(word.split(""), function (i, el) {
$("#blank-word").append("<span id='hidden-letter-" + el + "'>_ </span");
    });
	
 }


 function reloadPage() {
    location.reload();
}


