Component({
  behaviors: [wx.computedBehavior],

  externalClasses: ['class'],

  properties: {
    images: {
      type: Array,
      value: [],
    },
  },

  computed: {
    photos(data) {
      let photos = [];
      for (let i = 0; i < 3; i++) {
        if (data.images[i]) {
          photos.push(data.images[i]);
        } else {
          photos.push("https://img.ixook.com/image/default.jpg@avatar");
        }
      }
      return photos;
    }
  },
})
