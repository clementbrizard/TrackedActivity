var TA = require('./index.js'); // TA stands for TrackedActivity
var tools = require('./tools.js');


/**
* Tests the main functions of the module
*/

let test = () => {

	console.log('\n\n\nOn teste ci-dessous les fonctions principales du module TrackedActivity.\n\n\n');

	/***********Waypoint***********/

	console.log('-----Tests pour Waypoint-----\n\n' );

	SanFrancisco = new TA.Waypoint (37.772886,-122.423771,0.0);
	console.log('Création de SanFrancisco : ');
	console.log(SanFrancisco);

	Berkeley = new TA.Waypoint (37.871601,-122.269104,52200);
	console.log('\nCréation de Berkeley : ');
	console.log(Berkeley);
	
	
/***********Track***********/

	console.log('\n\n-----Tests pour Track-----\n');
	
	console.log('\n On crée un track effectuant un aller-retour entre San Francisco et Berkeley. On considère que l"allure a été de 15 km/h sur tout le trajet (environ 44 km). Normalement, on devrait enregistrer un tableau de points du trajet contenant un point tous les dixièmes de seconde, ce qui en aurait fait 126000. N"ayant pas trouvé d"API fournissant un tel ensemble de points GPS pour un trajet donné, on décide pour l"exemple qui va suivre d"enregistrer un tableau à 3 points : SanFrancisco, Berkeley, et de nouveau SanFrancisco (avec un time différent du premier). Dans la réalité, on récupérerait un tableau de 126000 points dans les données produites par une montre GPS par exemple.\n');

	track= new TA.Track([SanFrancisco,Berkeley]);
	console.log('Track comportant SanFrancisco comme premier point et Berkeley comme second : \n');
	console.log(track.waypoints);
	
	SanFranciscoBis = new TA.Waypoint (37.772886,-122.423771,126000);
	track.addPoint(SanFranciscoBis);
	console.log('\nAjout du dernier point (SanFrancisco) : \n');
	console.log(track.waypoints);
	
	let totalDuration = track.getTotalDuration();
	console.log('\nDurée totale : ');
	tools.displayTime(totalDuration);
	
	console.log('\nOn ne teste pas getActiveDuration(period,minSpeed). Cette fonction séquence le trajet en portions de durée period et ne garde que les portions où la vitesse était supérieure à minSpeed. Il aurait donc fallu disposer d"un tableau contenant un waypoint tous les dixièmes de seconde du trajet défini. Elle fonctionne néanmoins sur le même principe que getDuration(), qui elle a pu être testée.\n');
	
	console.log('Pour la distance et la température, cf fonctions asynchrones en bas du terminal.');
	
	
/***********Activity***********/

console.log('\n\n-----Tests pour Activity-----\n');

activity= new TA.Activity('running',track);

console.log('Un running qui suit le track déjà créé :\n'); 
console.log('Type : '+activity.type);

console.log('\nTrack : ');
console.log(activity.track.waypoints);

totalDuration = activity.setDurationFromTrack();
console.log('\nDurée de l"activité : ');
tools.displayTime(totalDuration);

console.log('Types activité possibles : ');
console.log(TA.Activity.getSportTypes()+'\n');

console.log('L"activité est-elle valide : ');
console.log(activity.isValid()+'\n');

console.log('Le test peut ici échouer à cause d"une donnée manquante : la distance. C"est setDistanceFromTrack() qui lui donne sa valeur, qu"on calcule ici à la fin des tests, avec les autres fonctions asynchrones. Une possibilité serait d"appeler la fonction isValid() dans un .then suivant setDistanceFromTrack(). Mais on ne pourrait alors plus tester la validité quand on le souhaite. On décide donc d"empêcher le test quand la distance n"est pas encore connue. D"où le message et le "undefined" ci-dessus.\n');


/***********Marathon***********/

console.log('\n-----Tests pour Marathon-----\n');

marathon= new TA.Marathon(track);

console.log('On a créé une instance de marathon alors que le track qu"on lui a associé est de plus de 42.195 km. On ne peut pas faire de test à la construction sur la valeur de ce paramètre. On indiquera cette instance comme non valide quand on testera sa validité, si la valeur de sa distance a déjà été calculée.\n');

console.log('Un marathon suivant le track déjà créé :\n');
console.log('Type : '+marathon.type);

console.log('\nTrack : ');
console.log(marathon.track.waypoints);

totalDuration = marathon.setDurationFromTrack();
console.log('\nDurée du marathon : ');
tools.displayTime(totalDuration);

console.log('\nLe marathon créé est-il valide ? ');
console.log(marathon.isValid()+'\n');
	
	
/***********Fonctions asynchrones***********/

console.log('\n-----Tests des fonctions asynchrones-----\n');

console.log('4 résultats : la distance du track, la température de son premier point, la distance de l"activité à partir de son track, et la distance du marathon à partir de son track (l"affichage indique "activity" dans les deux cas, inutile de redéfinir la fonction juste pour pouvoir lire "marathon" le cas échéant).\n');

track.getDistance();

track.getTemperature();

activity.setDistanceFromTrack();

marathon.setDistanceFromTrack();

}

test();





