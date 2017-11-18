class Point {
  constructor(lat,long,time) {
    this.lat = lat;
    this.lon = long;
	this.time = time;
  }

}


class Track{
	constructor(waypoints=[], temperature=10){
		this.waypoints = waypoints; // tableau de points
		this.temperature = temperature; // température du premier point
	}

	// ajoute un point à waypoints	
	addPoint(lat,long,time){
		this.waypoints.push({lat,long,time});
	}

	// calcule la durée totale
	getTotalDuration(){
		return (this.waypoints[this.waypoints.length-1].time - this.waypoints[0].time);
	}


	
	



	}


} // end class


SanFrancisco = new Point (37.772886,-122.423771,1);
Berkeley = new Point (37.871601,-122.269104,10);
t2 = new Track([SanFrancisco, Berkeley]);

module.exports.Point;
module.exports.Track;




























