import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { first, switchMap, tap } from 'rxjs/operators';
import { Location } from '../../models/Location';
import { PageInfo } from '../../models/PageInfo';
import { Observable } from 'rxjs';
import { FormChangeService } from '../../services/form-change.service';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, PageInfo {

  locationId: string;
  location: Location;

  constructor(
    private route: ActivatedRoute,
    private dataService: LocationService,
    private formChangeService: FormChangeService
  ) {
  }

  public pageContent = {
    header: {
      title: ''
    },
    sidebar: ''
  };

  ngOnInit(): void {
    this.initLocation();
  }

  private initLocation(): void {
    this.route
      .paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('locationId');
          return this.dataService.getLocationById(id);
        }),
        tap((newLocation: Location) => {
          const text = ` is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.\n\nIf you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.`;

          this.pageContent.header.title = newLocation.name;
          this.pageContent.sidebar = `${newLocation.name} ${text}`;
        }),
        first()
      )
      .subscribe((newLocation: Location) => this.location = newLocation);
  }

  canDeactivate(name: string): boolean | Observable<boolean> {

    if (this.formChangeService.changed) {
      return window.confirm(`${name}, there are unsaved changes! Are you sure?`);
    }

    return true;
  }
}
