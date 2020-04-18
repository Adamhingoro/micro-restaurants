import {Sequelize} from 'sequelize-typescript';
import { config } from '../config/config';


const c = config.prod;

// Instantiate new Sequelize instance!
export const sequelize = new Sequelize({
  "username": c.username,
  "password": c.password,
  "database": c.database,
  "host":     c.host,

  "dialect" : "postgres", // have to put this constantsly. will find a workdaround this.
  storage: ':memory:',
});

