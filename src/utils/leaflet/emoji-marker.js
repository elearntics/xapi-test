import L from 'leaflet';

export const EmojiIcon = {
  getIcon(emoji) {
    return L.divIcon({
      className: 'mwc-emoji-marker',
      html: `<p>${emoji}</p>`
    });
  }
};
