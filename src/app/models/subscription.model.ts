export class SubscriptionModel {

  static SubscriptionType = {
    'free': 'free',
    '1M': '1M',
    '3M': '3M',
    '6M': '6M',
    '12M': '12M'
  };

  static StatusType = {
    Active: 'Active',
    BillingFailed: 'BillingFailed',
    FirstBillingFailed: 'FirstBillingFailed'
  };

  _id: string;
  userId: string;
  studentId: string;
  bookOrderId: string;
  status: string;
  orderId: string;
  type: string;
  card4: string;
  cardBrand: string;

  amount: string;
  currency: string;

  startAt: Date;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  address: string;
  city: string;
  zip: string;
  state: string;
  country: string;
  phone: string;

  static generateModel(json: any): SubscriptionModel {

    const sub = new SubscriptionModel();
    sub._id = json._id;
    sub.userId = json.userId;
    sub.studentId = json.studentId;
    sub.status = json.status;
    sub.orderId = json.orderId;
    sub.type = json.type;
    sub.card4 = json.card4;
    sub.cardBrand = json.cardBrand;
    sub.bookOrderId = json.bookOrderId;

    sub.amount = json.amount;
    sub.currency = json.currency;

    if (json.startAt) {
      sub.startAt = new Date(json.startAt);
    }

    if (json.createdAt) {
      sub.createdAt = new Date(json.createdAt);
    }

    if (json.updatedAt) {
      sub.updatedAt = new Date(json.updatedAt);
    }

    sub.name = json.name;
    sub.address = json.address;
    sub.city = json.city;
    sub.zip = json.zip;
    sub.state = json.state;
    sub.country = json.country;
    sub.phone = json.phone;

    return sub;

  }

  static generateModels(jsonList: any[]): SubscriptionModel[] {

    const list = [];

    for (const json of jsonList) {
      list.push(this.generateModel(json));
    }

    return list;

  }

}
