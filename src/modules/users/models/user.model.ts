import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  FirstName: string;

  @Column
  Username: string;

  @Column
  Email: string;

  @Column
  Password: string;
}