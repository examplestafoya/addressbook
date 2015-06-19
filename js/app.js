//document.addEventListener("DOMContentLoaded", function({}));
// to have all the contents of the page loaded before starting js
// Soit ci-dessous
	
// Soit
//var var allContacts= // données du localstorage avec le JSON.parse


// Récupération des informations du localStorage
// Si c'est différent de null
// Je parse les informations
// Sinon


//creation de l'objet 

var contact = function(civilite, nom, prenom, adresse, tel)
{
	this.civilite=civilite,
	this.nom=nom,
	this.prenom=prenom,
	this.adresse=adresse,
	this.tel=tel
}



var civilite=document.querySelector("#civilite");
var nom=document.querySelector("#nom");
var prenom=document.querySelector("#prenom");
var adresse=document.querySelector("#adresse");
var tel=document.querySelector("#tel");
var valider=document.querySelector("#valider");
var supprimer=document.querySelector("#supprimer");
var list=document.querySelector("#list");
var supprimerChecked=document.querySelector("#supprimerChecked");
var nombreContacts=document.querySelector("#nombrecontacts");
var alert=document.querySelector("#alert");


var allContacts=window.localStorage.getItem('all');
allContacts=JSON.parse(allContacts);
console.log(allContacts);
console.log(nombreContacts.innerHTML);


if (allContacts==null)
{ 
	nombreContacts.innerHTML="votre carnet d'adresses est vide.";
	allContacts=[];
}

if (allContacts!=null)
{
	for (var i = 0; i < allContacts.length; i++){
		nombreContacts.innerHTML="vous avez " + allContacts.length + " contacts.";
		list.innerHTML=list.innerHTML+"<br>"+ 
			"<input class='check' name="+i+" type='checkbox' value=''>"+ 
			"<b class='nomprenom'>"+
			allContacts[i].nom + " " + 
			allContacts[i].prenom + " "+ 
			"</b>"+
			"<span class='info'>"+
			allContacts[i].civilite + " " + 
			allContacts[i].adresse  + " " + 
			allContacts[i].tel+
			"</span>";
	};
}

var nomprenom=document.getElementsByClassName('nomprenom');
var info=document.getElementsByClassName('info');
/*
nomprenom[0].addEventListener('click', function(){console.log('click'+0);});
nomprenom[1].addEventListener('click', function(){console.log('click'+1);});
*/

for (var i=0; i<nomprenom.length; i++){
	//info[i].style.display="none";
	info[i].classList.add('hide');
	(function(index)
	{
		nomprenom[index].addEventListener('click', function(){
		info[index].classList.toggle('hide');
		// all below can be changed to all up with the toggle function
		//that adds or erases a class to a given element
			/*
			if (info[index].style.display=="none")
			{
				info[index].style.display="inline-block";
			}
			else
			{
				info[index].style.display="none";
			}
			*/
		});
	}(i));
}

// we reached the closures en javascript 
// http://openclassrooms.com/courses/les-closures-en-javascript

//valider is the same as ajouter

valider.addEventListener('click',function(){
	var regexptel=/^0[1|6|7][0-9]{8}$/;
	if (regexptel.test(tel.value)){
	 console.log("valid number");
	

		if (civilite.value=='' || nom.value =='' || prenom.value =='' ||  adresse.value =='' || tel.value==''){
			console.log('empty fields');
			alert.innerHTML='il y a des champs vides, veuillez remplir-les';
		}else{
			var newContact = new contact(civilite.value, nom.value, prenom.value, adresse.value, tel.value);
			var strNewContact = JSON.stringify(newContact);
			var nomDeLaCle = nom.value + prenom.value
			window.localStorage.setItem("key", strNewContact);
			allContacts.push(newContact);
			var strAll = JSON.stringify(allContacts);
			window.localStorage.setItem("all", strAll);
		}
	}else{
		console.log("invalid number");
	}
});

supprimerChecked.addEventListener('click', function(){
	var checked=document.getElementsByClassName('check');
  for (var i=0; i<checked.length; i++){
  	if (checked[i].checked){
  		allContacts.splice(i, 1);
  		var strAll = JSON.stringify(allContacts);
			window.localStorage.setItem("all", strAll);
		}
  }
  
});


supprimer.addEventListener('click',function(){
	window.localStorage.removeItem("all");
});







