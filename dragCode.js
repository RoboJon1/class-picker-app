function initializeDragAndDropSingle(newButton, listBox, classBox) {
    function handleDragStart(e) {

      dragSrcEl = this;
      
      // Set the data-type attribute to indicate the class of the dragged element
      if (this.classList.contains(listBox)) {
        e.dataTransfer.setData('data-type', listBox);
      } else if (this.classList.contains(classBox)) {
        e.dataTransfer.setData('data-type', classBox);
      }
      
      // Create a custom data format
      var dataFormat = "text/plain";
      var data = {
        html: this.innerHTML,
        borderWidth: window.getComputedStyle(this).borderWidth,
        borderColor: window.getComputedStyle(this).borderColor,
      };
    
      // Set the data on the event object
      e.dataTransfer.setData(dataFormat, JSON.stringify(data));
    }
	
	  function handleDragEnd(e) {
	    this.style.opacity = '1';
	  }
	
	  function handleDragOver(e) {
	    e.preventDefault();
	  }
	
	  function handleDragEnter(e) {
	    this.classList.add('over');
	  }
	
	  function handleDragLeave(e) {
	    this.classList.remove('over');
	  }
	
    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
    
      // Get the data-type attribute of the dragged element
      const dataType = e.dataTransfer.getData('data-type');
    
      // Check if the drop target element belongs to the same class as the dragged element
      if (dataType === listBox && this.classList.contains(classBox)) {
    
        // Retrieve the data from the dragged element
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    
        // Update the drop target element with the data from the dragged element
        this.innerHTML = data.html;
        this.style.borderWidth = data.borderWidth;
        this.style.borderColor = data.borderColor;
    
        this.classList.remove('over');
        this.blur();
    
        return false;
      }
    
      if (dataType === classBox && this.classList.contains(classBox)) {
    
        if (dragSrcEl !== this) {
          // Retrieve the data from the dragged element
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    
          // Update the dragged element with the data from the drop target element
          dragSrcEl.innerHTML = this.innerHTML;
          dragSrcEl.style.borderWidth = this.style.borderWidth;
          dragSrcEl.style.borderColor = this.style.borderColor;
    
          // Update the drop target element with the data from the dragged element
          this.innerHTML = data.html;
          this.style.borderWidth = data.borderWidth;
          this.style.borderColor = data.borderColor;
    
          this.classList.remove('over');
          this.blur();
        }
      }
    
      return false;
    }

    // Add event listener for object that is passed as a parameter
	  newButton.addEventListener('dragstart', handleDragStart);
	  newButton.addEventListener('dragover', handleDragOver);
	  newButton.addEventListener('dragenter', handleDragEnter);
	  newButton.addEventListener('dragleave', handleDragLeave);
	  newButton.addEventListener('dragend', handleDragEnd);
	  newButton.addEventListener('drop', handleDrop);
	}

