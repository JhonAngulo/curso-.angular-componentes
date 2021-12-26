import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userParent = 'https://www.w3schools.com/howto/img_avatar.png';
  imgRta = '';

  constructor (
    private usersService: UsersService,
    private filesService: FilesService,
  ) {

  }

  onLoaded(img: string) {
    console.log('log padre', img)
  }

  createUser() {
    this.usersService.create({
      name: 'Jhon',
      email: 'jhon.a@correo.com',
      password: 'a123456789'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  downloadPdf() {
    this.filesService.getFile(
      'dummy.pdf',
      'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      'application/pdf'
    ).subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
    
  }
}
