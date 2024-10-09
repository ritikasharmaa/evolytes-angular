import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-evo-progress-points',
  templateUrl: './evo-progress-points.component.html',
  styleUrls: ['./evo-progress-points.component.css']
})
export class EvoProgressPointsComponent implements OnInit {

  @Input() numPoints = 0;
  @Input() currentIndex = -1;

  @Input() selectedColor = '';
  @Input() defaultColor = '';

  // The size of the point in pixels
  @Input() pointSize = 10;
  // The space between the points in pixels
  @Input() space = 6;

  constructor() { }

  ngOnInit() {
  }

  pointsList(): number[] {

    const list = [];

    for (let i = 0; i < this.numPoints; i++) {
      list.push(i);
    }

    return list;

  }

  getWidth(index: number): string {

    if (index === this.numPoints - 1) {
      return this.pointSize.toString(10) + 'px';
    }

    return (this.pointSize + this.space).toString(10) + 'px';
  }

  getBackgroundColor(index: number): string {

    if (index === this.currentIndex) {
      return this.selectedColor;
    }

    return this.defaultColor;
  }

  getPointSize(): string {

    return this.pointSize.toString(10) + 'px';
  }

  getPointBorderRadius(): string {

    return (this.pointSize / 2.0).toString(10) + 'px';
  }

}
