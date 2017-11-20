var TA = require('./index.js'); // TA = TrackedActivity


/***********GPSPoint***********/

console.log('Tests pour GPSPoint : \n' );

SanFrancisco = new TA.GPSPoint (37.772886,-122.423771,1484847603025);
console.log('SanFrancisco : '+SanFrancisco+'\n');

Berkeley = new TA.GPSPoint (37.871601,-122.269104,5478912345784);
console.log('Berkeley : '+Berkeley+'\n');


/***********Track***********/

console.log('\nTests pour Track : \n');

track= new TA.Track([SanFrancisco]);
console.log('Track comportant juste SanFrancisco : '+track+'\n');

track.addPoint(Berkeley.lat,Berkeley.lon,Berkeley.time);
console.log('Ajout de Berkeley : '+track+'\n');

console.log('Durée totale : '+track.getTotalDuration()+'\n');

track.addPoint(SanFrancisco.lat,SanFrancisco.lon,SanFrancisco.time);
track.addPoint(Berkeley.lat,Berkeley.lon,Berkeley.time);
console.log('Ajout de deux points supplémentaires (on remet SanFrancisco et Berkeley) et calcul de la distance parcourue : \n');
track.getDistance();
console.log('Voir résultat tout en bas du terminal \n');


/***********Activity***********/

console.log('\nTests pour Activity : \n');

activity= new TA.Activity('running',track);
console.log('Un running qui suit le track déjà créé : '+activity+'\n');

console.log('Types activité possibles : '+TA.Activity.getSportTypes()+'\n');


/***********Marathon***********/

console.log('\nTests pour Marathon : \n');

marathon= new TA.Marathon(track);
console.log('Un marathon suivant le track déjà créé : '+marathon+'\n');

console.log('Le marathon créé est-il valide ? '+marathon.isValid()+'\n');


