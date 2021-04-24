export const computePosition = (ref, noteDragged, monitor) => {
  const hoveredRect = ref.current?.getBoundingClientRect();
  const hoveredMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
  const hoveredQuarterY = (hoveredRect.bottom - hoveredRect.top) / 4;
  const topQuarter = hoveredQuarterY;
  const bottomQuarter = hoveredQuarterY * 3;
  const mouseY = monitor.getClientOffset().y;
  const mouseHoveredY = mouseY - hoveredRect.top;

  return {
    isMovingUp: mouseY < noteDragged.middleY,
    isMovingDown: mouseY > noteDragged.middleY,
    isAboveBottomQuarter: mouseHoveredY < bottomQuarter,
    isBelowBottomQuarter: mouseHoveredY > bottomQuarter,
    isBelowTopQuarter: mouseHoveredY > topQuarter,
    absoluteMiddleY: hoveredRect.top + hoveredMiddleY,
  };
};

export const getMiddleY = (ref) => {
  if (ref.current) {
    const rect = ref.current?.getBoundingClientRect();
    const middleY = (rect.bottom - rect.top) / 2;
    return rect.top + middleY;
  }
};
