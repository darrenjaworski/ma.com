/* Fake placeholder support in browsers that do not support the HTML input placeholder attribute. Ideally this would be paired with a javascript function that prevents form submit if the a given input's value is equivalent to the placeholder attribute. */
/*
function initPlaceholderSupport() {
    if( ! Modernizr.input.placeholder ) {
        $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }).blur();
    }
}

initPlaceholderSupport();
*/



$(document).ready( function() {


	if ( $(".homepage").length > 0 ) {
		
		$(function() {
		  $('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		  });
		});
		
		var width = parseInt($('.container').css('width'));
	
		var height = width * .604;
		
		var color = d3.scale.category10();
		
		var projection = d3.geo.kavrayskiy7()
		    .scale(width * .177)
		    .translate([width / 2, height / 2])
		    .precision(.1);
		
		var path = d3.geo.path()
		    .projection(projection);
		
		var graticule = d3.geo.graticule();
		
		var svg = d3.select("#globe").append("svg")
		    .attr("width", width)
		    .attr("height", height);
		
		svg.append("path")
		    .datum(graticule)
		    .attr("class", "graticule")
		    .attr("d", path);
		
		d3.json("assets/data/world.json", function(error, world) {
		  var countries = topojson.feature(world, world.objects.countries).features;
		
		  svg.selectAll(".country")
		      .data(countries)
		    .enter().insert("path", ".graticule")
		      .attr("class", "country")
		      .attr("d", path)
		      .style("fill", function(d){
			      if(  d.id == '388' || d.id == '124' || d.id == '634' || d.id == '784' || d.id == '792' || d.id == '724' || d.id == '620' ){
				      return "#CFB705";
			      } else if ( d.id == '840' ){
				      return "#000"
			      } else {
				      return "#304959";
			      }
		      });
		
		  svg.insert("path", ".graticule")
		      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
		      .attr("class", "boundary")
		      .attr("d", path);
		});
		
		d3.select(self.frameElement).style("height", height + "px");
	}

	if ( $(".main").length > 0 ) {
		$(".main").onepage_scroll({
		   sectionContainer: "section",
		   easing: "ease", 
		   animationTime: 1000,
		   pagination: true,
		   updateURL: false,
		   beforeMove: function(index) {},
		   afterMove: function(index) {},
		   loop: false
		});
	}
	
});