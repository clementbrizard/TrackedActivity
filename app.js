var TA = require('./index.js'); // TA = TrackedActivity


/***********Waypoint***********/

console.log('Tests pour Waypoint : \n' );

SanFrancisco = new TA.Waypoint (37.772886,-122.423771,0.0);
console.log('SanFrancisco : '+SanFrancisco+'\n');

Berkeley = new TA.Waypoint (37.871601,-122.269104,52200);
console.log('Berkeley : '+Berkeley+'\n');
console.log(Berkeley+'\n');


/***********Track***********/

console.log('\nTests pour Track : \n');

track= new TA.Track([SanFrancisco]);
console.log('Track comportant juste SanFrancisco : '+track.waypoints+'\n');

track.addPoint(Berkeley);
console.log('Ajout de Berkeley : '+track.waypoints+'\n');

console.log('Durée totale : '+track.getTotalDuration()+' h'+' (à lire "1h27")\n');

SanFranciscoBis = new TA.Waypoint (37.772886,-122.423771,126000);
track.addPoint(SanFranciscoBis);
console.log('\nOn ajoute un point supplémentaire (on remet SanFrancisco en changeant le time) et on calcule la distance parcourue : \n');
track.getDistance();
console.log('Voir résultat tout en bas du terminal \n');

console.log('Température : '+track.getTemperature());


/***********Activity***********/

console.log('\nTests pour Activity : \n');

activity= new TA.Activity('running',track);
console.log('Un running qui suit le track déjà créé : '+activity+'\n');

console.log('Types activité possibles : '+TA.Activity.getSportTypes()+'\n');

console.log('Récupération à travers son track de la valeur de sa distance : ');
activity.setDistanceFromTrack();
console.log('Voir résultat tout en bas du terminal \n');



/***********Marathon***********/

console.log('\nTests pour Marathon : \n');

marathon= new TA.Marathon(track);
console.log('Un marathon suivant le track déjà créé : '+marathon+'\n');

console.log('Le marathon créé est-il valide ? '+marathon.isValid()+'\n');



