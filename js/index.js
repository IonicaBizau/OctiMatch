(function () {

    var xVal = +(Url.queryString("x")) || 6
      , yVal = +(Url.queryString("y")) || 5
      ;

    switch (Url.queryString("skill")) {
        case "easy":
            yVal = 2;
            xVal = 3;
            break;
        case "medium":
            yVal = 4;
            xVal = 8;
            break;
        case "hard":
            yVal = 7;
            xVal = 10;
            break;
    }

    var game = new Match(".game", {
        templateElm: ".templates > div"
      , autoremove: false
      , size: {
            x: xVal
          , y: yVal
        }
      , step: {
            x: 100
          , y: 100
        }
    }, OCTICONS);

    var timeElms = document.getElementsByClassName("time")
      , pairsCountElms = document.getElementsByClassName("pairs-count")
      , timeEl = timeElms[0]
      , youWonTimeEl = timeElms[1]
      , pairsCountEl = pairsCountElms[0]
      , youWonPairsEl = pairsCountElms[1]
      , youWonEl = document.querySelector(".you-won")
      , youWonWrapperEl = document.querySelector(".you-won-wrapper")
      ;

    game.on("win", function () {
        setTimeout(function () {
            youWonEl.classList.remove("hide");
            youWonWrapperEl.classList.remove("hide");
            youWonEl.classList.add("fadeInDown");
            youWonWrapperEl.classList.add("fadeIn");
        }, 1000);
    });

    game.on("activate", function (elm) {
        elm.children[1].classList.remove("flipInY");
        elm.children[0].classList.remove("flipOutY");

        elm.children[0].classList.add("flipInY", "animated");
        elm.children[1].classList.add("flipOutY", "animated");
    });

    game.on("deactivate", function (elm) {
        elm.children[0].classList.remove("flipInY");
        elm.children[1].classList.remove("flipOutY");

        elm.children[1].classList.add("flipInY", "animated");
        elm.children[0].classList.add("flipOutY", "animated");
    });

    game.on("success", function (elm1, elm2) {
        setTimeout(function() {
            elm1.classList.add("zoomOut", "animated");
            elm2.classList.add("zoomOut", "animated");
            setTimeout(function() {
                elm1.remove();
                elm2.remove();
            }, 500);
        }, 1000);
    });

    game.on("time", function (time) {
        var sec = time / 1000
          , min = Math.floor(sec / 60)
          ;

        sec = Math.floor(sec - min * 60);
        sec = (sec < 10 ? "0" : "") + sec;
        min = (min < 10 ? "0" : "") + min;

        youWonTimeEl.innerHTML = timeEl.innerHTML = min + ":" + sec;
    });

    game.start();
    game.on("pair-flip", function () {
        youWonPairsEl.innerHTML = pairsCountEl.innerHTML = game.flippedPairs;
    });
})();
