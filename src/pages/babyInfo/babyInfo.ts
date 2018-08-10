import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { BabyInfo } from '../../entities';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-babyInfo',
  templateUrl: 'babyInfo.html'
})
export class BabyInfoPage implements OnInit {
  babyInfo: BabyInfo;
  babyInfoList: BabyInfo[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private camera: Camera, private storage: Storage,
              private navParams: NavParams) {

  }

  ngOnInit() {
    this.babyInfo = new BabyInfo();
    this.babyInfoList = [];
    this.storage.get('babyInfos').then((value) => {
      if (value) {
        this.babyInfoList = value;
        let id = this.navParams.get('id');
        if (id) {
          this.babyInfo = this.babyInfoList.find(item => item.id === id);
        }
      }
    });
  }

  selectPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log('camer error', err);
    });
  }

  save() {
    if (this.checkInfo()) {
      if (this.babyInfo.id) {
        for (let i = this.babyInfoList.length - 1; i >= 0; i--) {
          if (this.babyInfoList[i].id === this.babyInfo.id) {
            this.babyInfoList[i] = this.babyInfo;
          }
        }
      } else {
        this.babyInfo.id = this.babyInfoList.length + 1;
        this.babyInfoList.push(this.babyInfo);
      }
      this.storage.set('babyInfos', this.babyInfoList);
      this.navCtrl.push(HomePage, {
        id: this.babyInfo.id
      });
    }
  }

  checkInfo() {
    let subTitle = '';
    let result = true;
    if (!this.babyInfo.name) {
      subTitle = '宝宝叫什么名字？';
      result = false;
    } else if (this.babyInfo.sex === undefined) {
      subTitle = '宝宝是男孩还是女孩？';
      result = false;
    } else if (!this.babyInfo.birthDate) {
      subTitle = '宝宝的出生日期是？';
      result = false;
    } else if (!this.babyInfo.birthTime) {
      subTitle = '宝宝的出生时间是？';
      result = false;
    }
    if (!result) {
      this.showAlert(subTitle);
    }
    return result;
  }

  showAlert(subTitle: string) {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: subTitle,
      buttons: ['确定']
    });
    alert.present();
  }
}
