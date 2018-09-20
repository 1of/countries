var countries = [
{ "x": 255, "y": 350, "country": "Ukraine" },
{ "x": 720, "y": 100, "country": "Canada" },
{ "x": 450, "y": 135, "country": "USA" },
{ "x": 265, "y": 138, "country": "Belgium" },
{ "x": 95, "y": 275, "country": "Germany" },
{ "x": 850, "y": 400, "country": "Croatia" }
];

var form = document.getElementById("form");
var modal = document.getElementById("popup");
var p = document.createElement('p');
var modalText = document.querySelector("div>p");

form.onsubmit = function() {
	event.preventDefault();

		let value = document.querySelector('[name="inputCoordinats"]').value;
		let startIndex_X = value.indexOf("x=");  //find start index of "x=" in our string
		let startIndex_Y = value.indexOf("y="); //find start index of "y=" in our string
		let resultySliced, resultxSliced;

		resultySliced = +value.substring(startIndex_Y, startIndex_Y+5).replace(/\D+/g,""); //get only numbers from our string (max - 3 digit)  
		resultxSliced =  +value.substring(startIndex_X, startIndex_X+5).replace(/\D+/g,"");

		modal.classList.add("hide"); //close modal

	if ( startIndex_Y == -1 &&  startIndex_X == -1 ) { //indexOf return -1 if its does not find "x=" or "y=" 
		p.innerHTML = "";	
		modal.classList.remove("hide"); //show modal
		modalText.innerHTML = "Введите координаты в указанном формате: 'х=240,y=440' или 'х=200' или 'y=15' ";
	} else if (  startIndex_Y == -1  ) {     // if Y not specified start  func "findCountry" without y value
		findCountry(countries, resultxSliced, 0);
	} else if ( startIndex_X == -1  ) {  // if X not specified start  func "findCountry" without x value
		findCountry(countries, 0, resultySliced);
	} else if ( startIndex_X >=0 && startIndex_Y >= 0 ) { // start with all arguments
		findCountry(countries, resultxSliced, resultySliced);	
		}

};

function findCountry(array, x = 0, y = 0) {

	if (x == 0 && y == 0) {   
		modal.classList.remove("hide"); //show modal
		modalText.innerHTML = "Введите как минимум одну координату: 'х=200'";
		p.innerHTML = "";
		return
	}

	 switch (true) {
	  case ( y < 1 ):
	 	var index_x = findClosestIndex(array, x, y);
		p.innerHTML = `Ближайщая страна: <span>${array[index_x].country}</span>`;
		form.appendChild(p);
	    break;
	  case ( x < 1 ):
		var index_y = findClosestIndex(array, x, y);
		p.innerHTML = `Ближайщая страна: <span>${array[index_y].country}</span>`;
		form.appendChild(p);
	    break;
	  case ( x > 0 && y > 0 ):
		var index_xy = findClosestIndex(array, x, y);
		p.innerHTML = `Ближайщая страна: <span>${array[index_xy].country}</span>`;
		form.appendChild(p);
	    break;
	  default:
	    p.innerHTML = `Неверный ввод`;
	}
	 
};

function findClosestIndex(array, x, y) {

	let closestIndexX, closestIndexY, closestIndexXY;
	let minDiffX, minDiffY, minDiff = 1000;

	let passThroughArray = function(array, mindiff, value, prop) {
		let closestIndex;
		for (let item in array) {
			let differ = Math.abs(value - array[item][prop]);
			if(differ < minDiff) {
			minDiff = differ;
			closestIndex = item;
			}
		}	
		return closestIndex
	}; 

	if ( x > 0 && y == 0 ) {  // if we have only X value
		closestIndexX = passThroughArray(array, minDiffX, x, 'x');
				return closestIndexX
	}


	if ( y > 0 && x == 0 ) {  // if we have only Y value
			closestIndexY = passThroughArray(array, minDiffY, y, 'y');
				return closestIndexY
	}

	if ( y > 0 && x > 0 ) { // if we have X and Y value	

			closestIndexX = passThroughArray(array, minDiffX, x, 'x');
		    minDiffX = minDiff;

			closestIndexY = passThroughArray(array, minDiffY, y, 'y');
			minDiffY = minDiff;

			minDiffX > minDiffY ? closestIndexXY = closestIndexY : closestIndexXY = closestIndexX;   //if minimal difference between X > minimal difference between Y  => Return Y index of array, else X index
				return closestIndexXY
					
	}
	
};

function closeModal() {   
		modal.classList.add("hide"); //remove modal
		document.querySelector('[name="inputCoordinats"]').value = "";
	};