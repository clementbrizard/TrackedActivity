
waypoint = require('./index.js');

let googleDistance=require('google-distance');


/***********Gestion du calcul des distances************/


/**
* Returns the distance between two waypoints.
* @return {Promise} - Promise object that represents 
* the distance between two waypoints.
*/

let getDistance2Points= (orig,dest) => {
	return new Promise ((resolve,reject) => {
		googleDistance.get(
		{origin: [orig.lat,orig.lon].toString(),
		 destination: [dest.lat,dest.lon].toString()
		},
		(err,data) => {
			if(err) reject(err);
			resolve(data.distanceValue);
		});
	})
}


/**
* Returns the distances between each points of another array.
* @param {array}
* @return {Promise} - Promise object that represents an array
* of the distances corresponding to the filter.
*/

let getDistances = points => {
	let distances= [];
	return new Promise ((resolve,reject) => {
		for (var i=0; i< points.length -1; i++){
			getDistance2Points(points[i],points[i+1])
			.then ( value => {
				distances.push(value);
				if(distances.length == points.length -1)					
					resolve(distances);
			}, error => {
				reject(err);
			});					
		}
	})
}

/**
* Returns the durations of all the portions of points of period seconds during which the performed 
* speed was higher than minSpeed.
* @return {Promise} - Promise object that represents an array of the durations corresponding to the filter.
*/

let getActiveDurations = (points,period,minSpeed) => {
	let activeDurations= [];
	return new Promise ((resolve,reject) => {
		let decalage = period/0.1;
		for (var i=0; i+decalage< points.length; i=i+decalage){
			getDistance2Points(points[i],points[i+decalage])
			.then ( value => {
				console.log('ok');
				if ((value / period)*3.6 > minSpeed){
					let duration= points[i+decalage].time - points[i].time;
					activeDurations.push(duration);
				}
				let maxIterations = Math.trunc(points.length /decalage);
				if(i == maxIterations){
					console.log('hello');				
					resolve(distances);
				}
			}, error => {
				reject(err);
			});					
		}
	})
}


/*******Gestion des temps calculés***********/


/**
* Converts a floating number representing a time in a classic format (hours minutes)
* to a number in a "proportional" format : if the number of minutes was 30, then it becomes 50 
* because 30 minutes is 50 % of an hour. Useful when calculating a speed (so dividing by the duration
* which must be in a "proportional format").
* @return {number} - A time converted to a "Proportional format".
*/

let toProportional = time => {
	let hours = Math.trunc(time);
	let mins = Math.round((time-hours)*100);
	mins = mins/60 *100;
	return hours+mins/100;
}

/**
* Converts a floating number representing a time in a proportional format (hours minutes)
* to a number in a classic format : if the number of minutes was 50, then it becomes 30 
* because 50 % of an hour is 30 minutes.
* @return {number} - A time converted to a classic format.
*/

let toClassic = time => {
	let hours = Math.trunc(time);
	let mins = Math.round((time-hours)*100);
	mins = mins/100 *60;
	return hours+mins/100;
}

/**
* Displays a time in a classic way : if 1,3 is received in parameter, then the function
* will display "1 h 30".
*/

let displayTime = time => {	
	let hours = Math.trunc(time);
	let mins = Math.round((time-hours)*100);
	console.log(hours+ ' h '+mins+' min');
}

exports.getDistances = getDistances;
exports.getActiveDurations = getActiveDurations;
exports.toProportional = toProportional;
exports.toClassic = toClassic;
exports.displayTime = displayTime;

