import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() { 
    // before render => antes del render, solo se corre una ves
    // no asincrono
    console.log('constructor', 'imgValue => ', this.img)
  }

  ngOnChanges() {
    // before - during render
    // cambios en los inputs
    console.log('onChange', 'imgValue => ', this.img)
  }

  ngAfterViewInit() {
    // after render
    // handle children
    console.log('ngAfterViewInit')
  }  

  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    console.log('ngInit', 'imgValue => ', this.img)
    // this.counterFn = setInterval(() => {
    //   this.counter += 1;
    //   console.log('Run counter')
    // },1000)
  }

  ngOnDestroy() {
    // delete
    console.log('ngOnDestroy')
    // clearInterval(this.counterFn)
  }

  imgLoadFail() {
    this.img = this.imageDefault
  }

  imgLoad() {
    console.log('imagen cargada')
    this.loaded.emit(this.img)
  }

}
