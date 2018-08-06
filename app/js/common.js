
  var navMain = document.querySelector('.main__nav-list');
	var navHamburger = document.querySelector('.hamburger');

	

  navHamburger.addEventListener('click', function() {
    if (navMain.classList.contains('site-list__closed')) {
      navMain.classList.remove('site-list__closed');
			navMain.classList.add('site-list__opended');
		}
		 else {
      navMain.classList.add('site-list__closed');
			navMain.classList.remove('site-list__opended');
    }
	});


	
	navHamburger.addEventListener('click', function(e) {
		e.currentTarget.classList.toggle('hamburger_active');
	});
    document.querySelector('.hamburger').addEventListener('click', function() {
		document.querySelector('.page__header-wrapper').classList.toggle('page__header-wrapper--menu');
	});
	 
/************************Slider****************** */
	$(document).ready(function(){
		
$('.slider').slick({
  prevArrow: "<img src='https://svgshare.com/i/6Ei.svg' class='prev' alt='1'>",
	nextArrow: "<img src='https://svgshare.com/i/6Gf.svg' class='next' alt='2'>",
	slidesToShow: 1,
	autoplay: true,
	autoplaySpeed: 5000,

  responsive: [
    {
      breakpoint: 992,
      settings: {
				arrows: false,
				dots: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 700,
      settings: {
				arrows: false,
				dots: true,
        slidesToShow: 1
      }
    }
  ]
});
	});
/************************Slider****************** */




// Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
		ymaps.ready(init);
		function init() {
			var address = "ул. Большая Конюшенная, 19/8";
			var geocoder = ymaps.geocode(address);
			geocoder.then(function(res) {
				var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
				var map = new ymaps.Map("map", {
					center: coordinates,
					zoom: 15,
					controls: ["typeSelector", "zoomControl"]
				});
				 map.behaviors.disable("scrollZoom");
				 
				map.geoObjects.add(
					new ymaps.Placemark(
						coordinates,
					
						{
							hintContent: "Pink"
						}
					)
				);
			});
		}
		
		


	