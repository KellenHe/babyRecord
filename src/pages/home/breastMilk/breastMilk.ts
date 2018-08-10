import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BabyInfo, FeedingRecordInfo } from '../../../entities/index';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home';

@Component({
  selector: 'page-breastMilk',
  templateUrl: 'breastMilk.html'
})
export class BreastMilkPage implements OnInit {
  babyInfo: BabyInfo;
  feedingRecord: FeedingRecordInfo;
  feedingRecordList: FeedingRecordInfo[];
  lastFeedingRecord: FeedingRecordInfo;
  startTime: any;
  pageText: string = '喂母乳';
  isAuto: boolean = true;
  leftState: boolean = true;
  rightState: boolean = true;
  leftTimer: any;
  leftTimeMinute: number = 0;
  leftTimeSeconds: number = 0;
  rightTimer: any;
  rightTimeMinute: number = 0;
  rightTimeSeconds: number = 0;
  totalTimeMinute: number = 0;
  totalTimeSeconds: number = 0;
  totalTimeHours: number = 0;

  constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.lastFeedingRecord = new FeedingRecordInfo();

    this.feedingRecord = new FeedingRecordInfo();
    this.babyInfo = this.navParams.get('babyInfo');
    this.feedingRecord.babyId = this.babyInfo.id;
    this.feedingRecord.type = this.pageText;

    this.storage.get('feedingRecords').then((value) => {
      this.feedingRecordList = value;
      if (this.feedingRecordList && this.feedingRecordList.length > 0) {
        let feedingRecordListTemp = this.feedingRecordList.filter(item => item.babyId === this.babyInfo.id);
        if (feedingRecordListTemp && feedingRecordListTemp.length > 0) {
          this.lastFeedingRecord = feedingRecordListTemp.pop();
        }
      } else {
        this.feedingRecordList = [];
      }
    });

    this.checkStartTime();
  }

  save() {
    if (this.feedingRecord.getLeftDuration() + this.feedingRecord.getRightDuration() === 0) {
      const toast = this.toastCtrl.create({
        message: '还未记录时间',
        duration: 3000
      });

      toast.present();
    } else {
      this.feedingRecord.startTime = this.startTime.toDate();
      this.feedingRecord.endTime = moment().toDate();
      this.feedingRecord.id = this.feedingRecordList.length;
      this.feedingRecordList.push(this.feedingRecord);
      this.storage.set('feedingRecords', this.feedingRecordList);

      this.navCtrl.push(HomePage, {
        id: this.feedingRecord.babyId
      });
    }
  }

  startLeft() {
    this.leftState = false;
    this.rightState = true;
    if (this.rightTimer) {
      clearInterval(this.rightTimer);
      this.rightTimer = null;
    }
    this.checkStartTime();
    this.leftTimer = setInterval(() => {
      this.feedingRecord.setLeftDuration(this.feedingRecord.getLeftDuration() + 1);
      let duration = moment.duration(this.feedingRecord.getLeftDuration(), 'seconds');
      this.leftTimeMinute = duration.minutes();
      this.leftTimeSeconds = duration.seconds();
      this.getTotalTime();
    }, 1000);
  }

  startRight() {
    this.rightState = false;
    this.leftState = true;
    if (this.leftTimer) {
      clearInterval(this.leftTimer);
      this.leftTimer = null;
    }
    this.checkStartTime();
    this.rightTimer = setInterval(() => {
      this.feedingRecord.setRightDuration(this.feedingRecord.getRightDuration() + 1);
      let duration = moment.duration(this.feedingRecord.getRightDuration(), 'seconds');
      this.rightTimeSeconds = duration.seconds();
      this.rightTimeMinute = duration.minutes();
      this.getTotalTime();
    }, 1000);
  }

  endLeft() {
    this.leftState = true;
    if (this.leftTimer) {
      clearInterval(this.leftTimer);
      this.leftTimer = null;
    }
  }

  endRight() {
    this.rightState = true;
    if (this.rightTimer) {
      clearInterval(this.rightTimer);
      this.rightTimer = null;
    }
  }

  getTotalTime() {
    let totalDuration = moment.duration(this.feedingRecord.getLeftDuration() + this.feedingRecord.getRightDuration(), 'seconds');
    this.totalTimeHours = totalDuration.hours();
    this.totalTimeMinute = totalDuration.minutes();
    this.totalTimeSeconds = totalDuration.seconds();
  }

  checkStartTime() {
    if (!this.feedingRecord.getLeftDuration() && !this.feedingRecord.getRightDuration()) {
      this.startTime = moment();
    }
  }

  leftTimeMinuteChange(value: number) {
    if (value > 59) {
      this.leftTimeMinute = 59;
    }
    this.endLeft();
    this.leftTimeMinute = isNaN(parseInt(this.leftTimeMinute.toString())) ? 0 : parseInt(this.leftTimeMinute.toString());
    this.feedingRecord.setLeftDuration(moment.duration(this.leftTimeMinute, 'minutes').add(moment.duration(this.leftTimeSeconds, 'seconds')).asSeconds());
    this.getTotalTime();
    this.checkStartTime();
  }

  leftTimeSecondsChange(value: number) {
    if (value > 59) {
      this.leftTimeSeconds = 59;
    }
    this.endLeft();
    this.leftTimeSeconds = isNaN(parseInt(this.leftTimeSeconds.toString())) ? 0 : parseInt(this.leftTimeSeconds.toString());
    this.feedingRecord.setLeftDuration(moment.duration(this.leftTimeMinute, 'minutes').add(moment.duration(this.leftTimeSeconds, 'seconds')).asSeconds());
    this.getTotalTime();
    this.checkStartTime();
  }

  rightTimeMinuteChange(value: number) {
    if (value > 59) {
      this.rightTimeMinute = 59;
    }
    this.endRight();
    this.rightTimeMinute = isNaN(parseInt(this.rightTimeMinute.toString())) ? 0 : parseInt(this.rightTimeMinute.toString());
    this.feedingRecord.setRightDuration(moment.duration(this.rightTimeMinute, 'minutes').add(moment.duration(this.rightTimeSeconds, 'seconds')).asSeconds());
    this.getTotalTime();
    this.checkStartTime();
  }

  rightTimeSecondsChange(value: number) {
    if (value > 59) {
      this.rightTimeSeconds = 59;
    }
    this.endRight();
    this.rightTimeSeconds = isNaN(parseInt(this.rightTimeSeconds.toString())) ? 0 : parseInt(this.rightTimeSeconds.toString());
    this.feedingRecord.setRightDuration(moment.duration(this.rightTimeMinute, 'minutes').add(moment.duration(this.rightTimeSeconds, 'seconds')).asSeconds());
    this.getTotalTime();
    this.checkStartTime();
  }

  checkInput(event: any) {
    if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
      return false;
    }
  }
}
