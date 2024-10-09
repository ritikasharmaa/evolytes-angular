export class BookOrderModel {

  static StatusTypes = {
    BillingFailed: 'BillingFailed',
    Processing: 'Processing',
    InDelivery: 'InDelivery',
    Delivered: 'Delivered',
    None: 'None',
    list: function() {
      return [{ key: this.BillingFailed, value: this.BillingFailed, iconURL: null },
        { key: this.Processing, value: this.Processing, iconURL: null },
        { key: this.InDelivery, value: this.InDelivery, iconURL: null },
        { key: this.Delivered, value: this.Delivered, iconURL: null },
        { key: this.None, value: this.None, iconURL: null }];
    }
  };

  _id: string;
  bookId: string;
  bookVersionId: string;
  userId: string;
  studentId: string;
  subscriptionId: string;
  status: string;
  orderId: string;
  trackingNumber: string;

  orderedAt: Date;
  shippedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  phone: string;

  static generateModel(json: any): BookOrderModel {

    const book = new BookOrderModel();
    book._id = json._id;
    book.bookId = json.bookId;
    book.bookVersionId = json.bookVersionId;
    book.userId = json.userId;
    book.studentId = json.studentId;
    book.subscriptionId = json.subscriptionId;
    book.status = json.status;
    book.orderId = json.orderId;
    book.trackingNumber = json.trackingNumber;

    if (json.orderedAt) {
      book.orderedAt = new Date(json.orderedAt);
    }

    if (json.shippedAt) {
      book.shippedAt = new Date(json.shippedAt);
    }

    if (json.createdAt) {
      book.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      book.updatedAt = new Date(json.updatedAt);
    }

    book.name = json.name;
    book.address = json.address;
    book.city = json.city;
    book.zip = json.zip;
    book.state = json.state;
    book.country = json.country;
    book.phone = json.phone;

    return book;

  }

  static generateModels(jsonList: any[]): BookOrderModel[] {

    const list = [];

    for (const book of jsonList) {
      list.push(this.generateModel(book));
    }

    return list;

  }

}
