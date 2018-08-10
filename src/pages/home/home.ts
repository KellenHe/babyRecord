import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BabyInfo, ActionInfo } from '../../entities';
import * as moment from 'moment';
import { BabyListPage } from '../babyList/babyList';
import { BreastMilkPage } from './breastMilk/breastMilk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('subActionState', [
      state('show', style({ transform: 'translateX(0)' })),
      state('hide', style({ transform: 'translateX(-100%)' })),
      transition('hide => show', animate('300ms')),
      transition('show => hide', animate('300ms'))
    ])
  ]
})
export class HomePage implements OnInit, OnDestroy {
  babyInfo: BabyInfo;
  babyInfoList: BabyInfo[];
  age: string;
  actionInfoList: ActionInfo[];
  currentAction: ActionInfo;

  constructor(public navCtrl: NavController, private storage: Storage, private navParams: NavParams) {

  }

  ngOnInit() {
    this.initAction();

    this.babyInfo = new BabyInfo();
    this.babyInfoList = [];
    this.storage.get('babyInfos').then((value) => {
      if (value) {
        this.babyInfoList = value;
        let id = this.navParams.get('id');
        if (id) {
          this.babyInfo = this.babyInfoList.find(item => item.id === id);
        } else {
          this.babyInfo = this.babyInfoList[0];
        }
        this.age = moment().diff(moment(this.babyInfo.birthDate + ' ' + this.babyInfo.birthTime, 'YYYY-MM-DD HH:mm'), 'days').toString();
      }
    });
  }

  ngOnDestroy() {
    this.actionInfoList = null;
    this.babyInfo = null;
    this.babyInfoList = null;
    this.currentAction = null;
    this.age = null;
  }

  showSubAction(action: ActionInfo) {
    if (this.currentAction) {
      this.currentAction.showSubAction = 'hide';
      this.currentAction = null;
    } else {
      if (action.subActionList && action.subActionList.length > 0) {
        this.currentAction = action;
        this.currentAction.showSubAction = 'show';
      } else {

      }
    }
  }

  gotoPage(subAction: ActionInfo) {
    let targetPage = null;
    switch(subAction.text) {
      case '喂母乳':
      targetPage = BreastMilkPage;
      break;
      case '瓶喂母乳':
      break;
      case '配方奶':
      break;
      case '辅食':
      break;
      case '换尿布':
      break;
      case '睡眠':
      break;
      case '挤奶':
      break;
      case '成长':
      break;
      case '里程碑':
      break;
      case '疫苗':
      break;
    }

    if (targetPage) {
      this.navCtrl.push(targetPage, {
        babyInfo: this.babyInfo
      })
    }
  }

  addBaby() {
    this.navCtrl.push(BabyListPage);
  }

  private initAction() {
    this.actionInfoList = [];
    let action = new ActionInfo('#icon-naiping1', '喂食', '#FF6600');
    this.actionInfoList.push(action);
    action.addSubAction(new ActionInfo('#icon-muruqinwei', '喂母乳', '#FF6600'));
    action.addSubAction(new ActionInfo('#icon-pingweimuru', '瓶喂母乳', '#FF6600'));
    action.addSubAction(new ActionInfo('#icon-peifangnai', '配方奶', '#FF6600'));
    action.addSubAction(new ActionInfo('#icon-yingerfushi', '辅食', '#FF6600'));
    action = new ActionInfo('#icon-diaper', '换尿布', '#3333CC');
    this.actionInfoList.push(action);
    action = new ActionInfo('#icon-chuang', '睡眠', '#00CC33');
    this.actionInfoList.push(action);
    action = new ActionInfo('#icon-icon-test', '挤奶', '#999933');
    this.actionInfoList.push(action);
    action = new ActionInfo('#icon-milestone', '其他活动', '#66FF66');
    this.actionInfoList.push(action);
    action.addSubAction(new ActionInfo('#icon-chengchang', '成长', '#66FF66'));
    action.addSubAction(new ActionInfo('#icon-milestone', '里程碑', '#66FF66'));
    action.addSubAction(new ActionInfo('#icon-yimiao', '疫苗', '#66FF66'));
  }
}
