export class FeedingRecordInfo {
  id: number;
  babyId: number;
  type: string;
  startTime: Date;
  endTime: Date;
  private leftDuration: number;
  private rightDuration: number;
  leftOfRight: string;
  comments: string;

  constructor() {
    this.leftOfRight = '无';
    this.leftDuration = 0;
    this.rightDuration = 0;
  }

  setLeftDuration(value: number) {
    this.leftDuration = value;
    this.leftOfRight = '左侧';
  }

  setRightDuration(value: number) {
    this.rightDuration = value;
    this.leftOfRight = '右侧';
  }

  getLeftDuration(): number {
    return this.leftDuration;
  }

  getRightDuration(): number {
    return this.rightDuration;
  }
}
