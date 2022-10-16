

Component({
  behaviors: [wx.computedBehavior],
  
  properties: {
    movie: {
      type: Object,
      required: true,
    },
  },
  
  computed: {
    award(data) {
      if (data.movie.awards.length) {
        let detail = data.movie.awards[0].children[0].desc;
        let title = detail.split(" ")[0];
        let info = detail.split(" ")[1];
        return {
          title,
          info,
        };
      }

      return {};
    }
  }
})
