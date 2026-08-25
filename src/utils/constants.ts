export const ROOMVO_VISUALIZER_URL = 'https://www.roomvo.com/my/flooringwaterproof/';

export const openRoomVisualizer = () => {
  if (typeof window !== 'undefined') {
    window.open(ROOMVO_VISUALIZER_URL, '_blank', 'noopener,noreferrer');
  }
};
