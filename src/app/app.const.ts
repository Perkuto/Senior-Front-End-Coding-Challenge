/**
 * Define global constants.
 */
import {environment} from '../environments/environment';

// API
export const API_KEY = '7e4af817b3bee2f63dbc41f959ce14a4';
export const API_URL = environment.apiProtocol + '://' + environment.apiHost;
export const API_REST_SERVICES_URL = API_URL + environment.apiRestEndpoint;
export const API_PHOTOS_SEARCH_METHOD = 'flickr.photos.search';
export const API_PHOTOS_RECENT_METHOD = 'flickr.photos.getRecent';
export const PHOTO_URL = environment.photoUrl;
