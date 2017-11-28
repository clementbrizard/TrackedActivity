let tools = require ('./tools');

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
 * @param {array} waypoints - An array of waypoints separated from their predecessor and successor by 0.1 s.
 */

class Track{
	constructor(waypoints=[]){
		this.waypoints = waypoints; 
		this.temperature = null;
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
	* Displays the distance of the track (in km). 
	*/
	
	getDistance(){
		tools.getDistances(this.waypoints)
		.then( values => {
			let sum= 0;
			for (var i= 0; i< values.length; i++)
				sum+= values[i];
			console.log('\nDistance parcourue : ');
			console.log(sum/1000+' km');
		}, error => {
			console.log(err);
		});
	}
	
	/**
	* Returns the total duration of the track (in hours)
 	* @return {number} - The difference between the time of the last and the first elements of waypoints.
	*/

	getTotalDuration(){
		let result = (this.waypoints[this.waypoints.length -1].time)/36000 - (this.waypoints[0].time)/36000;
		return tools.toClassic(result);
	}

	/**
	* Displays the active duration of the track. Every portion of the track of period seconds
	* during which the speed (in km/h) was lower than minSpeed is not added to the activeDuration.
	*/

	getActiveDuration(period,minSpeed){
		tools.getActiveDurations(this.waypoints,period,minSpeed)
		.then ( values => {
			let sum= 0;
			for (var i= 0; i< values.length; i++)
				sum+= values[i];
			console.log(sum/36000);
		}, error => {
			console.log(error);
		});
	}

	/**
  * Get the current temperature of a track's first waypoint and 
  * updates the "temperature" attribute of the track.
  */

	getTemperature(){
		return new Promise ((resolve,reject) => {
			return new Promise ((resolve,reject) => {
				darksky.units('si');
				darksky.longitude((this.waypoints[0].lon).toString());
				darksky.latitude((this.waypoints[0].lat).toString());
				darksky.get()
				.then(object => {
					resolve(object.currently.temperature);
				}, error => {
					reject(error);
				})
			})
			.then (value => {
				this.temperature=value;
				console.log('\nTempérature au premier waypoint : ');
				console.log(this.temperature+'°');
			}, error => {
				console.log(error);
			});
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
		this.distance= null;
	}
	
	/**
	* Returns the available types of sports.
	* @static
	*/

	static getSportTypes() {
		return ['running', 'cycling', 'walking'];
	 }
	 
	 /** 
	* Tests if the activity is valid or not.
	* @return {boolean} - True if type is correct, distance and duration are positives, and the average speed
	* is lower than a certain value for each type of sport.
	*/

	isValid() {
	 	if(Activity.getSportTypes().indexOf(this.type) != -1 & this.distance != null & this.distance > 0 & this.duration > 0){
	 		this.duration= tools.toProportional(this.duration);
			let speed= this.distance/this.duration;
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
		}
		console.log('Donnée manquante (distance pas encore calculée) ou invalide');
	}
	
	/**
	* Displays the distance of the activity from its track
	*/

	setDistanceFromTrack(){
		return new Promise ((resolve,reject) => {
			return new Promise ((resolve, reject) => {
				tools.getDistances(this.track.waypoints)
				.then( values => {
					let sum= 0;
					for (var i= 0; i< values.length; i++)
						sum+= values[i];
					resolve(sum/1000);
				}, error => {
					reject(error);
				});
			})
			.then (value => {
				this.distance = value;
				console.log('\nRécupération de la distance de l"activity à partir de son track');
				console.log(this.distance);
			}, error => {
				console.log(error);
			});
		});
	}

	/**
	* Returns the duration of the activity from its track.
	*/

	setDurationFromTrack(){
		return this.track.getTotalDuration();
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
		let distance=this.track.distance;
		if(this.type=='running' & distance > 0 & this.track.duration > 0)
			if (this.distance/this.duration < 15)
				return true;
			else 
				return false;
		
		console.log('Donnée manquante (distance pas encore calculée) ou invalide');		
	 }

}

module.exports = {
  Waypoint : Waypoint,
  Track : Track,
	Activity : Activity,
	Marathon : Marathon
}


