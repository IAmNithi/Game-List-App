import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main1',
  templateUrl: './main1.component.html',
  styleUrls: ['./main1.component.css'],
  providers: [NgbRatingConfig]
})
export class Main1Component implements OnInit {
  selected = 8;
  public data;
  loading: boolean;
  search: string;
  backUp: any;
  individualData: any;
  constructor(config: NgbRatingConfig, private http: HttpClient, private modalService: NgbModal) {
    config.max = 10;
    config.readonly = true;
    this.loading = true;
    this.search = '';
   }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.http.get('http://starlord.hackerearth.com/gamesext')
    .subscribe(data => {
      this.loading = false;
      console.log(data);
      this.data = data;
      this.backUp = data;
    });
     }
     viewModal(content, data) {
       this.modalService.open(content);
       this.individualData = data;
       console.log(data);
    }
    sort(event) {
      console.log(event);
      let arr = [];
      let value = event.toLowerCase();
        if (this.data.length === 0) {
          this.data = this.backUp;
        } else {
          for (let i = 0; i < this.data.length; i++) {
            console.log(value);
            console.log(this.data[i]);
            let arrLoop = this.data[i].title.toLowerCase();
            if (arrLoop.match(value)) {
              arr.push(this.data[i]);
            }
            this.data = arr;
        }
      }
    }
}
