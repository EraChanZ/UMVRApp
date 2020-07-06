import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}
  texts = ["the first thing", "the second thing"]
  text = this.texts[0]
  onChangeText() {
    this.text = (this.text == this.texts[0]) ? this.texts[1] : this.texts[0]
  }

}
