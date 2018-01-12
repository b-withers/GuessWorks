
var words = ["fox", "racoon", "bear", "elephant", "puppy", "rabbit", "deer", "whale", "dolphin", "chicken", "monkey", "beaver", "horse", "kitten", "buffalo", "cheetah", "flamingo", "panda", "hamster", "polarbear", "pig", "giraffe", "alligator", "moose", "chimpanzee", "goose", "donkey", "mouse", "jellyfish", "kangaroo", "owl", "penguin", "rhinoceros", "sheep", "skunk", "sloth", "bunny", "turkey", "zebra", "yak", "Caterpillar","crocodile", "dove", "eagle", "falcon", "frog", "gorila", "Hedgehog", "Hummingbird", "Koala", "Leopard", "seal", "Otter", "porcupine", "ram", "rat", "squirrel", "gazelle", "antelope", "camel", "Hippopotamus", "llama"];

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var count = 10;
var answer = "";

var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/push.mp3");

      // var winnerElement = document.createElement("audio");
      // winnerElement.setAttribute("src", "assets/winner.mp3");

      // var LoserElement = document.createElement("audio");
      // LoserElement.setAttribute("src", "assets/laugh.mp3");

// var wins = " ";
// var losses =" ";


var random_images_array = ["1.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif", "7.gif", "8.gif", "9.gif", "10.gif", "11.gif", "12.gif", "13.gif", "14.gif", "15.gif", "16.gif", "17.gif", "18.gif", "19.gif", "20.gif", "21.gif", "22.gif", "23.gif", "24.gif", "25.gif", "26.gif", "27.gif", "28.gif", "29.gif", "30.gif", "32.gif", "33.gif", "34.gif", "35.gif", "36.gif", "37.gif", "38.gif", "39.gif", "40.gif", "41.gif", "42.gif", "43.gif", "44.gif", "45.gif"];

function getRandomImage(imgAr, path) {
  path = path || 'assets/images/'; 
  var num = Math.floor( Math.random() * imgAr.length );
  var img = imgAr[ num ];
  var imgStr = '<img src="' + path + img + '" alt = "">';
  document.write(imgStr); document.close();
}

$(document).ready(function() {
$("#count").text(count);
chooseWord();
createLetterButtons();

// $("#wins-span").text(localStorage.getItem("wins"));
// $("#lose-span").text(localStorage.getItem("losses"));
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

        audioElement.play();

      	if($("*#hidden-letter-" + $(this).attr("data-letter")).length !== 0){ 
          console.log($("*#hidden-letter-" + $(this).attr("data-letter")).length)
          //Change _ to matched data letter value
      		$("*#hidden-letter-" + $(this).attr("data-letter")).text($(this).attr("data-letter"));
          //Removes button
          $(this).remove();

          
        if($("#blank-word").children().text().indexOf("_ ") == -1){
          //wins ++;
          //winnerElement.play();
          $("#buttons").remove();
          $("#title").text("That is Correct");
          $("#play").append("<br><button onclick='reloadPage()'>Play Again?</button>");
          }
          
      	}else{
          
      		count -= 1;
	      	$("#wrong-letters").append($(this).attr("data-letter")); 
        
          $("#count").text(count);
          
	        if(count==0){
            //LoserElement.play();
            //losses ++;
            $("#blank-word").replaceWith('<div class="answer">' + answer + '</div');
	        	$("#buttons").remove();
	        	$("#title").text("You are out of Guesses");
	        	$("#play").append("<br><button onclick='reloadPage()'>Play Again?</button>");
	        }
	      	$(this).remove(); //Removes letters choices leftover
      	}
                    // var temp = document.getElementById("wins-span");
                    // temp.textContent = wins;

                    // var temp = document.getElementById("lose-span");
                    // temp.textContent = losses;

                    // localStorage.setItem("wins", wins);
                    // localStorage.setItem("losses", losses);
      	
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


