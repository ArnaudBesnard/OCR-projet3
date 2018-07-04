const stationFermee = 'img/markers/station_closed.png';
const stationZero = 'img/markers/0.png';
const station25 = 'img/markers/25.png';
const station50 = 'img/markers/50.png';
const station75 = 'img/markers/75.png';
const station100 = 'img/markers/100.png';
var donneesSessionName = sessionStorage.getItem('name');
var donneesSessionAddress = sessionStorage.getItem('adresse');
var donnesSessionTimer = sessionStorage.getItem('heure-reservation');

var objMarkers = {
    //Url de l'api Json
    urlJson: "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=3185f995df634c5ea178134b7013a70b9317e359",
    tabMarkers: [],
    //Initialisation des données Json
    initJson: function () {
        $.getJSON(this.urlJson, function (data) {
            $.each(data, function (key, station) {
                objMarkers.initMarker(station);
            });
            var markerCluster = new MarkerClusterer(map, objMarkers.tabMarkers, {
                imagePath: 'img/markers/m'
            });
        });
    },
    //Initialisation des markers
    initMarker: function (station) {
        //Calcul du % de vélos disponibles
        var statutStation = (station.available_bikes * 100) / (station.bike_stands);
        //Affectation des icones selon le poucentage de vélos dispos
        if (station.status != 'OPEN') {
            iconBase = stationFermee; //Station fermée
        } else if (statutStation === 100) {
            iconBase = stationZero; // 100% des vélos dispos
        } else if (statutStation < 100 && statutStation >= 66) {
            iconBase = station25; // 75% des vélos dispos
        } else if (statutStation < 66 && statutStation >= 33) {
            iconBase = station50; //50% des vélos dispos
        } else if (statutStation < 33 && statutStation > 0) {
            iconBase = station75; // 25% des vélos dispos
        } else if (statutStation === 0) {
            iconBase = station100; //Aucun vélo dispo
        }
        var marker = new google.maps.Marker({
            position: station.position,
            map: map,
            icon: iconBase,
            title: "Station : " + station.name + " | Vélos disponibles : " + station.available_bikes
        });
        objMarkers.tabMarkers.push(marker);

        //On test si le sessionStorage est vide ou renseigné
        if (sessionStorage.length != 0) {
            $('#ligneStation').text("Vous avez réservé un vélo à la station : " + donneesSessionName);
            $('#ligneAdresse').text("située à l'adresse : " + donneesSessionAddress);
            objTimer.resetTimer(); // On réinitialise le timer
            objTimer.duree = objTimer.diffTime(); // On affecte la durée restante à la propriété durée
            objTimer.initTimer(); //On lance le timer
        } else {
            $('#ligneStation').text("Aucune réservation en cours");
            $('#ligneAdresse').text("Sélectionnez une station afin de réserver un vélo");
        }
        //Fonction click sur marker
        marker.addListener('click', function () {
            $('#reservation').show('slow');
            //Affichage des données stations dans le DIV Infos Stations
            $('#nomStation').text(station.name);
            $('#adresse').text(station.address);
            //Traduction de l'état des stations
            if (station.status === "OPEN") {
                $('#etatStation').text("Ouvert");
                $('#etatStation').css("color", "#23ac30");
                $('#etatStation').css("font-weight", "bold");
                if (station.available_bikes > 0) {
                    $('.buttonReservation').css("display", "block");
                } else {
                    $('.buttonReservation').css("display", "none");
                }
            } else {
                $('#etatStation').text("Fermé");
                $('#etatStation').css("color", "#ff2c45");
                $('#etatStation').css("font-weight", "bold");
                $('.buttonReservation').css("display", "none");
            }
            $('#placesTotales').text(station.bike_stands);
            $('#placesDispo').text(station.available_bike_stands);
            $('#velosDispo').text(station.available_bikes);

            $('.buttonReservation').click(function () {
                sessionStorage.setItem('adresse', station.name); //Stockage des données "station.name" dans le sessionStorage
                sessionStorage.setItem('name', station.address); //Stockage des données "station.address" dans le sessionStorage
                var time = new Date();
                sessionStorage.setItem('heure-reservation', time.getTime()); //Stockage de l'heure du click dans le sessionStorage
                var heureReservation = sessionStorage.getItem('heure-reservation');
                objTimer.resetTimer(); //On reset le timer()
                objTimer.initTimer(); // Appel de la fonction Timer()
                $('#ligneStation').text("Vous avez réservé un vélo à la station : " + station.name);
                $('#ligneAdresse').text("située à l'adresse : " + station.address);
                $('.buttonAnnul').text('Annuler');
            }); //emplacement fermeture accolade parenthese de la fonction click;

            $('.buttonClose').click(function () {
                $('#reservation').hide('slow');
            });
        });
        if (sessionStorage.length === 0) {
            $('.buttonAnnul').css('display', 'none');
        }
        $('.buttonAnnul').click(function () {
            //On vide le sessionStorage
            sessionStorage.clear();
        });
    }
};
