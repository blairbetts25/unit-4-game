$(document).ready(function () {
    // global variables for Star Wars Game
    //
    var UserCharacterChosen;
    var OpponentChosen;
    var userAttack;
    var userCharacter;
    var enemiesLeft;
    var opponent;
    var enemiesDefeated = [];
    var characters = [];
    var fates = new Audio('Star_Wars_I_-_Duel_Of_The_Fates.mp3')
    var loseTheme = new Audio('The_ Imperial_March.mp3');
    var winTheme = new Audio('Main_Theme.mp3');
    // Constant variables
    const characterEnum = {
        rey: 0,
        luke: 1,
        vader: 2,
        kyloRen: 3

    }
    // rate at which the attack increases
    const attackIncreaseAmount = 8;
    // Funciton to update character HP anywhere in the game
    function displayCharacterHP(whichCharacter) {
        characters[whichCharacter].ID.find(".hp").html("<div>" + characters[whichCharacter].HP + "</div>")
    };


    // console.log(characters[0].abiliteis[1]);
    startMyGame();

    // starting of the star wars game
    function startMyGame() {
        // Has the user selected a character
        UserCharacterChosen = false;
        // Has the user selected an opponent
        OpponentChosen = false;
        // character information
        characters = [{

            Name: "Rey",
            ID: $("#rey"),
            HP: 220,
            Attack: 15
        },
        {

            Name: "Luke",
            ID: $("#luke"),
            HP: 200,
            Attack: 20
        },
        {
            Name: "Darth Vader",
            ID: $("#vader"),
            HP: 250,
            Attack: 10
        },
        {
            Name: "Kylo Ren",
            ID: $("#kylo-ren"),
            HP: 170,
            Attack: 25

        }];

        characters[characterEnum.rey].ID.attr('data-characterData', characterEnum.rey);
        characters[characterEnum.luke].ID.attr('data-characterData', characterEnum.luke);
        characters[characterEnum.vader].ID.attr('data-characterData', characterEnum.vader);
        characters[characterEnum.kyloRen].ID.attr('data-characterData', characterEnum.kyloRen);
        // user attack start point
        userAttack = 0;
        // how many characters are left
        enemiesLeft = characters.length - 1;
        // hide the reset button
        $("#reset-button").hide();
        // hide the stop music button
        $("#music-button").hide();
        // hide the attack music button
        $("#attack-music-button").hide();
        // hide the lose music button
        $("#lose-music-button").hide();
        // hid the win music button
        $("#win-music-button").hide();

        // shows the characters HP
        for (i = 0; i < characters.length; i++) {
            displayCharacterHP(i);
        };
    };

    // function for user to select a character
    $(".jedi").on("click", function userSelection() {
        if (!UserCharacterChosen) {
            userCharacter = this.getAttribute('data-characterData');
            $("#user-choice").append(this);
            UserCharacterChosen = true;
            // The characters the user didnt select get moved to the enemies section
            for (move = 0; move < characters.length; move++) {
                if (move != userCharacter) {
                    // move characters that arent the user charatcer to the enemies div
                    $("#enemies").append(characters[move].ID);
                };
            };

            // user selects an opponent to fight
        } else if (!OpponentChosen) {
            if (userCharacter != this.getAttribute('data-characterData')) {
                // user selects their opponent
                $("#opponent").append(this);
                OpponentChosen = true;
                // opponet recieves its values from the array
                opponent = this.getAttribute('data-characterData');
                // change the text from pick you character to enemies left
                $("#direction").text("Enemies left");
                // display enemies left
                $("#direction").append("<h1>" + enemiesLeft + "</h1>");
                // display the attack music button
                $("#attack-music-button").show();
                // display the stop music button
                $("#music-button").show();
            }
            // if the user tries to click on the character they have chosen for their opponent
            else { alert("You cant pick that character") };
        };


    });


    $("#attack-button").on("click", function battle() {

        if (UserCharacterChosen) {
            if (OpponentChosen) {
                //assign usercharacter attack strength
                userAttack += attackIncreaseAmount;
                // Text for the user character attack on the opponent
                $("#result-user").html("<h2>" + characters[userCharacter].Name + " attacks " + characters[opponent].Name + " for " + userAttack + " HP" + "</h2>");
                //opponent HP minus the userattack
                characters[opponent].HP -= userAttack;
                // displaying the opponent HP
                displayCharacterHP(opponent);
                // Text for the opponent attack on the user character
                $("#result-opponent").html("<h2>" + characters[opponent].Name + " attacks " + characters[userCharacter].Name + " for " + characters[opponent].Attack + " HP" + "</h2>");
                //user character HP minus the opponent attack
                characters[userCharacter].HP -= characters[opponent].Attack;
                // displaying the user character HP
                displayCharacterHP(userCharacter);
                // If opponent HP reaches 0
                if (characters[opponent].HP <= 0) {
                    // Hide the button
                    characters[opponent].ID.hide();
                    // display who has been defeated
                    $("#result-opponent").html("<h2>" + characters[opponent].Name + " has been defeated " + "</h2>");
                    // clear out the text in the div
                    $("#result-user").empty();
                    OpponentChosen = false;
                    UserCharacterChosen = true;
                    // lower the enemies left count by 1
                    enemiesLeft--
                    // conditions if the user wins
                    if (enemiesLeft === 0) {
                        fates.pause();
                        winTheme.play();
                        alert("YOU HAVE SAVED THE GAXLAY!!!!!");
                        // hide the attack button
                        $("#attack-button").hide();
                        // display the reset button
                        $("#reset-button").show();
                        // hide the attack music button
                        $("#attack-music-button").hide();
                        // show the win music button
                        $("#win-music-button").show();




                    }
                }
                // If the user character HP reaches 0
                else if (characters[userCharacter].HP <= 0) {
                    fates.pause();
                    loseTheme.play();
                    alert("OH NO YOU HAVE LOST. Try to save the gaxlaxy again?")
                    UserCharacterChosen = false;
                    // hide the attack button
                    $("#attack-button").hide();
                    // hide the attack music button
                    $("#attack-music-button").hide();
                    // show the lose music button
                    $("#lose-music-button").show();
                    // display the reset button
                    $("#reset-button").show();
                    // show the user has been defeated
                    $("#result-user").html("<h2>" + characters[userCharacter].Name + " has been defeated " + "</h2>")
                    // clear the text in the div
                    $("#result-opponent").empty();
                }
            } else {
                alert('"You must join me and choose someone to rule the galxay"..... Darth Vader')
            }
        } else {

            alert('"mhmmm character choose you must"...Yoda')
        }
    });
    // play attack music
    $("#attack-music-button").on("click", function playAttackmusic() {
        fates.play();
    });
    // play win music
    $("#win-music-button").on("click", function playWinmusic() {
        winTheme.play();
    });
    // play lose music
    $("#lose-music-button").on("click", function playLosemusic() {
        loseTheme.play();
    });
    // stop any music
    $("#music-button").on("click", function stopmusic() {
        loseTheme.pause();
        winTheme.pause();
        fates.pause();
    });

    $("#reset-button").on("click", function reset() {
        // run function startmygame
        startMyGame();
        // display the attack button
        $("#attack-button").show();
        // display the characters
        $(".jedi").show();
        // move the character back to the staring div for the game to begin
        for (move = 0; move < characters.length; move++) {
            $("#character-display").append(characters[move].ID);
        };
        // clear the text
        $("#result-user").empty();
        // clear the text
        $("#result-opponent").empty();
        // reset the enemies left
        enemiesLeft = characters.length - 1;
        // set text to pick your character
        $("#direction").text("Pick Your Character");
        // stop playing lose music
        loseTheme.pause();
        // stop playing win music
        winTheme.pause();
        // hide the attack music button
        $("#attack-music-button").hide();
        // hide the lose music button
        $("#lose-music-button").hide();
        // hid the win music button
        $("#win-music-button").hide();




    });



});




