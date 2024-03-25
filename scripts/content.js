
let loadFunc = window.onload;
window.onload = function(event) {

  var display = "none";
  var element = document.createElement("style");
  element.id = "customStyleId";
  element.innerHTML = ".customStyle { display: " + display + ";}";
  document.getElementsByTagName('head')[0].appendChild(element);


  const removeBtnAndGenerated = () => {
     
    /* Remove sections (rows) */ 
    let shortsRow
    let count_one = 0;
    const SRIntervalID = setInterval(() => {
      shortsRow = document.querySelectorAll("ytd-rich-section-renderer")
      //console.log(shortsRow)
      if (shortsRow.length > 0) {
        for (let i=0; i<shortsRow.length; i++) {
          if (shortsRow[i]) {
            shortsRow[i].style.display = "none"
            shortsRow[i].classList.add("customStyle");
          }
        }
        clearInterval(SRIntervalID);
      }
      if (count_one > 10) clearInterval(btnIntervalID);
      count_one++;
    }, 500)

    /* Remove btn on side bar */
    let items
    let count_two = 0;
    console.log("after this")
    const btnIntervalID = setInterval(() => {
      items = document.querySelectorAll("#items")
      //console.log(items[1].children[1])
      if (items[1].children[1] !== null && items[1].children[1].style !== undefined) {    // Need to set for safety shit?
        items[1].children[1].style.display = "none";
        clearInterval(btnIntervalID);
      }
      if (count_two > 10) clearInterval(btnIntervalID);
      count_two++;
    }, 500)    
  }

  // Sometimes (rarely) you will find shorts side by side with normal videos which skews the page layout (weird af)
  const removeSingularShorts = () => {
    let sideShorts
    setTimeout(() => {
      sideShorts = document.querySelectorAll("ytd-rich-grid-slim-media");
    }, 500)
    if (sideShorts) {
      for (let i=0; i<sideShorts.length; i++) {
        if (sideShorts[i] && sideShorts[i].style != undefined)
          sideShorts[i].style.display = "none";
      }
    }
  }

  //var observer = new MutationObserver((mutationsList) => {
  var observer = new MutationObserver(() => {
    removeSingularShorts();
  });

  removeBtnAndGenerated();
  removeSingularShorts();
  const config = { childList: true, characterData: true };
  setTimeout(() => {
    let gridItemsContainer = document.querySelector("#primary").children[0].children[5];
    observer.observe(gridItemsContainer, config);
  }, 1000)

  if(loadFunc) loadFunc(event) 
}
