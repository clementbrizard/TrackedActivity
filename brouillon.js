
class Point {
  constructor(lat,long,time) {
    this.lat = lat;
    this.lon = long;
	this.time = time;
  }

}

SanFrancisco= new Point (37.772886,-122.423771,1);
Berkeley= new Point (37.871601,-122.269104,9);


var tab= [];
tab.push (SanFrancisco);
tab.push (Berkeley);
tab.push (SanFrancisco);
tab.push (Berkeley);

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



let getDistance = points => {
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

getDistance(tab)
.then( values => {
	console.log(values);
	let sum= 0;
	for (var i= 0; i< values.length; i++)
		sum+= values[i];
	console.log(sum/1000);
}, error => {
	console.log(err);
});



/*

[ 21951, 22256, 21951 ]
66.158

*/



	














