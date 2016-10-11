initGlobalValues(window);

globalValues.presImage = [];
globalValues.textsEn = [];
globalValues.textsDe = [];
globalValues.snippets = {};

// loadResource("json/snippets.json",globalValues.snippetPaths);
// loadResource("json/images.json",globalValues.backImages);

$(function(){

	globalValues.navbarContainer = document.querySelector("#navigation-container");
	globalValues.mainContainer = document.querySelector("#main-container");
    globalValues.footerContainer = document.querySelector("#footer-container");

	loadIntoHtml(globalValues.navbarContainer,"snippets/navbar.html",false,true);
	loadIntoHtml(globalValues.mainContainer,"snippets/cover.html",false,false);
    loadIntoHtml(globalValues.footerContainer,"snippets/footer.html",false,false);

	inflateContainer(globalValues.mainContainer,"json/snippets.json");

	menuCollapse();

	$(window).scroll(scrollEventhandler);
	$(window).resize(resizeEventhalndler);
});
