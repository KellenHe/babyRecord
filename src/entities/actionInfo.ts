export class ActionInfo {
  imgName: string;
  text: string;
  subActionList: ActionInfo[];
  fontColor: string;
  showSubAction: string;

  constructor(imgName, text, fontColor) {
    this.imgName = imgName;
    this.text = text;
    this.fontColor = fontColor;
    this.showSubAction = 'hide';

    this.subActionList = [];
  }

  addSubAction(action: ActionInfo) {
    this.subActionList.push(action);
  }
}
