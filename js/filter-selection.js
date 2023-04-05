const MIN_VALUE = 0;
const MAX_VALUE = 100;

const radioButtons = document.querySelectorAll('.effects__radio');
const preview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level');

const FilterOptions = {
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

const FilterStyles = {
  chrome: (filterValue) => `grayscale(${filterValue})`,
  sepia: (filterValue) => `sepia(${filterValue})`,
  marvin: (filterValue) => `invert(${filterValue}%)`,
  phobos: (filterValue) => `blur(${filterValue}px)`,
  heat: (filterValue) => `brightness(${filterValue})`
};

const resetFilterSlider = () => {
  sliderElement.noUiSlider.off();
  preview.removeAttribute('class');
  preview.style.filter = '';
};

const onRadioButtonChange = (evt) => {
  const element = evt.target;
  resetFilterSlider();

  if (element.value === 'none') {
    sliderContainer.classList.add('hidden');

    return;
  }

  sliderContainer.classList.remove('hidden');
  preview.classList.add(`effects__preview--${element.value}`);
  sliderElement.noUiSlider.updateOptions(FilterOptions[element.value]);
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    preview.style.filter = FilterStyles[element.value](sliderValue.value);
  });
};

const initFilterSelection = () => {
  sliderContainer.classList.add('hidden');

  noUiSlider.create(sliderElement, {
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

export {initFilterSelection, resetFilterSlider};
