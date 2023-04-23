//Takes CSV and converts to string
function generate() {
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
      //Sets the difficulty to an int for each class
    	for(let i = 0; i < classes.length; i++){
    		classes[i][2] = parseInt(classes[i][2]);
    	}
    

      // saves each year's classes into studentClasses
      let freshmanClasses = window.localStorage.getItem("freshmanClasses").split(",");
      let sophomoreClasses = window.localStorage.getItem("sophomoreClasses").split(",");
      let juniorClasses = window.localStorage.getItem("juniorClasses").split(",");
      let preferredSubjects = window.localStorage.getItem("preferredSubjects").split(",");
      let studentClasses = [];
      studentClasses.push(freshmanClasses);
      studentClasses.push(sophomoreClasses);
      studentClasses.push(juniorClasses);
      for(let i = 0; i < studentClasses.length; i++) {
        for(let j = 0; j < studentClasses[i].length; j++) {
          console.log(studentClasses[i][j]);
          studentClasses[i][j] = studentClasses[i][j].replace(/&amp;/g, "&");
        }
      }
      console.log(studentClasses);
      
      // classScores is the rating for each class in a new array
      // more recent classes are weighed more, so that the reccomended classes more match the student's current classes
      let classScores = [];
      for(let i = 0; i < classes.length; i++) {
        classScores.push(0);
      }
      let totalDifficulty = 0;
      let numClasses = 0;
      // Loops for each class in the studentClasses array
      // g is the year of the class, h is the classes in each year
      for(let g = 0; g < studentClasses.length; g++) {
        for(let h = 0; h < studentClasses[g].length; h++) {
          //class1 is the index of the row in classes of the class
          if(studentClasses[g][h] != "" && studentClasses[g][h] != "Add Class") {
            let class1 = find(studentClasses[g][h], classes);
            
            //Add 20 to the next class for each class, adds 10 for other following classes 
            let nextClasses = classes[class1][3].split('+')
            let nextClassesRanked = [];
            for(let i = 0; i < nextClasses.length; i++) {
              nextClassesRanked.push(nextClasses[i].split("="));
            }
            for(let i = 0; i < nextClassesRanked.length; i++) {
              for(let j = 0; j < nextClassesRanked[i].length; j++) { 
                let repeat = false;
                for(let k = 0; k < studentClasses.length; k++) {
                  
                  for(let l = 0; l < studentClasses[k].length; l++) {
                    if(studentClasses[k][l] === nextClassesRanked[i][j]) {
                      repeat = true;
                    }
                  }
                  
                }
                if(repeat === false) {
                  //The score is based on the amount of following classes and the year that the class is taken in, favoring more recent classes
                  classScores[find(nextClassesRanked[i][j], classes)] += (20-nextClassesRanked[i].length)*(g+1);
                }
              }
            }
            
            //Adds g+2 for all classes of same type
            for(let i = 0; i < classes.length; i++) {
              if(classes[class1][1] === classes[i][1]) {
                classScores[i] += g+2;
              }
            }
      
            //Adds g+1 for all classes of same difficulty
            for(let i = 0; i < classes.length; i++) {
              if(classes[class1][2] === classes[i][2]) {
                classScores[i] += g+1;
              }
            }
            
            //adds the difficulty of the class to totalDifficulty
            totalDifficulty += classes[class1][2];
            numClasses += 1;
          }
        }
      }
      // Adds 10 to score if student prefers that subject
      for(let i = 0; i < classes.length; i++) {
        for(let j = 0; j < preferredSubjects.length; j++) {
          if(classes[i][1] === preferredSubjects[j]) {
            classScores[i] += 10;
          }
        }
      }
      // Prints the score for each class and the average difficulty of classes
      for(let i = 0; i < classes.length; i++) {
        //console.log(classes[i][0] + "  " + classScores[i])
      }
      //console.log("Avg Difficulty " + totalDifficulty/numClasses);
  
  	let sortedClasses = sortDif(classes, classScores)
    //console.log("Your new schedule:")
    for(let i = 0; i < numClasses; i++) {
      //console.log(sortedClasses[i][0]);
    }

    var sortedClasses2 = [];
    for(let i = 0; i < sortedClasses.length; i++) {
      string = sortedClasses[i][0] + "-" + sortedClasses[i][1]
      sortedClasses2.push(string);
    }
    var futureClasses = document.getElementById('right-container2'); 
    while (futureClasses.firstChild) {
      futureClasses.removeChild(futureClasses.firstChild);
    }
    importClasses(sortedClasses2, "right-container2", "1", "box4", true);
  	
    })
  
    //.catch(error => console.error(error));
}
//Finds the index of the class in classes given the name of the class and the classes array
function find(name, array) {
  for(let i = 0; i < array.length; i++){
    if(array[i][0] === name) {
      return i;
    }
  }
}
//adds the class difficulty to each class, and sorts it
function sortDif(classes, scores){
	let newArray = classes;
	//adds the score to the end of each class
	for(let i = 0; i < classes.length; i++){
		newArray[i].push(scores[i]);
	}
	newArray.sort(sortFunction);
	 for(let i = classes.length - 1; i >= 0; i--) {
		 //console.log(newArray[i])
      //console.log(newArray[i][0] + "  " + newArray[i][4])
    }
  let newArray2 = [];
  for(let i = newArray.length-1; i >= 0; i--) {
    newArray2.push(newArray[i]);
  }
  return newArray2;
}
//does actual sorting
function sortFunction(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }
}
/*
Number of semesters
D219 pathways for electives
*/