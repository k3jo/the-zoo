const app = {};

app.animalia = [{
		q: 'Canis Lupus'
	},{
		q: 'Falco sparverius'
	}, 
	 {
		q: 'Ursus maritimus'
	}, {
		q: 'Dynastes hercules'
}];

app.results = [];
app.zoo = [];
app.destination = [];

app.library = [];
app.phylum = [];
app.class = [];
app.order = [];
app.family = [];
app.genus = [];
app.species = [];

app.selected ='';


//Make the Call for each animal query in app.animalia
app.getApi = function(){
	app.animalia.forEach(function(val, type){
		// console.log('hi ', query);
		$.ajax({
		    url: 'http://api.gbif.org/v1/species/search/',
		    type: 'GET',
	    	format: 'json',
	    	data: {
		    	q: val.q,
		    	rank: 'species'    		
	    	}
		}).then(function(response){
			//Pick the 1st result of each returning and Push them into app.results
			//Send them to be filtered into global arrays, and individual animal objects
			app.results.push(response.results[0]);
			app.animalify();
		});
	}); //forEach
}



//Take in app.results, map and store in global arrays 
app.store = function(){
	app.phylum = app.results.map(function(i){
		return i.phylum;
	});
	app.class = app.results.map(function(i){
		return i.class;
	});
	app.order = app.results.map(function(i){
		return i.order;
	});
	app.family = app.results.map(function(i){
		return i.family;
	});
	app.genus = app.results.map(function(i){
		return i.genus;
	});
	app.species = app.results.map(function(i){
		return i.species;
	});
	app.library.push(app.phylum, app.class, app.order, app.family, app.genus, app.species);
}

app.animalify = function(obj){
	app.store();
	console.log(app.results);

	//for each animal object in the array, loop over and retrieve their phylum, class, order, family, genus and species
	app.results.filter(function(item){

	})

}


//Find the correct animal obj in app.results accompanying the clicked animal
app.findFamily = function(animal){
	app.destination = app.results.filter(function(obj){
		return obj.species === animal
	});
}

//Scramble options, display on the screen
app.generate = function(){
	$('.crossroads').empty();
	var shuffled = app.phylum.sort(function(){
		return 0.5 - Math.random();
	});
	shuffled.forEach(function(option){
		$('.crossroads').append(`
			<div class="option">
			<input type="radio" id="${option}" name="option" value="${option}">
			<label for="${option}">${option}</label>
			</div>
		`);
	});
}

//Selecting options
$('.crossroads').on('click', 'input', function(){

})




app.init = function(){
	app.getApi();


	//Starting Journey
	$('.destination').on('click', function(e){
		e.preventDefault();
		var pointA = $(this).attr('data-animal');
		app.findFamily(pointA);
		app.generate();
		// console.log(pointA)
	});

};

$(function(){
	app.init();
});