import {initGallery} from './gallery.js';
import {renderPhotos} from './pictures.js';
import {initForm} from './form-initiation.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {initFilter} from './filter.js';

getData()
  .then((photoData) => {
    renderPhotos(photoData);
    initGallery(photoData);
    initFilter(photoData);
  })
  .catch(
    (err) => showAlert(err.message));

initForm();
