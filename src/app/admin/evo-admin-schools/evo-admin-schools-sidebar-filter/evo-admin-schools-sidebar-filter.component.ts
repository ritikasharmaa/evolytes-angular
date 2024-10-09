import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-evo-school-schools-sidebar-filter',
  templateUrl: './evo-admin-schools-sidebar-filter.component.html',
  styleUrls: ['./evo-admin-schools-sidebar-filter.component.css']
})
export class EvoAdminSchoolsSidebarFilterComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearchClicked = new EventEmitter<{ search: string, max: number }>();
  @Output() showFilter = new EventEmitter<boolean>();
  @Input() filter: { search: string, max: number };

  constructor() {
  }

  ngOnInit() {
  }

  onCancelClicked() {
    this.filter.search = '';
  }

  onValidateClicked() {
    this.filter.max = this.filter.max <= 0 ? 1 : this.filter.max;
    this.onSearchClicked.emit(this.filter);
    this.showFilter.emit(false);
  }

}
