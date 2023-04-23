function importClasses(classesArray, container, num, box, color) {
  //num is at the end of the right-container ID and the filter buttons IDs. For the top search the ID is "1" and for the bottom the ID is "".
  let rawList = classesArray;
  let classList = [];
  for(let i = 0; i<rawList.length; i++) {
    classList.push(rawList[i].split('-'));
  }
    var uList = document.getElementById(container);
    //uList.innerHTML = "";
    var listItem;
    var searchBar;
    searchBar = document.createElement('input')
    searchBar.type = 'text';
    searchBar.placeholder = 'Search..';
	if(container === "right-container"){
		searchBar.id = "search2";
	}
	else{
		searchBar.id = "search";
	}
    uList.appendChild(searchBar);
    searchBar.class = 'dropdown-content';
	if(container === "right-container"){
		 searchBar.addEventListener('input', searchFunction.bind(null, container,'search2', num));
	}
	else{
		searchBar.addEventListener('input', searchFunction.bind(null, container,'search', num));
	}
    
	
    var englishButton = document.getElementById("englishButton" + num);
    console.log(englishButton)
    englishButton.addEventListener('input', searchFunction.bind(null, container,'search', num));
    (document.getElementById("mathButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("languageButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("peButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("itButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("scienceButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("socialScienceButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("readingButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("musicButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("engineeringButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("businessButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("theatreButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("foodButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
  (document.getElementById("otherButton" + num)).addEventListener('input', searchFunction.bind(null, container,'search', num));
    
  
    for (var i = 0; i<classList.length; i++) {
        listItem = document.createElement('div');
        listItem.draggable = true;
        listItem.setAttribute('class', box);
      	listItem.setAttribute('genre', classList[i][1]);
  	    listItem.setAttribute('data-id', classList[i][0]);
        listItem.innerHTML = classList[i][0];
        if(color == true) {
          listItem.style.borderWidth = "3px";
          listItem.style.borderColor = "red";
          if(i <= classList.length/4*3) {
            listItem.style.borderColor = "orange";
          }
          if(i <= classList.length/4*2) {
            listItem.style.borderColor = "yellow";
          }
          if(i <= classList.length/4) {
            listItem.style.borderColor = "green";
          }
        }
        if(box === 'box4') {
          initializeDragAndDropSingle(listItem, 'box4', 'box3')
        }
        if(box === 'box2') {
          initializeDragAndDropSingle(listItem, 'box2', 'box1')
        }
        uList.appendChild(listItem);
    }
}
        
var newBoxIDF = 0;
var newBoxIDS = 100;
var newBoxIDJ = 200;
var newBoxIDR = 300;
var num = 1;

function addBox(boxAddedTo, innerHTML){
  var pList = document.getElementById(boxAddedTo);
  var listItem;
  listItem = document.createElement('div');
  listItem.draggable = true;
  listItem.setAttribute('class', 'box3');
  if(pList == document.getElementById('freshmanClasses')){
    listItem.id = newBoxIDF;
    newBoxIDF++;
  }
  if(pList == document.getElementById('sophomoreClasses')){
    listItem.id = newBoxIDS;
    newBoxIDS++;
  }
  if(pList == document.getElementById('juniorClasses')){
    listItem.id = newBoxIDJ;
    newBoxIDJ++;
  }
  if(pList == document.getElementById('seniorClasses')){
    listItem.id = newBoxIDR;
    newBoxIDR++;
  }
  //console.log(listItem.id);
  listItem.innerHTML = "Add Class";
  if(innerHTML != undefined) {
    listItem.innerHTML = innerHTML;
  }
  initializeDragAndDropSingle(listItem, 'box4', 'box3');
  pList.appendChild(listItem);
}

function removeBox(){
  newBoxIDF--;
  document.getElementById(newBoxIDF).remove();
}
function removeBox2(){
  newBoxIDS--;
  document.getElementById(newBoxIDS).remove();
}
function removeBox3(){
  newBoxIDJ--;
  document.getElementById(newBoxIDJ).remove();
}
function removeBox4(){
  newBoxIDR--;
  document.getElementById(newBoxIDR).remove();
}

function searchFunction(dropdown, inputNum, num) {
	console.log(inputNum)
	console.log(dropdown)
  var input, filter, ul, li, a, i, mathBox, englishBox;
  englishBox = document.querySelector('#englishButton');
  mathBox = document.querySelector('#mathButton');
  console.log(mathBox)
  input = document.getElementById(inputNum); //grabs the search element (includes input type, placeholder, etc. What you would see in inspect element)
  filter = input.value.toUpperCase(); //what is typed in search bar (all letters set to all caps)
  div = document.getElementById(dropdown); //div is the right-container box thingy
  a = div.getElementsByTagName("div"); //a is every box in the center
  for (i = 0; i < a.length; i++) {
	txtClass = a[i]
    txtValue = a[i].textContent || a[i].innerText; //ngl idk the point of the ||, they're the same I think. they are just every class not in all caps text
    if (txtValue.toUpperCase().indexOf(filter) > -1) { //in this context, txtValue.toUpperCase() is every single class in upper case format. This looks through each class, and if the word for "filter" (what is typed in) is in it, it returns 0 aka shows the class.
      //a[i].style.display = "";
		a[i].style.display = "";
    } 
	else {
      a[i].style.display = "none";
    }
	  //NGL I HAVE NO IDEA HOW I DID ANY OF THIS CODE I JUST TYPED WORDS IN AND THEY DIDNT WORK UNTIL THEY DID IT'S LIKE IF YOU GAVE A BILLION GORILLAS KEYBOARDS AND LET THEM TYPE FOREVER, ONE OF THEM MADE THIS AND I COPIED IT AND IT WORKED
	var checkboxes = document["filterForm" + num].querySelectorAll('input[type=checkbox]:checked');
	for(j = 0; j < checkboxes.length; j++){
		if(checkboxes[j].checked == false){
			delete checkboxes[j];
		}
	}
	let showClass = false;
	if(checkboxes.length == 0){
		showClass = true;
	}
	for(j = 0; j < checkboxes.length; j++){
		if(checkboxes[j].checked && checkboxes.length != 0){
			if(txtClass.getAttribute('genre') == checkboxes[j].getAttribute('tag') && a[i].style.display != "none"){
				showClass = true;
			}
		}
	}
	if(showClass == true && a[i].style.display == ""){
		a[i].style.display = "";
	}
	else{
		a[i].style.display = "none";
	}
	  
	}
	
}

function listLoad() {
  fetch('Classes.csv')
    .then(response => response.text())
    .then(data => {
  	  let sheetsString = "";
  	  sheetsString += data;
  	  sheetsString = sheetsString.replace(/(\r\n|\n|\r)/gm, "\n");
  	  //console.log(sheetsString)
  	  //ALL CODE FOR APP GO HERE
  
      //Divides CSV into rows
  	  const rows = sheetsString.split('\n');
      let classes = [];
      for(let i = 1; i < rows.length; i++) {
      	classes.push(rows[i].split(","));
      }
      let theList = [];
      for(let i = 0; i < classes.length; i++) {
          string = classes[i][0] + "-" + classes[i][1]
          theList.push(string);
      }
      importClasses(theList, "right-container2", "1", "box4", false);
      var classesSelect = document.getElementById("right-container2").querySelectorAll(".box4");  
  })
}

function fillClassBox(box) {
  for(let i = 0; i < 7; i++) {
    addBox(box);
  }
}