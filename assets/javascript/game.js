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
            HP: 190,
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
        userAttack = 0;
        enemiesLeft = characters.length - 1;
        // hide the reset button
        $("#reset-button").hide();
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
                    $("#enemies").append(characters[move].ID);
                };
            };

            // user selects an opponent to fight
        } else if (!OpponentChosen) {
            if (userCharacter != this.getAttribute('data-characterData')) {
                $("#opponent").append(this);
                OpponentChosen = true;
                opponent = this.getAttribute('data-characterData');
                $("#direction").text("Enemies left");
                $("#direction").html("<h1>" + enemiesLeft + "</h1>");
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
                $("#result-user").html("<h2>" + characters[userCharacter].Name + " attacks " + characters[opponent].Name + " for " + userAttack + "</h2>");
                //opponent HP minus the userattack
                characters[opponent].HP -= userAttack;
                // displaying the opponent HP
                displayCharacterHP(opponent);
                // Text for the opponent attack on the user character
                $("#result-opponent").html("<h2>" + characters[opponent].Name + " attacks " + characters[userCharacter].Name + " for " + characters[opponent].Attack + "</h2>");
                //user character HP minus the opponent attack
                characters[userCharacter].HP -= characters[opponent].Attack;
                // displaying the user character HP
                displayCharacterHP(userCharacter);
                // If opponent HP reaches 0
                if (characters[opponent].HP <= 0) {
                    // Hide the button
                    characters[opponent].ID.hide();
                    OpponentChosen = false;
                    UserCharacterChosen = true;
                    enemiesLeft--
                    if (enemiesLeft === 0) {
                        alert("YOU HAVE SAVED THE GAXLAY!!!!!");
                        $("#attack-button").hide();
                        $("#reset-button").show();


                    }
                }
                // If the user character HP reaches 0
                else if (characters[userCharacter].HP <= 0) {
                    alert("OH NO YOU HAVE LOST. Try to save the gaxlaxy again?")
                    UserCharacterChosen = false;
                    $("#attack-button").hide();
                    $("#reset-button").show();
                }
            } else {
                alert('"You must join me and choose someone to rule the galxay"..... Darth Vader')
            }
        } else {

            alert('"mhmmm character choose you must"...Yoda')
        }
    });

    $("#reset-button").on("click", function reset() {
        startMyGame();
        $("#attack-button").show();
        $(".jedi").show();
        for (move = 0; move < characters.length; move++) {
            $("#character-display").append(characters[move].ID);
        };
        $("#result-user").empty();
        $("#result-opponent").empty();
        enemiesLeft = characters.length - 1;
        $("#direction").text("Pick Your Character");




    });



});




