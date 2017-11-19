

/*******************GPSPoint**********************/

// Utilisé par l'attribut waypoints de Track


class GPSPoint {
  constructor(lat,lon,time) {
    this.lat = lat;
    this.lon = lon;
		this.time = time; // définir l'unité : dixième de seconde ?
  }
}

/***********Tests***********/

SanFrancisco = new GPSPoint (37.772886,-122.423771,1484847603025);
Berkeley = new GPSPoint (37.871601,-122.269104,5478912345784);

console.log(SanFrancisco);
console.log(Berkeley);

/*

GPSPoint { lat: 37.772886, lon: -122.423771, time: 1484847603025 }
GPSPoint { lat: 37.871601, lon: -122.269104, time: 5478912345784 }

*/


/*******************Track**********************/

class Track{
	constructor(waypoints=[]){
		this.waypoints = waypoints; // tableau de points GPS
	//this.temperature = this.getTemperature(); // température du premier point
	}

	// ajoute un point à waypoints	

	addPoint(lat,lon,time){
		this.waypoints.push({lat,lon,time});
	}

	// calcule la durée totale

	getTotalDuration(){
		return (this.waypoints[this.waypoints.length-1].time - this.waypoints[0].time);
	}

	// calcule la distance entre 2 points GPS (en m)

/*getDistance2Points(point1,point2){
		On calcule la distance entre deux points avec la méthode "get" du package
		npm google-distance.
		--> En cours d'implémentation. Des difficultés avec la technique des promises.
	}
*/

	// calcule la distance parcourue (en km)

/*getDistance(){
		distanceTotale = getDistance2Points(point1,point2) + getDistance(point2,point3)
		+ ... getDistance(point n-1,point n)
		Convertir le résultat en km.
		--> À faire quand getDistance2Points est ok.
	}
*/

	// calcule la vitesse étant données une distance et une durée (en km/h)
	// ok quand getDistance() sera ok

/*getSpeed(distance,duration){
		// convertir la durée en h
		return distance/duration;
	}
*/

	// calcule la durée active (en h)
	
/*getActiveDuration(period,minSpeed){
		On prend le premier point du tableau. On prend le point mesuré une period
		plus tard dans le tableau. On calcule la vitesse réalisée entre ces deux points
		avec getSpeed(getDistance Si la vitesse est inférieure à minSpeed, on n'ajoute pas la distance
		entre ces deux points à la vitesse en mouvement. Sinon, on l'ajoute. On fait 
	  de même jusqu'à la fin du tableau.
		À faire quand getDistance() sera ok.
	}
*/

	// calcule la température au premier point

/*getTemperature(){
		On utilise le package npm dark-sky pour calculer la température au premier
		point du tableau. On actualise ensuite l'attribut temperature.
		À faire.
	}
*/

}

/***********Tests***********/

// Création d'un Track à un point

track= new Track([SanFrancisco]);
console.log(track);

/*

Track {
  waypoints: [ GPSPoint { lat: 37.772886, lon: -122.423771, time: 1484847603025 } ] }

*/

// ajout d'un point

track.addPoint(Berkeley.lat,Berkeley.lon,Berkeley.time);
console.log(track);

/*

Track {
  waypoints: 
   [ GPSPoint { lat: 37.772886, lon: -122.423771, time: 1484847603025 },
     { lat: 37.871601, lon: -122.269104, time: 5478912345784 } ] }

*/

// calcul de la durée totale

console.log(track.getTotalDuration());

// 3994064742759


/*******************Activity**********************/

class Activity {
	constructor(type,track){
		this.type= type;
		this.track= track;
		this.duration= this.setDurationFromTrack();
		//this.distance= this.setDistanceFromTrack();
	}
	
	// retourne les types de sport possibles

	static getSportTypes() {
		return ['running', 'cycling', 'walking'];
	 }

	// retourne la durée à partir de l'attribut track

	setDurationFromTrack(){
		return this.track.getTotalDuration();
	}
	
	// retourne la distance à partir de l'attibut track

/*setDistanceFromTrack(){
		return this.track.getDistance();
	}
*/

	// teste si l'activité est valide
	// ok quand getSpeed() sera ok

/*isValid() {
	 	if(activity.getSportTypes().indexOf(this.type) != -1 & this.distance > 0 & this.duration > 0){
			let speed= this.track.getSpeed(this.distance,this.duration);
			switch (type) {
					case 'running' :	if speed < 18
													 		return true;
														else 
															return false;
														[break;]

					case 'cycling' :	if speed < 50
															return true;
														else 
															return false;
														[break;]
					
					case 'walking' : 	if speed < 7
															return true;
														else 
															return false;
														[break;]
		
	 		}
		}
	}	
*/

}

/***********Tests***********/

// création d'une activity

activity= new Activity('running',track);
console.log(activity);

/*

Activity {
  type: 'running',
  track: Track { waypoints: [ [Object], [Object] ] },
  duration: 3994064742759 }

*/

// affichage des types d'activité possibles

console.log(Activity.getSportTypes());

// [ 'running', 'cycling', 'walking' ]



/*******************Marathon**********************/

class Marathon extends Activity{
	constructor(){
		super(null,track);
		this.type= 'running';
		this.distance= 42,195;
	}

	static getSportTypes() {
		return 'running';
	 }
	
	isValid(){
		if(this.type=='running' & this.distance > 0 & this.duration > 0)
			if (this.distance/this.duration < 15)
				return true;
			else 
				return false;
	 }

}

/***********Tests***********/

// création d'un marathon

marathon= new Marathon(track);
console.log(marathon);

/*

Marathon {
  type: 'running',
  track: Track { waypoints: [ [Object], [Object] ] },
  duration: 3994064742759,
  distance: 42 }

*/

// teste si marathon est valide

console.log(marathon.isValid());

// true






























