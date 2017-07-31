export const EasterEgg = {

  emojiVisible: false,

  showEmoji(leafletMap, emoji) {
    this.emojiVisible = true;
    emoji = emoji || '😬';
    leafletMap._setEmojiMarkers(emoji);
  },

  hideEmoji(leafletMap) {
    this.emojiVisible = false;
    leafletMap._removeEmojiMarkers();
  }
};
