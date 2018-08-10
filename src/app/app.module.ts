import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BabyInfoPage } from '../pages/babyInfo/babyInfo';
import { BabyListPage } from '../pages/babyList/babyList';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { BreastMilkPage } from '../pages/home/breastMilk/breastMilk';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BabyInfoPage,
    BabyListPage,
    BreastMilkPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
    }),
    IonicStorageModule.forRoot({
      name: 'MyApp',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BabyInfoPage,
    BabyListPage,
    BreastMilkPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
