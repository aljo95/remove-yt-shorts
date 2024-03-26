
/*
*  Home page script with mutationObserver for subscription feed
*/

let loadFunc = window.onload
window.onload = function(event) {

  /* Remove sections (rows) */ 
  const removeGenerated = () => {
    let shortsRow
    let count_one = 0
    const SRIntervalID = setInterval(() => {
      shortsRow = document.querySelectorAll("ytd-rich-section-renderer")
      if ((shortsRow.length > 0) && ((location.href === "https://www.youtube.com/") || (location.href === "https://www.youtube.com/feed/subscriptions"))) {
        for (let i=0; i<shortsRow.length; i++) {
          if (shortsRow[i]) {
            shortsRow[i].style.display = "none"
          }
        }
        clearInterval(SRIntervalID)
      }
      if (count_one > 10) clearInterval(SRIntervalID)
      count_one++
    }, 500)
  }

  /* Remove btn on side bar */
  const removeItemBtn = () => {
    let items
    let count_two = 0
    const btnIntervalID = setInterval(() => {
      items = document.querySelectorAll("#items")
      if ((items.length > 0) && (
        (location.href === "https://www.youtube.com/") || 
        (location.href === "https://www.youtube.com/feed/subscriptions")  ||
        ((location.href).substring(0, 25) === "https://www.youtube.com/@") || 
        ((location.href).substring(0, 31) === "https://www.youtube.com/channel") ||
        ((location.href).substring(0, 29) === "https://www.youtube.com/user/")
      )) {
        if ((items[1] !== undefined) && (items[1].children !== undefined)) {
          if (items[1].children[1] !== undefined) { /* Extreme checking because weird errors */
            items[1].children[1].style.display = "none"
            clearInterval(btnIntervalID)
          }
        } 
      }
      if (count_two > 10) clearInterval(btnIntervalID)
      count_two++
    }, 500)    
  }

  // Sometimes (rarely) you will find shorts side by side with normal videos which skews the page layout (weird af)
  const removeSingularShorts = () => {
    let sideShorts
    setTimeout(() => {
      sideShorts = document.querySelectorAll("ytd-rich-grid-slim-media")
      if (sideShorts.length > 0) {
        for (let i=0; i<sideShorts.length; i++) {
          if (sideShorts[i] && sideShorts[i].style != undefined)
            sideShorts[i].style.display = "none"
        }
      }
    }, 500)
  }

  /* Calling funcs and MutationObservers */ 
  removeGenerated()
  removeItemBtn()
  removeSingularShorts()

  let observer = new MutationObserver(() => {
    removeSingularShorts()
  });

  const config = { childList: true, characterData: true }
  setTimeout(() => {
    let primary = document.querySelector("#primary");
    let gridItemsContainer
    if (primary && primary.children) {
      gridItemsContainer = document.querySelector("#primary").children[0].children[5]
      if (typeof gridItemsContainer === "Node")
        observer.observe(gridItemsContainer, config)

    }
  }, 1000)

  let lastUrl = location.href
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      onUrlChange();
    }
  }).observe(document, {subtree: true, childList: true})

  function onUrlChange() {
    //console.log("last url: ", lastUrl)
    //console.log('URL changed!', location.href)
    
    let shortsRow
    let shortsRemix
    setTimeout(() => {
      shortsRow = document.querySelectorAll("ytd-rich-section-renderer")
      if (shortsRow.length > 0) {
        for (let i=0; i<shortsRow.length; i++) {
          shortsRow[i].style.display = "none"
        }
      }
    
      shortsRemix = document.querySelectorAll("ytd-reel-shelf-renderer")
      if (shortsRemix.length > 0 ) {
        if (shortsRemix.length > 0) {
          for (let i=0; i<shortsRemix.length; i++) {
            shortsRemix[i].style.display = "none"
          }
        }
      }
    }, 3000)
    //removeGenerated()
    //removeItemBtn()
  }

  if(loadFunc) loadFunc(event) 
}
