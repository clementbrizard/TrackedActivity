
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

function getDistance(orig, dest){

	var googleDistance=require('google-distance');
	
	return new Promise( (resolve, reject) => {
	
		googleDistance.get(

			{origin: [orig.lat,orig.lon].toString(),
			 destination: [dest.lat,dest.lon].toString()
			},

			(err,data) => {
			
				if(err) reject(err);
				resolve(data.distance);
			});

	})
	.then(val => {return val;})
	.catch(error => {return console.log(error);});

}

console.log(getDistance(SanFrancisco,Berkeley));






