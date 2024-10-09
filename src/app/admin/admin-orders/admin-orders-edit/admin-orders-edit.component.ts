import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {BookOrderModel} from '../../../models/book-order.model';
import {ActivatedRoute, Params} from '@angular/router';
import {UserModel} from '../../../models/authentication/user.model';
import {StudentModel} from '../../../models/authentication/student.model';
import {DateTime} from 'luxon';
import {ModalService} from '../../../root/modal.service';
import {BookService} from '../../../services/book.service';
import {BookModel} from '../../../models/book.model';
import {BookVersionModel} from '../../../models/book-version.model';
import {EvoLangDropdownComponent} from '../../../shared/evo-lang-dropdown/evo-lang-dropdown.component';
import {CountryModel} from '../../../models/localization/country.model';

@Component({
  selector: 'app-school-orders-edit',
  templateUrl: './admin-orders-edit.component.html',
  styleUrls: ['./admin-orders-edit.component.css']
})
export class AdminOrdersEditComponent implements OnInit {

  dropdownList = BookOrderModel.StatusTypes.list();
  order: BookOrderModel;
  user: UserModel;
  student: StudentModel;
  books: BookModel[] = [];

  constructor(private adminSv: AdminService,
              private modalSv: ModalService,
              private bookSv: BookService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      this.adminSv.fetchOrder(params.orderId).subscribe((order) => {

        this.order = order;

        this.adminSv.fetchUser(order.userId).subscribe((user) => {
          this.user = user;
        });

        this.adminSv.fetchStudent(order.studentId).subscribe((student) => {
          this.student = student;
        });

      });

    });

    this.bookSv.fetchPublicBooks(UserModel.getAdminCountry()).subscribe((books) => {
      this.books = books;
    });

  }

  getBookVersion(bookId: string, versionId: string): BookVersionModel {

    for (const book of this.books) {
      if (book._id === bookId) {
        for (const version of book.versions) {
          if (version._id === versionId) {
            return version;
          }
        }
      }
    }

    return null;

  }

  getBookVersionName(): string {

    if (this.order) {

      const bookVersion = this.getBookVersion(this.order.bookId, this.order.bookVersionId);
      if (bookVersion) {
        return bookVersion.name;
      }

    }

    return '';

  }

  getBookVersionEdition(): string {

    if (this.order) {

      const bookVersion = this.getBookVersion(this.order.bookId, this.order.bookVersionId);
      if (bookVersion) {
        return bookVersion.editionNumber.toString(10);
      }

    }

    return '';

  }

  getBookVersionImgURL(): string {

    if (this.order) {

      const bookVersion = this.getBookVersion(this.order.bookId, this.order.bookVersionId);
      if (bookVersion) {
        return bookVersion.bookVersionImgURL();
      }

    }

    return '';

  }

  getBookCountry(): string {

    if (this.order) {

      for (const book of this.books) {
        if (book._id === this.order.bookId) {

          return CountryModel.cultureTitle(book.country);
        }
      }

    }

    return null;
  }

  getOrderId(): string {

    if (this.order) {

      return this.order.orderId;
    }

    return '';
  }

  getTrackingNumber(): string {

    if (this.order) {

      return this.order.trackingNumber;
    }

    return null;

  }

  getStatus(): string {

    if (this.order) {

      return this.order.status;

    }

    return null;

  }

  setStatus(status: string) {

    if (this.order) {
      this.order.status = status;
    }

  }

  getOrderName(): string {

    if (this.order) {

      return this.order.name;
    }

    return null;
  }

  getShippedDate(): Date {

    if (this.order) {

      if (this.order.shippedAt) {

        return this.order.shippedAt;
      }

    }

    return null;

  }

  getOrderDate(): string {

    if (this.order) {

      const date = DateTime.fromJSDate(this.order.orderedAt);
      return date.toLocaleString(DateTime.DATE_SHORT);
    }

    return null;

  }

  getOrderPhoneNumber(): string {

    if (this.order) {

      return this.order.phone;
    }

    return null;

  }

  getOrderAddress(): string {

    if (this.order) {

      return this.order.address;
    }

    return null;

  }

  getOrderZip(): string {

    if (this.order) {

      return this.order.zip;
    }

    return null;

  }

  getOrderCity(): string {

    if (this.order) {

      return this.order.city;
    }

    return null;

  }

  getOrderCountry(): string {

    if (this.order) {

      return this.order.country;
    }

    return null;

  }

  getUserName(): string {

    if (this.user) {

      return this.user.firstName + ' ' + this.user.lastName;
    }

    return null;
  }

  getUserEmail(): string {

    if (this.user) {

      return this.user.email;
    }

    return null;

  }

  getStudentName(): string {

    if (this.student) {
      return this.student.firstName + ' ' + this.student.lastName;
    }

    return null;

  }

  getStudentCharacter(): string {

    if (this.student) {

      return this.student.evolytesProfile.character;
    }

    return null;

  }

  onSaveClicked() {

    this.adminSv.updateOrder(this.order).subscribe((order) => {

      this.order = order;
      this.modalSv.showAlertModal('Success', 'Order has been successfully updated');

    });

  }

}
