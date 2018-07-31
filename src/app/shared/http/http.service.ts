import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_KEY} from '../../app.const';
import {Observable} from 'rxjs';

/**
 * Service for http.
 */
@Injectable()
export class HttpService {
  // Params to add to all API requests
  readonly apiParams = new HttpParams()
    .set('format', 'json')
    .set('api_key', API_KEY);

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Build a 'p1=value1&p2=value2' string from an HttpParams, and add apiParams to it.
   * @param {HttpParams} params The list of params.
   * @returns {string} The 'p1=value1&p2=value2' string.
   */
  buildParams (params: HttpParams = null): string {
    let result = this.apiParams;
    if (params) {
      params.keys().forEach(key => result = result.set(key, params.get(key)));
    }
    return result.toString();
  }

  /**
   * Build a JSONP request from a URL and params.
   * @param {string} url The URL.
   * @param {HttpParams} params The params.
   * @returns {Observable<T>} The observable.
   */
  get<T>(url: string, params: HttpParams = null): Observable<T> {
    return this.httpClient.jsonp<T>(url + '/?' + this.buildParams(params), 'jsoncallback');
  }

}
