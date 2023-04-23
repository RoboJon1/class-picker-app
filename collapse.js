var coll = document.getElementsByClassName("collapsible");
var classList2 = document.getElementById("right-container2");
var i;
console.log(classList2);

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
	 // classList2.style.maxHeight = classList2.scrollHeight + "px";
    } else {
      content.style.maxHeight = "800px";//content.scrollHeight + "px";
	 // classList2.style.maxHeight = null;
    }
  });
}