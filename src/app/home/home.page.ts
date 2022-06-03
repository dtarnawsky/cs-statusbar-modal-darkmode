import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { LearnComponent } from '../learn/learn.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) { }

  async openModal() {
    await StatusBar.setStyle({ style: this.getStyle(true) });
    const modal = await this.modalController.create({
      component: LearnComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(async () => {
      await StatusBar.setStyle({ style: this.getStyle(false) });
    });
    await modal.present();

  }

  getStyle(opposite: boolean): Style {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // In Dark Mode the base page is also dark so remain using Dark style
      return Style.Dark;
    } else {
      // In Light Mode the base page behind the modal is dark so switch from default style
      // when showing modal
      return opposite ? Style.Dark : Style.Light;
    }
  }

}
