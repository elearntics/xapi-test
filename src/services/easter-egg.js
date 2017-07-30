export const EasterEgg = {

  emojisVisible: false,

  showEmojis(leafletMap, emoji) {
    this.emojisVisible = true;
    emoji = emoji || '😬';
    leafletMap._setEmojiMarkers(emoji);
  },

  hideEmojis(leafletMap) {
    this.emojisVisible = false;
    leafletMap._removeEmojiMarkers();
  }
};
