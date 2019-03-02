$(document).ready(function () {
    // global variables for Star Wars Game
    var UserCharacterChosen = false;
    var EnemySelected = false;
    var OpponentSelected = false;
    var userAttackBut = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112];
    var characterIndex = 0;
    var abiliteisIndex = 0;
    var characters = [{

        Name: "Rey",
        abiliteis :[$("#rey"), 220, 15],
    },
    {

        Name: "Luke",
        abiliteis :[$("#luke"), 190, 20],
    },
    {
        Name: "Darth Vader",
        abiliteis :[$("#vader"), 250, 10],
    },
    {
        Name: "Kylo Ren",
        abiliteis :[$("#kylo-ren"), 170, 25]

    }];
    var userCharacter = [];
    var enemies = [];
    var opponent = [];

    // console.log(characters[0].abiliteis[1]);

    // starting of the star wars game
    function startMyGame() {
        UserCharacterChosen = false;
        EnemySelected = false;
        OpponentSelected = false;
        characters = [{

            Name: "Rey",
            abiliteis :[$("#rey"), 220, 15],
        },
        {
    
            Name: "Luke",
            abiliteis :[$("#luke"), 190, 20],
        },
        {
            Name: "Darth Vader",
            abiliteis :[$("#vader"), 250, 10],
        },
        {
            Name: "Kylo Ren",
            abiliteis :[$("#kylo-ren"), 170, 25]
    
        }];

    }


    $(".btn").on("click", function userSelection() {
        if (!UserCharacterChosen) {
            $("#user-choice").append(this);
            UserCharacterChosen = true;
            $("#enemies").append($("#character-display"));
            EnemySelected=true;

        } else if (!OpponentSelected&&UserCharacterChosen) {
            $("#opponent").append(this);
            OpponentSelected = true;
        };

    });

    
    $("#attack-button").on("click", function battle() {
        if (OpponentSelected) {
            for (attackStrength = 0; attackStrength < userAttack.length; attackStrength++) {
                attackStrength = userAttack;
            };

        }
    });



});




