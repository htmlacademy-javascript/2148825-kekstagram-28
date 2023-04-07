const MIN_VALUE = 0;
const MAX_VALUE = 100;

const filterOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },

  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },

  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },

  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },

  heat: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  }
};

const filterStyles = {
  chrome: (filterValue) => `grayscale(${filterValue})`,
  sepia: (filterValue) => `sepia(${filterValue})`,
  marvin: (filterValue) => `invert(${filterValue}%)`,
  phobos: (filterValue) => `blur(${filterValue}px)`,
  heat: (filterValue) => `brightness(${filterValue})`
};

const radioButtons = document.querySelectorAll('.effects__radio');
const preview = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level');

let currentClass;

const resetFilterSlider = () => {
  slider.noUiSlider.off();
  preview.style.filter = '';

  if(currentClass) {
    preview.classList.remove(currentClass);
  }
};

const destroyFilterSlider = () => {
  slider.noUiSlider.destroy();
};

const onRadioButtonChange = (evt) => {
  const element = evt.target;
  resetFilterSlider();

  if (element.value === 'none') {
    sliderContainer.classList.add('hidden');

    return;
  }

  sliderContainer.classList.remove('hidden');
  currentClass = `effects__preview--${element.value}`;
  preview.classList.add(currentClass);
  slider.noUiSlider.updateOptions(filterOptions[element.value]);
  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    preview.style.filter = filterStyles[element.value](sliderValue.value);
  });
};

const initFilterSelection = () => {
  sliderContainer.classList.add('hidden');

  noUiSlider.create(slider, {
    range: {
      min: MIN_VALUE,
      max: MAX_VALUE,
    },
    start: MAX_VALUE,
    connect: 'lower'
  });

  for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', onRadioButtonChange);
  }
};

export {initFilterSelection, destroyFilterSlider, resetFilterSlider};
