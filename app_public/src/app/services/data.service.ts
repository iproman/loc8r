import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../models/Location';
import { Review } from '../models/Review';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  // Todo: remove
  private apiBaseUrl = environment.apiBaseUrl;

  /**
   * Get location
   */
  public getLocation(lat: number, lng: number): Promise<Location[]> {
    const maxDistance = 20;

    const url = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;

    // Todo: change to observable
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }

  /**
   * Get single location
   *
   * @param locationId
   */
  public getLocationById(locationId: string): Promise<Location> {

    const url = `${this.apiBaseUrl}/locations/${locationId}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError);
  }

  /**
   * Create new review
   *
   * @param locationId
   * @param formData
   */
  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {

    const url = `${this.apiBaseUrl}/locations/${locationId}/reviews`;

    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as Review)
      .catch(this.handleError);
  }

  /**
   * Handle error
   * @param error
   * @private
   */
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
