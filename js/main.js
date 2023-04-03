import {initGallery} from './gallery.js';
import {renderPhotos} from './pictures.js';
import {initForm} from './form-initiation.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {initFilterButtons, defaultCb, randomCb, discussedCb, initFiltersListeners} from './filter.js';

getData()
  .then((photoData) => {
    renderPhotos(photoData);
    initGallery(photoData);
    initFilterButtons();
    initFiltersListeners (
      debounce(() => defaultCb(photoData)),
      debounce(() => randomCb(photoData)),
      debounce(() => discussedCb(photoData))
    );
  })
  .catch(
    (err) => showAlert(err.message));

initForm();
