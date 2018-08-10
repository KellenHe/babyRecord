import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BabyListPage } from '../pages/babyList/babyList';

import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    moment.locale('zh-cn', {
      relativeTime: {
        future: '%s',
        past: '%s',
        s: '一秒',
        ss: '%d 秒',
        m: '一分',
        mm: '%d 分',
        h: '小时',
        hh: '%d 小时',
        d: '一天',
        dd: '%d 天',
        M: '一月',
        MM: '%d 月',
        y: '一年',
        yy: '%d 年'
      },
      meridiem: function (hour, minute, isLowercase) {
        if (hour < 9) {
          return "早上";
        } else if (hour < 11) {
          return "上午";
        } else if (hour < 13) {
          return "中午";
        } else if (hour < 18) {
          return "下午";
        } else {
          return "晚上";
        }
      },
      calendar : {
        lastDay : '[昨天] LT',
        sameDay : 'LT',
        nextDay : '[明天] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    }

    });

    moment.relativeTimeThreshold('d', 30);
  }
}

