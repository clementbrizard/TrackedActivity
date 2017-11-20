
class GPSPoint {
  constructor(lat,long,time) {
    this.lat = lat;
    this.lon = long;
	this.time = time;
  }
}

let googleDistance=require('google-distance');

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

let getDistanceTab = points => {
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

exports.getDistanceTab = getDistanceTab;




	














