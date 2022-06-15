import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date;
  loading = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('currentUser', this.user);
    this.loading = true;
    this.firestore
      .collection('users')
      .add(this.user.toJson())
      .then((result: any) => {
        this.loading = false;
        console.log(result);
        this.dialogRef.close();
      })
  }
}
