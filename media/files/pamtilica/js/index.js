// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen
$("footer").hide();

$(".gumb").click(function () {
    sadrzaj = $(this).attr('class').split(' ')[0]
    $(".modal").html("<h2 class='winner'>odaberi područje</h2><hr><button class='kontinentb' id='afrika'>Afrika</button><button class='kontinentb' id='australija'>Australija i oceanija</button> <button class='kontinentb' id='azija'>Azija</button> <button class='kontinentb' id='europa'>Europa</button> <button class='kontinentb' id='jamerika'>Južna Amerika</button> <button class='kontinentb' id='samerika'>Sjeverna Amerika</button>  <button class='kontinentb' id='nesamostalna'>Nesamostalna područja</button>")
    if (sadrzaj=="grbovi" || sadrzaj=="zastave-grbovi"){
        $("#nesamostalna").hide()
        $("#samerika").css({"margin-bottom":"0"})
    }
    podrucje=""
    $(".kontinentb").click(function (e) {
        $(".modal").html("<h2 class='winner'>odaberi broj parova</h2><hr><button id='prva'>4</button> <button id='druga'>8</button> <button id='treca' style='margin-bottom:0;'>12</button>");
        podrucje=e.target.id

        $("#prva").click(function () {
            razina = "1";
            igra()
        })
        $("#druga").click(function () {
            razina = "2";
            igra()
        })
        $("#treca").click(function () {
            razina = "3";
            igra()
        })
    })

   


    function igra() {
        $("body").addClass("crvenko")
        if (razina == 1) {
            broj_karata = 4;

        } else if (razina == 2) {
            broj_karata = 8;
        }
        else if (razina == 3) {
            broj_karata = 12;
        }
        $("footer").fadeIn(1000);
        $(".modal").fadeOut(1000);
        $(".modal-overlay").delay(1000).slideUp(1000);
        $(".game").show(1000);
        $("#okretanje")[0].play();
        $(".brojevi").addClass("crveni_broj")
        //localStorage.clear();
        var br = 1;
        var sec = 0;
        var pokusaj = 0;
        var vrijeme = 1;
        var bodovi = 0;

        function pad(val) {
            return val > 9 ? val : "0" + val;
        }
        setInterval(function () {
            if (vrijeme == 1) {
                $("#seconds").html(pad(++sec % 60));
                $("#minutes").html(pad(parseInt(sec / 60, 10)));
            }
        }, 1000);

        var Memory = {
            init: function (cards) {
                this.$game = $(".game");
                this.$modal = $(".modal");
                this.$overlay = $(".modal-overlay");
                this.$biti = $(".zastave");
                this.cardsArray = $.merge(cards, cards);
                this.shuffleCards(this.cardsArray);
                this.setup();
            },
            shuffleCards: function (cardsArray) {
                this.$cards = $(this.shuffle(this.cardsArray));
            },
            setup: function () {
                this.html = this.buildHTML();
                this.$game.html(this.html);
                this.$memoryCards = $(".card");
                this.binding();
                this.paused = false;
                this.guess = null;
                this.$cards = $(this.shuffle(this.cardsArray));
            },

            binding: function () {
                this.$memoryCards.on("click", this.cardClicked);
                this.$biti.on("click", $.proxy(this.reset, this));
            },
            // kinda messy but hey
            cardClicked: function () {
                $("#okret")[0].play();
                var _ = Memory;
                var $card = $(this);
                if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                    $card.find(".inside").addClass("picked");
                    if (!_.guess) {
                        _.guess = $(this).attr("data-id");
                        $(this).find('p').toggle();
                    } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                        $(".picked").addClass("matched");
                        $("#win")[0].play();
                        bodovi = bodovi + 15;
                        _.guess = null;
                        $(".matched").find('p').remove();
                        pokusaj++;
                        vrijeme = 0;
                        if (sadrzaj=="zastave-grbovi"){
                            swal({
                                title: '' + $(this).attr('data-ime'),
                                html: '<img src="../karta/zastave/' + $(this).attr('data-img') + '" class="ikone2"/><p>' + $(this).attr('data-opis') + '</p><br><img src="../karta/grbovi/' + $(this).attr('data-img2') + '" class="ikone2"/><br><p>' + $(this).attr('data-opis2') + '</p><br><p style="text-align:center"><a href="'+$(this).attr('data-url')+'" target="_blank">doznaj više o području</a></p>',
                                showCloseButton: true,
                                confirmButtonText: 'dalje',
                                /*allowOutsideClick: false,*/
                                /*allowEscapeKey: false*/
                                onClose: () => {
                                    vrijeme = 1;
                                    $.stopSound();
                                }
                            })
                        }
                        else{
                        swal({
                            title: '' + $(this).attr('data-ime'),
                            html: '<img src="../karta/' + sadrzaj + "/" + $(this).attr('data-img') + '" class="ikone"/><p>' + $(this).attr('data-opis') + '</p><br><p style="text-align:center"><a href="'+$(this).attr('data-url')+'" target="_blank">doznaj više o području</a></p>',
                            showCloseButton: true,
                            confirmButtonText: 'dalje',
                            /*allowOutsideClick: false,*/
                            /*allowEscapeKey: false*/
                            onClose: () => {
                                vrijeme = 1;
                                $.stopSound();
                            }
                        })}
                    } else {
                        pokusaj++;
                        $(this).find('p').toggle();
                        _.guess = null;
                        _.paused = true;
                        setTimeout(function () {
                            $(".picked").removeClass("picked");
                            Memory.paused = false;
                            $(".brojevi").show();
                            bodovi = bodovi - 5
                        }, 1200);
                    }
                    if ($(".matched").length == $(".card").length) {
                        _.win();
                    }
                }
            },

            win: function () {
                this.paused = true;
                setTimeout(function () {
                    Memory.showModal();
                    Memory.$game.fadeOut();
                }, 1000);
            },

            showModal: function () {
                var minute = Math.floor(sec / 60);
                var sekunde = sec - minute * 60;
                this.$overlay.show();
                this.$modal.fadeIn("slow");
                var najvrijeme = localStorage.getItem('najvrijeme');

                if (najvrijeme === undefined || najvrijeme === null) {
                    najvrijeme = sec;
                    localStorage.setItem('najvrijeme', sec);
                }

                // If the user has more points than the currently stored high score then
                if (sec < najvrijeme) {
                    // Set the high score to the users' current points
                    najvrijeme = sec;
                    // Store the high score
                    localStorage.setItem('najvrijeme', sec);
                }
                // Return the high score

                var najpokusaji = localStorage.getItem('najpokusaji');

                if (najpokusaji === undefined || najpokusaji === null) {
                    najpokusaji = pokusaj;
                    localStorage.setItem('najpokusaji', pokusaj);
                }

                // If the user has more points than the currently stored high score then
                if (pokusaj < najpokusaji) {
                    // Set the high score to the users' current points
                    najpokusaji = pokusaj;
                    // Store the high score
                    localStorage.setItem('najpokusaji', pokusaj);
                }
                var naj_minute = Math.floor(najvrijeme / 60);
                var naj_sekunde = najvrijeme - naj_minute * 60;
                $(".modal").show();
                $(".modal-overlay").show();
                $(".winner").hide();
                bodovi = bodovi - sec
                $(".modal").html("<div class='winner'>Bravo!</div><div class='time'><br>broj pokušaja : " + pokusaj + "</br>vrijeme spajanja : " + minute + ":" + sekunde + "</br>bodovi: " + bodovi + "<p><br><a href='index.html' style='color:black;'>pokreni novu igru</a></p></div>");

                var target = document.getElementById("ikona");
                var emojiCount = emoji.length;

                for (var index = 0; index < emojiCount; index++) {
                    addEmoji(emoji[index]);
                }

                function addEmoji(code) {
                    var option = document.createElement('option');
                    option.innerHTML = code;
                    option.value = code;
                    target.appendChild(option);
                }
            },

            hideModal: function () {
                this.$overlay.hide();
                this.$modal.hide();
            },

            reset: function () {
                this.hideModal();
                this.shuffleCards(this.cardsArray);
                this.setup();
                this.$game.show(1000);
                pokusaj = 0;
                sec = 0;
                br = 1;
                $(".back").addClass("pozadina-zastave");
            },

            // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
            shuffle: function (array) {
                var counter = array.length,
                    temp, index;
                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);
                    // Decrease counter by 1
                    counter--;
                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }
                return array;
            },

            buildHTML: function () {
                var frag = '';
                br = 1;
       
                if (sadrzaj=="zastave"){
                this.$cards.each(function (k, v) {
                    frag += '<div class="card" data-id="' + v.id + '" data-url="https://www.enciklopedija.hr/Natuknica.aspx?ID=' + v.customData.doznaj_više_url + '" data-img="' + v.customData.zastava_url + '" data-opis="' + v.customData.zastava_opis + '" data-ime="' + v.customData.službeni_naziv + '"><div class="inside">\
                    <div class="front"><img src="../karta/'+ sadrzaj + "/" + v.customData.zastava_url + '"\
                    alt="' + v.id + '" data-ime="' + v.customData.službeni_naziv + '" /></div>\
                    <div class="back"><p class="brojevi">' + br + '</p></div></div>\
                    </div>';
                    if (br < cards.length) {
                        br++;
                    }
                    else{return false}
                });}
                else if (sadrzaj=="grbovi"){
                    this.$cards.each(function (k, v) {
                        frag += '<div class="card" data-id="' + v.id + '" data-url="https://www.enciklopedija.hr/Natuknica.aspx?ID=' + v.customData.doznaj_više_url + '" data-img="' + v.customData.grb_url + '"data-opis="' + v.customData.grb_opis + '" data-ime="' + v.customData.službeni_naziv + '"><div class="inside">\
                        <div class="front"><img src="../karta/'+ sadrzaj + "/" + v.customData.grb_url + '"\
                        alt="' + v.id + '" data-ime="' + v.customData.službeni_naziv + '" /></div>\
                        <div class="back"><p class="brojevi">' + br + '</p></div></div>\
                        </div>';
                        if (br < cards.length) {
                            br++;
                        };
                    });

                }
                else if (sadrzaj=="zastave-grbovi")
                {
                    var lista_slika = [];
                    var lista_imena = [];

                    this.$cards.each(function (k, v) {
                        if (Math.floor((Math.random() * 2) + 1) == 1) {
                            if ($.inArray(v.customData.zastava_opis, lista_imena) == -1) {
                                     frag += '<div class="card" data-id="' + v.id + '" data-url="https://www.enciklopedija.hr/Natuknica.aspx?ID=' + v.customData.doznaj_više_url + '" data-img="' + v.customData.zastava_url + '" data-img2="' + v.customData.grb_url + '"data-opis="' + v.customData.zastava_opis + '" data-opis2="'+v.customData.grb_opis+'" data-ime="' + v.customData.službeni_naziv + '"><div class="inside">\
                    <div class="front"><img src="../karta/zastave/' + v.customData.zastava_url + '"\
                    alt="' + v.id + '" data-ime="' + v.customData.službeni_naziv + '" /></div>\
                    <div class="back"><p class="brojevi">' + br + '</p></div></div>\
                    </div>';
                                if (br < cards.length) {
                                    br++;
                                };
    
                                lista_imena.push(v.customData.zastava_opis);
    
                            } else {
                                frag += '<div class="card" data-id="' + v.id + '" data-url="https://www.enciklopedija.hr/Natuknica.aspx?ID=' + v.customData.doznaj_više_url + '" data-img="' + v.customData.zastava_url + 'data-img2="' + v.customData.grb_url + '"data-opis="' + v.customData.zastava_opis + '" data-opis2="'+v.customData.grb_opis+'" data-ime="' + v.customData.službeni_naziv + '"><div class="inside">\
                                <div class="front"><img src="../karta/grbovi/' + v.customData.grb_url + '"\
                                alt="' + v.id + '" data-ime="' + v.customData.službeni_naziv + '" /></div>\
                                <div class="back"><p class="brojevi">' + br + '</p></div></div>\
                                </div>';
                                if (br < cards.length) {
                                    br++;
                                };
                                lista_slika.push(v.customData.zastava_url);
                            }
                        } else {
                            if ($.inArray(v.customData.zastava_url, lista_slika) == -1) {
                                frag += '<div class="card" data-id="' + v.id + '" data-url="https://www.enciklopedija.hr/Natuknica.aspx?ID=' + v.customData.doznaj_više_url + '" data-img="' + v.customData.zastava_url + '" data-img2="' + v.customData.grb_url + '" data-opis="' + v.customData.zastava_opis + '" data-opis2="'+v.customData.grb_opis+'" data-ime="' + v.customData.službeni_naziv + '"><div class="inside">\
                                <div class="front"><img src="../karta/grbovi/' + v.customData.grb_url + '"\
                                alt="' + v.id + '" data-ime="' + v.customData.službeni_naziv + '" /></div>\
                                <div class="back"><p class="brojevi">' + br + '</p></div></div>\
                                </div>';
                                if (br < cards.length) {
                                    br++;
                                };
    
                                lista_slika.push(v.customData.zastava_url);
    
    
                            } else {
                                frag += '<div class="card" data-id="' + v.id + '" data-url="https://www.enciklopedija.hr/Natuknica.aspx?ID=' + v.customData.doznaj_više_url + '" data-img="' + v.customData.zastava_url + '" data-img2="' + v.customData.grb_url + '"data-opis="' + v.customData.zastava_opis + '" data-opis2="'+v.customData.grb_opis+'" data-ime="' + v.customData.službeni_naziv + '"><div class="inside">\
                    <div class="front"><img src="../karta/zastave/' + v.customData.zastava_url + '"\
                    alt="' + v.id + '" data-ime="' + v.customData.službeni_naziv + '" /></div>\
                    <div class="back"><p class="brojevi">' + br + '</p></div></div>\
                    </div>';
                                if (br < cards.length) {
                                    br++;
                                };
                                lista_imena.push(v.customData.zastava_opis);
                            }
                        }
                    });
                }
                return frag;
            }
        };

        var cards = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "../karta/js/podatci.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })();

        //micanje praznih
        mici=["GI","GG","JE","SJ","IO","BV","JU","YT","GO","RE","SH","FK","GF","GS","VI","AI","AW","BM","BQ","VG","CW","GP","KY","MQ","MS","PR","BL","MF","SX","PM","TC","AS","UM-JQ","CX","PF","TF","GU","UM-DQ","CC","CK","UM-MQ","NU","NF","UM-FQ","HM","UM-HQ","UM-WQ","PN","MP","TK","WF"]

        var arrayLength = mici.length;
        for (var i = 0; i < arrayLength; i++) {
            var cards=cards.filter(item=>item.id !=mici[i] );
        }
       
        
        //europa
        if (podrucje=="europa")
        {var cards = cards.filter(a => a.color == "#F29B28");}
        //samerika
        else if (podrucje=="samerika")
       {var cards = cards.filter(a => a.color == "#E74354");}
        //južnaamerika
        else if (podrucje=="jamerika")
        {var cards = cards.filter(a => a.color == "#F172AC");}
        //afrika
        else if (podrucje=="afrika")
        {var cards = cards.filter(a => a.color == "#469025");}
        //azija
        else if (podrucje=="azija")
        {var cards = cards.filter(a => a.color == "#FFCB00");}
        //Australija i oceanija
        else if (podrucje=="australija")
        {var cards = cards.filter(a => a.color == "#4F9CA9");}
        //Nesamostalna područja jedino zastave
        else if (podrucje=="nesamostalna")
        {var cards = cards.filter(a => a.color.indexOf(' #') !== -1);}
        
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        cards = shuffle(cards);

        cards = cards.slice(0, broj_karata);

        Memory.init(cards);
        $(".brojevi").addClass("crveni_broj");

        if (razina == 1) {
            $(".card").css({
                "width": "25%",
                "height": "50%"
            })
        } else if (razina == 2) {
            $(".card").css({
                "width": "25%",
                "height": "25%"
            })
        }
        else if (razina == 3) {
            $(".card").css({
                "width": "16.66666%",
                "height": "25%"
            })
        }
        if (sadrzaj == "zastave") {
            $(".back").addClass("pozadina-zastave");
        }
        else if (sadrzaj == "grbovi") { $(".back").addClass("pozadina-grbovi"); }
        else if (sadrzaj == "zastave-grbovi") { $(".back").addClass("pozadina-mix"); }
    }
});

