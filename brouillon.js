/*

// arrondit value à decimals décimales près

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

// génère un tableau d'un point tous les dixièmes de secondes sur une durée duration (en h)

let getPoints = duration => {
	let points= [];
	for (var i=0.0; i<3600; i=i+0.1)
		points.push(round(i,1));
	return points;
}

SanFrancisco = new GPSPoint (37.772886,-122.423771,0.0);
Berkeley = new GPSPoint (37.871601,-122.269104,52200);
SanFranciscoBis = new GPSPoint (37.772886,-122.423771,160200);
let tab=[];
tab.push(SanFrancisco);
tab.push(Berkeley);
tab.push(SanFranciscoBis);

getActiveDistances(tab,1,5)
.then ( values => {
	let sum= 0;
	for (var i= 0; i< values.length; i++)
		sum+= values[i];
	console.log('Distance active : '+ sum/1000 + ' km');
}, error => {
	console.log(error);
});

*/



darksky.longitude('2.82897949');
darksky.latitude('49.41454708');

console.log(darksky.long);
console.log(darksky.lat);
console.log(darksky.apiKey);

darksky.get()
.then( object => {
	console.log(object.currently.temperature);
}, error => {
	console.log(error);
});





