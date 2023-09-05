import { Component, OnInit } from '@angular/core';
import {IdentidadeDigitalService} from "../services/identidade-digital.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private identidadeService: IdentidadeDigitalService
  ) { }

  ngOnInit() {
    this.identidadeService.generateId('e5d24338642963f978acae43a70c7e5ca25267db', 9698).subscribe({
      next: (res) => {
        console.log(res)
      }
    });

    // this.identidadeService.login('75203000050', '12345678').subscribe({
    //     next: (res) => {
    //       console.log(res)
    //     }
    //   });
  }

}
