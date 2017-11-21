let getDistance = require ('./getDistance');

const DarkSky = require('dark-sky')
const darksky = new DarkSky(process.env.DARKSKY_KEY);

/**
 * Creates an instance of Waypoint 
 * @constructor
 * @param {number} lat - The latitude of the waypoint.
 * @param {number} lon - The longitude of the waypoint.
 * @param {number} time - The time of the waypoint (unit = 0.1 s)
 */

class Waypoint {
  constructor(lat,lon,time) {
    this.lat = lat;
    this.lon = lon;
		this.time = time; 
  }
}

/**
 * Creates an instance of Track. 
 * @constructor
 * @param {array} waypoints - An array of waypoints.
 */

class Track{
	constructor(waypoints=[]){
		this.waypoints = waypoints; 
	//this.temperature = this.getTemperature();
	}
	
	/**
	* Adds a point to track.
	* @param {Waypoint} - The waypoint to add.
	*/

	addPoint(point){
		let lat= point.lat;
		let lon= point.lon;
		let time= point.time;
		this.waypoints.push({lat,lon,time});
	}

	/**
	* Returns the total duration of the track (in hours)
 	* @return {number} - The difference between the time of the last and the first elements of waypoints.
	*/

	getTotalDuration(){
		let result = (this.waypoints[this.waypoints.length -1].time)/36000 - (this.waypoints[0].time)/36000;
		let heures = Math.trunc(result);
		let decimalPart = result - heures;
		let minutes = Math.round(decimalPart*60);
		let totalDuration= heures+minutes/100;
		return totalDuration;
	}

	/**
	* Displays the distance of the track (in km). 
	*/
	
	getDistance(){
		getDistance.getDistances(this.waypoints)
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

	/**
	* Displays the active duration of the track. Every portion of the track of period seconds
	* during which the speed (in km/h) was lower than minSpeed is not added to the activeDuration.
	*/

	getActiveDuration(period,minSpeed){
		getDistance.getActiveDurations(this.waypoints,period,minSpeed)
		.then ( values => {
			let sum= 0;
			for (var i= 0; i< values.length; i++)
				sum+= values[i];
			console.log('Durée active : '+sum/36000+ ' h');
		}, error => {
			console.log(error);
		});
	}

	/**
  * Displays the temperature of the first waypoint of the track
  */

	getTemperature(){
		darksky.longitude((this.waypoints[0].lon).toString());
		darksky.latitude((this.waypoints[0].lat).toString());
		darksky.get()
		.then( object => {
			console.log('Température : '+object.currently.temperature);
		}, error => {
			console.log(error);
		});
	}
}


/**
* Creates an instance of Activity
* @constructor
* @param {type} - The type of the activity (running, cycling or walking)
* @param {track} - The track to which the activity is related.
* @param {duration} - The duration of the activity.
*/

class Activity {
	constructor(type,track){
		this.type= type;
		this.track= track;
		this.duration= this.setDurationFromTrack();
		//this.distance= this.setDistanceFromTrack();
	}
	
	/**
	* Returns the available types of sports.
	* @static
	*/

	static getSportTypes() {
		return ['running', 'cycling', 'walking'];
	 }

	/**
	* Returns the duration of the activity from its track.
	*/

	setDurationFromTrack(){
		return this.track.getTotalDuration();
	}
	
	/**
	* Displays the distance of the activity from its track
	*/

	setDistanceFromTrack(){
		getDistance.getDistances(this.track.waypoints)
		.then( values => {
			let sum= 0;
			for (var i= 0; i< values.length; i++)
				sum+= values[i];
			console.log('\nDistance de activity : '+sum/1000+'\n');
		}, error => {
			console.log(err);
		});
	}


	/** 
	* Tests if the activity is valid or not.
	* @return {boolean} - True if type is correct, distance and duration are positives, and the average speed
	* is lower than a certain value for each type of sport.
	*/

	isValid() {
	 	if(activity.getSportTypes().indexOf(this.type) != -1 & this.distance > 0 & this.duration > 0){			
			getDistance.getDistances(this.track.waypoints)
			.then( values => {
				let sum= 0;
				for (var i= 0; i< values.length; i++)
					sum+= values[i];
				let speed= (sum/1000)/this.duration;
				if(speed < 15){
					switch (type) {
						case 'running' :	if (speed < 18)
														 		return true;
															else 
																return false;
															break;

						case 'cycling' :	if (speed < 50)
																return true;
															else 
																return false;
															break;
				
						case 'walking' : 	if (speed < 7)
																return true;
															else 
																return false;
															break;
					}
				}
			}, error => {
				console.log(err);
			});
		}
	}

}


/**
* Creates an instance of Marathon.
* @constructor
* @extends Activity
*/

class Marathon extends Activity{
	constructor(){
		super(null,track);
		this.type= 'running';
		this.distance= 42.195;
	}

	/**
	* Displays the only available type of sport.
	* @static
	*/

	static getSportTypes() {
		return 'running';
	 }

	/** 
	* Tests if the marathon is valid or not.
	* @return {boolean} - True if type is 'running', distance and duration are positives, and the average speed
	* is lower than 15 km/h.
	*/
	
	isValid(){
		if(this.type=='running' & this.distance > 0 & this.duration > 0)
			if (this.distance/this.duration < 15)
				return true;
			else 
				return false;
	 }

}

module.exports = {
  Waypoint : Waypoint,
  Track : Track,
	Activity : Activity,
	Marathon : Marathon
}

exports.Waypoint = Waypoint;

