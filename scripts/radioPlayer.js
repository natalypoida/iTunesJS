export const radioPlayerInit = () => {
    //getting elements from the DOM
  const radio = document.querySelector(".radio");
  const radioCoverImg = document.querySelector(".radio-cover__img");
  const radioHeaderBig = document.querySelector(".radio-header__big");
  const radioNavigation = document.querySelector(".radio-navigation");
  const radioItem = document.querySelectorAll(".adio-item");
  const radioStop = document.querySelector(".radio-stop");
  const radioVolume = document.querySelector(".radio-volume");
  const audio = new Audio();
  
  audio.type = "audio/aac";
  radioStop.disabled = true;

  //change icons when pause or play
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove("play");
      radioStop.classList.add("fa-play");
      radioStop.classList.remove("fa-stop");
    } else {
      radio.classList.add("play");
      radioStop.classList.add("fa-stop");
      radioStop.classList.remove("fa-play");
    }
  };

  //function to change value of volume
  const changeValue = () => {
    const valueVolume = radioVolume.value;
    audio.volume = valueVolume / 100;
  };
  radioVolume.addEventListener("input", changeValue);
  audio.addEventListener("volumechange", () => {
    radioVolume.value = Math.round(audio.volume * 100);
  });

  //add selected class to radio-item
  const selectItem = (elem) => {
    radioItem.forEach((item) => item.classList.remove("select"));
    elem.classList.add("select");
  };
 
  //add choosen radio stantion to the head of the page
  radioNavigation.addEventListener("change", (event) => {
    const target = event.target;
    const parent = target.closest(".radio-item");
    selectItem(parent);

    const title = parent.querySelector(".radio-name").textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parent.querySelector(".radio-img").src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    changeIconPlay();
  });

  //pause ans stop radio playing
  radioStop.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });
};
