export class DragPositionAdapter {
  constructor(ref, noteDragged, monitor) {
    const hoveredRect = ref.current?.getBoundingClientRect();
    const hoveredMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
    this.hoveredQuarterY = (hoveredRect.bottom - hoveredRect.top) / 4;
    this.absoluteMiddleY = hoveredRect.top + hoveredMiddleY;
    this.topQuarter = this.hoveredQuarterY;
    this.bottomQuarter = this.hoveredQuarterY * 3;
    this.noteDragged = noteDragged;
    this.mouseY = monitor.getClientOffset().y;
    this.mouseHoveredY = this.mouseY - hoveredRect.top;
  }

  isMovingUp() {
    return this.mouseY < this.noteDragged.middleY;
  }

  isMovingDown() {
    return this.mouseY > this.noteDragged.middleY;
  }

  aboveBottomQuarter() {
    return this.mouseHoveredY < this.bottomQuarter;
  }

  belowBottomQuarter() {
    return this.mouseHoveredY > this.bottomQuarter;
  }

  belowTopQuarter() {
    return this.mouseHoveredY > this.topQuarter;
  }
}
