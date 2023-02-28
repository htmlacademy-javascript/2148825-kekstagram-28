import {generatePhotos} from './generate-data.js';
import {renderPhotos} from './pictures.js';

const PHOTO_NUMBER = 25;
const photoData = generatePhotos(PHOTO_NUMBER);
renderPhotos(photoData);
