import { Component, OnInit } from '@angular/core';
import { NEW } from '../new';
import { NewService } from '../new.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: []
})
export class NewsComponent implements OnInit {
  addingNEW = false;
  heroes: any = [];
  selectedNEW: NEW;

  constructor(private newService: NewService) {}

  ngOnInit() {
   this.getNEWs();
  }

  cancel() {
    this.addingNEW = false;
    this.selectedNEW = null;
  }

  deleteNews(news: NEW) {
    this.newService.deleteNews(news).subscribe(res => {
      this.heroes = this.heroes.filter(h => h !== news);
      if (this.selectedNEW === news) {
        this.selectedNEW = null;
      }
    });
  }

  getNEWs() {
    return this.newService.getNews().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  enableAddMode() {
    this.addingNEW = true;
    this.selectedNEW = new NEW();
  }

  onSelect(news: NEW) {
    this.addingNEW = false;
    this.selectedNEW = news;
  }

  save() {
    if (this.addingNEW) {
      this.newService.addNews(this.selectedNEW).subscribe(news => {
        this.addingNEW = false;
        this.selectedNEW = null;
        this.heroes.push(news);
      });
    } else {
      this.newService.updateNews(this.selectedNEW).subscribe(news => {
        this.addingNEW = false;
        this.selectedNEW = null;
      });
    }
  }
}