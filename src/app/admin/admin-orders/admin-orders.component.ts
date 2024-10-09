import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {BookOrderModel} from '../../models/book-order.model';
import {QuestionModel} from '../../models/question.model';
import {BookModel} from '../../models/book.model';
import {BookService} from '../../services/book.service';
import {DateTime} from 'luxon';
import {Router} from '@angular/router';
import {UserModel} from '../../models/authentication/user.model';

@Component({
  selector: 'app-school-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  ordersByDate: { date: Date, orders: BookOrderModel[] };
  orders: BookOrderModel[] = [];
  books: BookModel[] = [];

  constructor(private adminSv: AdminService,
              private bookSv: BookService,
              private router: Router) { }

  ngOnInit() {

    this.adminSv.fetchOrders(UserModel.getAdminCountry()).subscribe((orders) => {

      this.orders = orders;

    });

    this.bookSv.fetchPublicBooks(UserModel.getAdminCountry()).subscribe((books) => {

      this.books = books;

    });

  }

  getOrderDate(order: BookOrderModel): string {

    if (order.orderedAt) {

      const date = DateTime.fromJSDate(order.orderedAt);
      return date.toLocaleString(DateTime.DATE_SHORT);
    }

    return '';

  }

  getBookVersionImgUrl(bookId: string, versionId: string): string {

    for (const book of this.books) {

      if (book._id === bookId) {

        for (const version of book.versions) {
          if (version._id === versionId) {

            return version.bookVersionImgURL();
          }
        }

      }

    }

    return null;

  }

  onOrderClicked(order: BookOrderModel) {

    this.router.navigate(['admin', 'orders', order._id]);

  }

}
