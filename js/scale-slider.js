const SCALE_STEP = 25;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleTextValue = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview');

const onButtonSmallerClick = () => {
  let scaleValue = parseInt(scaleTextValue.value.slice(0, -1));

  if (scaleValue > SCALE_MIN) {
    scaleValue -= SCALE_STEP;
    scaleTextValue.value = `${scaleValue}%`;
    picture.setAttribute('style', `transform: scale(${scaleValue * 0.01});`);
  }
};

const onButtonBiggerClick = () => {
  let scaleValue = parseInt(scaleTextValue.value.slice(0, -1));

  if (scaleValue < SCALE_MAX) {
    scaleValue += SCALE_STEP;
    scaleTextValue.value = `${scaleValue}%`;
    picture.setAttribute('style', `transform: scale(${scaleValue * 0.01});`);
  }
};

const activateScaleSlider = () => {
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
  buttonBigger.addEventListener('click', onButtonBiggerClick);
};


const resetScaleSlider = () => {
  picture.removeAttribute('style');
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
};

export {activateScaleSlider, resetScaleSlider};
