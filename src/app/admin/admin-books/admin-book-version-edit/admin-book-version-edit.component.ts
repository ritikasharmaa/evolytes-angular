import { Component, OnInit } from '@angular/core';
import { BookVersionIntegrationModel, BookVersionModel } from '../../../models/book-version.model';
import { BookModel } from '../../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { CultureModel } from '../../../models/localization/culture.model';
import { BookVersionService } from '../../../services/book-version.service';
import { ModalService } from '../../../root/modal.service';
import { ErrorModel } from '../../../models/shared/error.model';
@Component({
  selector: 'app-school-book-version-edit',
  templateUrl: './admin-book-version-edit.component.html',
  styleUrls: ['./admin-book-version-edit.component.css']
})
export class AdminBookVersionEditComponent implements OnInit {
  IsCopyVersion = false;
  isEditMode = false;
  BookVersion = BookVersionModel;
  version = new BookVersionModel();
  bookId: string;
  CultureModel = CultureModel;
  isCopybtn = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private versionSv: BookVersionService,
    private modalSv: ModalService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.bookId = params.bookId;
      const versionId = params.versionId;
      if (versionId) {
        this.isEditMode = true;
        this.versionSv.fetchBookVersionById(this.bookId, versionId).subscribe((bookVersion) => {
          this.version = bookVersion;
          this.version.integrations = this.version.integrations.sort((integrationOne, integrationTwo) => {
            return integrationOne.chapter - integrationTwo.chapter;
          });
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  getTitle(): string {

    if (this.isEditMode) {
      return 'Save';
    }

    return 'Create';
  }

  getIsCopied(): boolean {
    if (this.version) {
      return this.version.isCopied;
    }

    return false;
  }

  getCopiedColor(): string {
    return this.isCopybtn ? 'gray' : 'green';
  }
  getCopiedTitle(): string {
    if (this.version) {
      if (this.IsCopyVersion) {
        return 'Copied';

      }
    }

    return 'Copy';
  }


  getIsPublished(): boolean {

    if (this.version) {

      return this.version.isPublished;
    }

    return false;
  }

  getPublishTitle(): string {

    if (this.version) {

      if (this.version.isPublished === true) {
        return 'Unpublish';
      }

    }

    return 'Publish';
  }

  onCopyVersion() {

    if (this.version && this.isEditMode === true) {
      this.version.isCopied = !this.version.isCopied;
      this.versionSv.copyBookVersion(this.version, this.bookId).subscribe((version) => {
        this.version = version;
        this.IsCopyVersion = true;
        this.isCopybtn = true;
        this.modalSv.showAlertModal('Success', 'Book was successfully copied');
      });
    }
  }

  onPublishClicked() {

    if (this.version && this.isEditMode === true) {
      this.version.isPublished = !this.version.isPublished;
      this.versionSv.updateBookVersion(this.version, this.bookId).subscribe((version) => {
        this.version = version;
        this.modalSv.showAlertModal('Success', 'Book pulishing state was successfully changed');
      });
    }

  }

  onIntegrationClicked(integration: BookVersionIntegrationModel) {

    this.router.navigate(['admin', 'books', this.bookId, 'versions', this.version._id, 'integrations', integration._id, 'edit']);

  }

  onCreateIntegrationClicked() {

    this.router.navigate(['admin', 'books', this.bookId, 'versions', this.version._id, 'integrations', 'create']);

  }

  onSave() {
    if (!this.isEditMode) {
      this.versionSv.createBookVersion(this.version, this.bookId).subscribe((version) => {
        this.version = version;
        this.modalSv.showAlertModal('Success', 'You successfully created a book version').subscribe(() => {
          this.router.navigate(['admin', 'books', this.bookId, 'versions', version._id, 'edit']);
        });
      }, (err: ErrorModel) => {
        this.modalSv.showAlertModal('Error', err.message);
      });
    } else {
      this.versionSv.updateBookVersion(this.version, this.bookId).subscribe((bookVersion) => {
        this.version = bookVersion;
        this.modalSv.showAlertModal('Success', 'You have sccessfully update the version');
      });
    }
  }

  onDelete() {
    this.modalSv.showChoiceModal('Warning', 'Are you sure you want to delete this version?').subscribe((response) => {

      if (response) {
        this.versionSv.deleteBookVersion(this.bookId, this.version._id).subscribe((version) => {
          this.router.navigate(['admin', 'books', version.bookId, 'edit']);
        });
      }

    });
  }

}
