import moment from 'moment-timezone';

export default class task {
  private _id: number;
  private _title: string
  private _description: string
  private _createdAt: moment.Moment
  private _updatedAt: moment.Moment

  constructor(title: string = '', description: string = '') {
    this._title = title;
    this._description = description;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }

  set createdAt(createdAt: moment.Moment) {
    this._createdAt = createdAt;
  }

  get updatedAt(): moment.Moment {
    return this._updatedAt;
  }

  set updatedAt(updatedAt: moment.Moment) {
    this._updatedAt = updatedAt;
  }
}
