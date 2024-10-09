import {Component, EventEmitter, Output, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-admin-sidebar-filter-skill-group',
  templateUrl: './admin-sidebar-filter-skill-group.component.html',
  styleUrls: ['./admin-sidebar-filter-skill-group.component.css']
})
export class AdminSidebarFilterSkillGroupComponent implements OnInit {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearchClicked = new EventEmitter<{ search: string }>();
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
    this.onSearchClicked.emit(this.filter);
    this.showFilter.emit(false);
  }

}
