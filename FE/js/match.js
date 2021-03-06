//////////////////////////////////////////// READ ME ////////////////////////////////
// Getting matches is dependent on the login function
// login must define activeUser located on app.js
// get.allMatches(); must run first
// get.closestMatch(); returns one variation of opposite sex same stereotype //
/////////////////////////////////////////////////////////////////////////////////////


var get = {
  allMatches: function() {
    $.ajax({
      url: '/get-users',
      method: 'GET',
      success: function(data) {
        Mdata = JSON.parse(data);

        _.each(Mdata, function(currVal, idx, arr) {
          // checks for opposite sex and not the activeUser user username
          if (currVal.username != activeUser.username && currVal.gender != activeUser.gender) {
            // populates the matchArray with all possible matches for any filter
            matchArray.push(currVal);
          }
        });
      },
      fail: function() {
        console.log("Error finding match");
      }
    });
  },

  closestMatch: function() {
    userType = activeUser.stereotype.typeName;
    // this is where the match is picked from for this 'closest' filter
    sameTypeArray = [];

    _.each(matchArray, function(currVal, idx, arr) {
      // checks for the same stereotype
      if (currVal.stereotype.typeName === userType) {
        sameTypeArray.push(currVal);
      }
    });

     // idxNum is set to a random whole number between 0 and the length of the array - 1
    idxNum = Math.floor(Math.random() * (sameTypeArray.length - 1)) + 0;
    match = sameTypeArray[idxNum];


  },

  oppositeMatch: function() {
     opposite = "";

    oppositeValueArray = {
      Hipster: {
        name: "Hipster",
        opp: "Frat Star / Sorority Sis"
      },
      Frat: {
        name: "Frat Star / Sorority Sis",
        opp: "Hipster"
      },
      Hippie: {
        name: "Hippie",
        opp: "Crossfit"
      },
      Crossfit: {
        name: "Crossfit",
        opp: "Hippie"
      },
      Programmer: {
        name: "Programmer",
        opp: "Skater"
      },
      Skater: {
        name: "Skater",
        opp: "Programmer"
      }
    };

    // find the opposite stereotype
    userType = activeUser.stereotype.typeName;
    _.each(oppositeValueArray, function (currVal, idx, arr) {
      if (currVal.opp === userType) {
        opposite = currVal.name;
      }
    });

    oppositeTypeArray = [];

    _.each(matchArray, function(currVal, idx, arr) {
      // checks for the opposite stereotype
      if (currVal.stereotype.typeName === opposite) {
        oppositeTypeArray.push(currVal);
      }
    });

     // idxNum is set to a random whole number between 0 and the length of the array - 1
    idxNum = Math.floor(Math.random() * (oppositeTypeArray.length - 1)) + 0;
    oppositeMatch = oppositeTypeArray[idxNum];

    console.log(oppositeMatch);

  },

  randomMatch: function() {

  }
};
