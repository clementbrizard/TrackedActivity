
waypoint = require('./index.js');

let googleDistance=require('google-distance');

/**
*	Returns the distance between two waypoints.
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

exports.getDistances = getDistances;
exports.getActiveDurations = getActiveDurations;





	














