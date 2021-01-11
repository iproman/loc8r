import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  public pageContent = {
    header: {
      title: 'About',
      strapline: ''
    },
    content: 'Loc8r was created to help people find places to sit down and get a bit of work done. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };

  ngOnInit(): void {
  }
}
