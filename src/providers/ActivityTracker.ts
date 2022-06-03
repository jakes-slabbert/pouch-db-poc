import { Injectable } from '@angular/core';
import * as moment from 'moment';

import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDB from 'pouchdb';

PouchDB.plugin(PouchDBAuthentication);
PouchDB.plugin(require('pouchdb-upsert'));

@Injectable()
export class ActivityTracker {
  data: any;
  db: any;
  remote: any;constructor() {
    this.db = new PouchDB('http://localhost:5984/couchdbpoc', {skip_setup: true});
    this.remote = 'http://localhost:5984/couchdbpoc';

    this.db.logIn('Admin', 'Password@123', function (err, response) {
      if (err) {
        if (err.name === 'unauthorized' || err.name === 'forbidden') {
          // name or password incorrect
          console.log('Unsuccessful');
        } else {
          // cosmic rays, a meteor, etc.
          console.log('Success');
        }
      }
    });
    
    //To know more about options, visit pouchdb.com
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auto_compaction: true
    };
    this.db.sync(this.remote, options);
  }saveActivity(data) {
    data._id = (moment().unix()).toString();
    this.db.upsert(data._id, function (doc) {
      if(!data.Name){
        doc.Name = data.Name;
      }
      if(!data.EmailAddress){
        doc.EmailAddress = data.EmailAddress;
      }
      if(!data.EmailAddress){
        doc.EmailAddress = data.EmailAddress;
      }
      if(!data.CourseName){
        doc.CourseName = data.CourseName;
      }
      if(!doc.EnrolledOn){
        doc.EnrolledOn = moment().format();
      }
      doc.UpdatedOn = moment().format();
      return doc;
    }).then((resp) => {
      console.log(resp);
    // success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
    })
     .catch((e) => {
       console.log(e);
       return e;
     });
   }
}