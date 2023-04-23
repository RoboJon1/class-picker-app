function save() {	
  var freshmanClasses = [];
  var sophomoreClasses = [];
  var juniorClasses = [];
  var preferredSubjects = [];

  var freshmanBox = document.getElementById("freshmanClasses").querySelectorAll(".box3");
  var sophomoreBox = document.getElementById("sophomoreClasses").querySelectorAll(".box3");
  var juniorBox = document.getElementById("juniorClasses").querySelectorAll(".box3");
  
  for (var box of freshmanBox) {      freshmanClasses.push(box.innerHTML);
  }  
  for (var box of sophomoreBox) {      sophomoreClasses.push(box.innerHTML);
  }  
  for (var box of juniorBox) {      juniorClasses.push(box.innerHTML);
  }  
  /*
  var markedCheckbox4 = document.getElementsByName('myInput4'); 

  for (var checkbox of markedCheckbox4) {  
    if (checkbox.checked)  
      preferredSubjects.push(checkbox.value);  
  }  
  */
  localStorage.setItem("freshmanClasses", freshmanClasses);
  localStorage.setItem("sophomoreClasses", sophomoreClasses);
  localStorage.setItem("juniorClasses", juniorClasses);
  localStorage.setItem("preferredSubjects", preferredSubjects);

  generate();
}
