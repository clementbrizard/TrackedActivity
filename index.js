
/*******************GPSPoint**********************/

// Utilisé par l'attribut waypoints de Track

class GPSPoint {
  constructor(lat,lon,time) {
    this.lat = lat;
    this.lon = lon;
		this.time = time; // définir l'unité : dixième de seconde ?
  }
}


/*******************Track**********************/

class Track{
	constructor(waypoints=[]){
		this.waypoints = waypoints; // tableau de points GPS
	//this.temperature = this.getTemperature(); // température du premier point
	}

	// ajoute un point à waypoints	

	addPoint(point){
		let lat= point.lat;
		let lon= point.lon;
		let time= point.time;
		this.waypoints.push({lat,lon,time});
	}


	// calcule la durée totale

	getTotalDuration(){
		return (this.waypoints[this.waypoints.length-1].time - this.waypoints[0].time);
	}

	// calcule la distance parcourue
	
	getDistance(){
		let module = require ('./getDistance');
		module.getDistanceTab(this.waypoints)
		.then( values => {
			console.log('Résultat de la distance parcourue : ');
			console.log('Distances intermédiaires : '+ values + ' (en m)');
			let sum= 0;
			for (var i= 0; i< values.length; i++)
				sum+= values[i];
			console.log('Distance parcourue : '+ sum/1000 + ' km');
		}, error => {
			console.log(err);
		});
	}

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

module.exports = {
  GPSPoint : GPSPoint,
  Track : Track,
	Activity : Activity,
	Marathon : Marathon
}

