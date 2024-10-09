export class Newsletter {

  _id: string;
  email: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(email: string) {
    this.email = email;
    this._id = undefined;
    this.createdAt = undefined;
    this.updatedAt = undefined;
  }

  static generateModel(model: any) {

    const newsletter = new Newsletter(model['email']);

    const _id = model['_id'];
    if (_id != null) {
      newsletter._id = _id;
    }

    const createdAt = model['createdAt'];
    if (createdAt != null) {
      newsletter.createdAt = new Date(createdAt);
    }

    const updatedAt = model['updatedAt'];
    if (updatedAt != null) {
      newsletter.updatedAt = new Date(updatedAt);
    }

    return newsletter;
  }

}
