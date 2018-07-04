//Création de l'objet objMap
var objMap = {
    lat: 45.763413, //Latitude
    lng: 4.835462, //Longitude
    zoom: 12, //Niveau de zoom de la carte

    //Initialisation de la Map
    initMap: function () {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.zoom,
            center: {
                lat: this.lat,
                lng: this.lng
            }
        });
        objMarkers.initJson();
    },
};
