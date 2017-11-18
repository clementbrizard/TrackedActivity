

class activity {
	constructor(type){
		this.type=type;
		this.distance=null;
		this.duration=null;
	}
	
	static getSportTypes() {
		return ['running', 'cycling', 'walking'];
	 }
	 
}

activity.prototype.isValid = function(){
 	if(activity.getSportTypes().indexOf(this.type) != -1 & this.distance > 0 & this.duration > 0)
 	// vérifier aussi les vitesses selon le type d'activité
 		return true;	
 	else
 		return false;
}
	 

class marathon extends activity{
	constructor(){
		this.type='running';
		this.distance=42,195;
		this.duration=null;
	}

	isValid(){
	 	if(this.type=='running' & this.distance > 0 & this.duration > 0)
	 	// vérifier que vitesse < 15 km/h
	 		return true;	
	 	else
	 		return false;
	 }

}

a1 = new activity('cycling');
console.log(a1);
console.log(activity.getSportTypes());
console.log(a1.isValid());

m1= new marathon();
console.log(m1);





