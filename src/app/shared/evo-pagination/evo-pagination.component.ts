import {Component, EventEmitter, forwardRef, Input, Output, OnInit} from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';



@Component({
  selector: 'app-evo-pagination',
  templateUrl: './evo-pagination.component.html',
  styleUrls: ['./evo-pagination.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EvoPaginationComponent),
    multi: true
  }]
})
export class EvoPaginationComponent implements OnInit {

  @Output() pageChanged = new EventEmitter<number>();

  currentPage: number;
  pagesNumbers = [];


  private _totalCount = 0;
  @Input('totalCount')  // number of items
  set totalCount(count: number) {
    this._totalCount = count;
    this.setPagesNumber();
  }

  private _itemsPerPage = 0;
  @Input('itemsPerPage')  // number of items per page
  set itemsPerPage(numberItems: number) {
    this._itemsPerPage = numberItems;
    this.setPagesNumber();
  }

  constructor() {
  }

  ngOnInit() {
    this.currentPage = 1;
  }

  /**
   * Getters
   */

  getMaxPage(): Number {
    if (Number.isInteger(this._totalCount / this._itemsPerPage)) {
      return this._totalCount / this._itemsPerPage;
    } else {
      return (Math.ceil(this._totalCount / this._itemsPerPage));
    }

  }

  getCurrentPage(): Number {
    return this.currentPage;
  }

  /**
   * Setters
   */
  setCurrentPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.onPageClick(page);
    }
  }

  setPagesNumber() {
    const btn_next = document.getElementById('btn-next');
    const btn_prev = document.getElementById('btn-prev');

    if (this.getMaxPage() === 1) { // only one page
      this.pagesNumbers = [1];
      btn_next.style.visibility = 'hidden';
      btn_prev.style.visibility = 'hidden';
    } else {
      if (this.getCurrentPage() === 1) { // on first page
        btn_prev.style.visibility = 'hidden';
        btn_next.style.visibility = 'visible';
        this.pagesNumbers = [1, this.getMaxPage()];
      } else {
        if (this.currentPage === this.getMaxPage()) { // on last page
          btn_next.style.visibility = 'hidden';
          btn_prev.style.visibility = 'visible';
          if (this.getMaxPage() !== 1) {
            this.pagesNumbers = [1, this.getMaxPage()];
          }
        } else {
          btn_next.style.visibility = 'visible';
          btn_prev.style.visibility = 'visible';

          if (this.getMaxPage() !== 2) {
            this.pagesNumbers = [1, this.currentPage, this.getMaxPage()];
          } else { // only two page
            this.pagesNumbers = [1, this.getMaxPage()];
          }

        }
      }
    }
  }

  nextPage() {
    if (this.currentPage !== this.getMaxPage()) {
      this.currentPage = this.currentPage + 1;
      this.onPageClick(this.currentPage);
    }

  }

  previousPage() {
    if (this.currentPage !== 1) {
      this.currentPage = this.currentPage - 1;
      this.onPageClick(this.currentPage);
    }
  }

  onPageClick(page: number) {
    this.pageChanged.emit(page);
    this.setPagesNumber();
    }
}
