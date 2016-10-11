function initGlobalValues(element){
	var globalValues = {};

	element.globalValues = globalValues;

	SnippetText = function SnippetText(){
		this.htmlDoc = "";
	};

	SnippetText.prototype.loadData = function(requestURL,isAsync){
		_this = this;
		function handler(responseText){
			if(responseText!=undefined){
				_this.htmlDoc = responseText;
			}
			else{
				window.alert("Document not Found!");
			}
		};
		sendGetRequest(requestURL,handler,false,isAsync);
	};

	SnippetText.prototype.insertIntoHtml = function(container,toReplace){
		_htmlDoc = this.htmlDoc;
		if(toReplace){
			container.innerHTML = _htmlDoc;
		}
		else{
			container.innerHTML += _htmlDoc;
		}
	};

	SnippetText.prototype.loadIntoHtml = function(container,requestURL,isAsync,toReplace){
		this.loadData(requestURL,isAsync);
		this.insertIntoHtml(container,toReplace);
	};

	SnippetText.prototype.insertProperty = function(propertyName, propertyValue){
		var propertyToReplace = "{{" + propertyName + "}}";
		var regex = new RegExp(propertyToReplace,"g");
		this.htmlDoc = this.htmlDoc.replace(regex,propertyValue);
	};

	SnippetObject = function SnippetObject(){
		this.numberOfSnippets = 0;
	};

	SnippetObject.prototype.loadJSON = function(requestURL,isAsync){

		_this = this;
		function handler(responseText){
			if(responseText!=undefined){
				_this.numberOfSnippets = responseText.numberOfSnippets;
			}
			else{
				window.alert("Document not Found!");
			}
		};

		sendGetRequest(requestURL,handler,true,isAsync);
	}

	globalValues.SnippetText = SnippetText;
}

function getRequestObject(){
	if(window.XMLHttpRequest){
		return (new XMLHttpRequest());
	}
	else if(window.ActiveXObject){
		return (new ActiveXObject("Microsoft.XMLHTTP"));
	}
	else{
		global.alert("AJAX NOT Supported");
		return (null);
	}
}

function handleResponse(request,responseHandler,isJSONResponse){
	if((request.readyState==4) && (request.status==200)){
		if(isJSONResponse==undefined){
			isJSONResponse = true;
		}

		if(isJSONResponse){
			responseHandler(JSON.parse(request.responseText));
		}
		else{
			responseHandler(request.responseText);
		}
	}
}

function sendGetRequest(requestURL, responseHandler, isJSONResponse, isAsync){
	var request = getRequestObject();
	request.onreadystatechange = function(){
		handleResponse(request,responseHandler,isJSONResponse);
	};
	request.open("GET",requestURL,isAsync);
	request.send(null);
}

function loadData(requestURL, dataHolder, dataFunction, isJSONResponse, isAsync){

	function handler(responseText){
		if(responseText!=undefined){
			if(dataFunction!=null){
				dataFunction(dataHolder,responseText);
			}
			else{
				dataHolder.copy(responseText);
			}
		}
		else{
			window.alert("Document not Found!");
		}
	};

	sendGetRequest(requestURL,handler,isJSONResponse,isAsync);
}

function setIntoHtml(container,textData,toReplace){
	if(toReplace){
		container.innerHTML = textData;
	}
	else{
		container.innerHTML += textData;
	}
}

function loadIntoHtml(container, requestURL, isAsync, toReplace){

	function handler(responseText){
		if(responseText!=undefined){
			if(toReplace){
				container.innerHTML = responseText;
			}
			else{
				container.innerHTML += responseText;
			}
		}
		else{
			window.alert("Document not Found!");
		}
	};

	sendGetRequest(requestURL,handler,false,isAsync);
}

function inflateContainer(container, requestURL){

	// var snippet0 = new globalValues.SnippetText();
	var snippet1 = new globalValues.SnippetText();
	// snippet1.loadData("../snippets/stripe.html",false);
	// loadData("../json/snippets.json",snippet0,null,true,true);
	// loadData("../snippets/stripe.html",snippet1,null,false,false);
	snippet1.loadData("constproj/snippets/stripe.html",false);
	snippet1.insertProperty("elementL","Meaow");
	snippet1.insertProperty("elementR","Purrrr");
	snippet1.insertIntoHtml(container,false);
	console.log(snippet1);

	var snObj = new SnippetObject();
	snObj.loadJSON("constproj/json/snippets.json",false);
	console.log(snObj);
	// setIntoHtml(container,snippet1.text,false);
}

function menuCollapse(){

	$('#navbarToggle').click(function(){
		$('#navbarToggle').focus();
	});

	$('#navbarToggle').focusout(function(){
		if(window.innerWidth<768){
			$('#collapsable-nav').collapse('hide');
		}
	});
}
