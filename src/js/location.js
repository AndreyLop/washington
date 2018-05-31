var locationMap = (function() {

    function init() {
        var mapContainer = document.querySelector('.js-map');
        var mapCenter = {lat: 50.425787, lng: 30.517463};
        var infowindow = null;
        var zoom = 17;
        var initMarkers = [];

        var addr;
        var devEnv = true;

        if(devEnv) {
            addr = '';
        } else {
            addr = "/wp-content/themes/washington/assets/";
        }

        var iconsSpritesheet = addr + 'img/location/location_spritesheet.png';
        var standardIconSize = {x: 43, y: 53};

        var icons = {
            sales_dep: '',
            main: {
                sprite_locaion: {x: 96, y: 2},
                size: {x: 74, y: 90}
            },
            bank: {
                sprite_locaion: {x: 174, y: 2},
                size: standardIconSize
            },
            cafe_restaraunts: {
                sprite_locaion: {x: 35, y: 2},
                size: standardIconSize
            },
            dentist: {
                sprite_locaion: {x: 68, y: 2},
                size: standardIconSize
            },
            gift_shop: {
                sprite_locaion: {x: 101, y: 2},
                size: standardIconSize
            },
            higher_education_establishment: {
                sprite_locaion: {x: 49, y: 2},
                size: standardIconSize
            },
            pharmacy: {
                sprite_locaion: {x: 225, y: 2},
                size: standardIconSize
            },
            school: {
                sprite_locaion: {x: 258, y: 2},
                size: standardIconSize
            },
            shopping_mall: {
                sprite_locaion: {x: 2, y: 2},
                size: standardIconSize
            },
            sport_complex: {
                sprite_locaion: {x: 324, y: 2},
                size: standardIconSize
            },
            supermarket: {
                sprite_locaion: {x: 221, y: 2},
                size: standardIconSize
            },
            toy_store: {
                sprite_locaion: {x: 390, y: 2},
                size: standardIconSize
            },
            custom: {
                icon_location: addr + 'img/location/custom_icon'
            }
        };

        // getting map styles
        var xmlhttp = new XMLHttpRequest();
        var url = addr + "js/map.style.json";
        var globalStyles;
    
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var styles = JSON.parse(this.responseText);
                globalStyles = styles;
                initMapWithStyles(styles);
            };
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();


        function getIcon(marker) {
            if(icons[marker.type].size !== undefined) {
                return new google.maps.MarkerImage(iconsSpritesheet, 
                    new google.maps.Size(icons[marker.type].size.x, icons[marker.type].size.y), 
                    new google.maps.Point(icons[marker.type].sprite_locaion.x, icons[marker.type].sprite_locaion.y));
            } else {
                return icons[marker.type].icon_location;
            }
        };

        // creating map and markers
        function initMapWithStyles(styles) {

            var map = new google.maps.Map(mapContainer, {
                zoom: zoom,
                center: mapCenter,
                disableDefaultUI: true,
                styles: styles
            });

            var markers = [
                {lat: 50.425611, lng: 30.5188594, type: 'main', message: '<div class="infowindow"><img src="img/home/washington_logo.png" alt><div >Вулиця Лабораторна, 12</div><div>(044) 222-22-22</div></div>'},
                {lat: 50.425305, lng: 30.517119, type: 'shopping_mall', message: '<span class="infowindow">shopping_mall</span>'},
                {lat: 50.424534, lng: 30.518659, type: 'supermarket', message: '<span class="infowindow">supermarket</span>'},
                {lat: 50.424452, lng: 30.520461, type: 'bank', message: '<span class="infowindow">bank</span>'},
                {lat: 50.425559, lng: 30.521448, type: 'higher_education_establishment', message: '<span class="infowindow">higher_education_establishment</span>'}
            ];

            markers.forEach(function(marker) {
    
                var marker = new google.maps.Marker({
                    position: {lat: marker.lat, lng: marker.lng},
                    map: map,
                    icon: getIcon(marker),
                    type: marker.type,
                    message: marker.message,
                    animation: google.maps.Animation.DROP,
                });
    
                initMarkers.push(marker);
        
                infowindow = new google.maps.InfoWindow({
                    content: marker.message
                });
                
                marker.addListener('click', function() {
                    if(infowindow) {
                        infowindow.close();
                    }
                    infowindow.setContent(this.message);
                    infowindow.open(map, marker);

                    $('[style*="background-color: rgb(255, 255, 255)"]').css({
                        "background-color": "transparent"
                    });
                });
            });

        } //end initMapWithStyles
        
    }// end init



    return {
        init: init
    }

})();

locationMap.init();
