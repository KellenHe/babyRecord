import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BabyInfo } from '../../entities';
import { BabyInfoPage } from '../babyInfo/babyInfo';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-babyList',
  templateUrl: 'babyList.html'
})
export class BabyListPage implements OnInit {
  babyInfoList: BabyInfo[];

  constructor(public navCtrl: NavController, private storage: Storage, public alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.storage.get('babyInfos').then((value) => {
      if (value) {
        this.babyInfoList = value;
      }
    });
  }

  addNewBaby() {
    this.navCtrl.push(BabyInfoPage);
  }

  modifyBabyInfo(baby: BabyInfo) {
    this.navCtrl.push(BabyInfoPage, {
      id: baby.id
    })
  }

  deleteBabyInfo(baby: BabyInfo) {
    const confirm = this.alertCtrl.create({
      title: '是否删除宝宝信息？',
      message: '是否删除宝宝信息，删除后不能还原！',
      buttons: [
        {
          text: '否',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '是',
          handler: () => {
            for (let i = this.babyInfoList.length - 1; i >= 0; i--) {
              if (this.babyInfoList[i].id === baby.id) {
                this.babyInfoList.splice(i, 1);
                break;
              }
            }
            this.storage.set('babyInfos', this.babyInfoList);
          }
        }
      ]
    });
    confirm.present();
  }

  gotoHome(baby: BabyInfo) {
    this.navCtrl.push(HomePage, {
      id: baby.id
    });
  }
}
