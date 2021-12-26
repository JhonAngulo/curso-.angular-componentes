import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img') img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/images/default.png';

  constructor() { 
  }

  imgLoadFail() {
    this.img = this.imageDefault
  }

  imgLoad() {
    this.loaded.emit(this.img)
  }

}
