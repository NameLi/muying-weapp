import { getMovieRatings } from "../../../../../api/movie";

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    movie: {
      type: Object,
      required: true,
    },
  },

  data: {
    loading: false,
    rating: "",
    voteCount: "",
    ratios: [],
    betterThan: [],
    months: [],
  },

  attached() {
    this.getMovieRatings();
  },

  methods: {
    closePage() {
      this.triggerEvent('close', true)
    },

    async getMovieRatings() {
      this.setData({ loading: true });
      const { code, data } = await getMovieRatings(this.data.movie.id);

      if (code === 200) {
        this.setData({
          rating: data.rating,
          voteCount: data.vote_count,
          ratios: data.ratios,
          betterThan: data.better_than,
          months: data.months
        })
      }

      this.setData({ loading: false });
    },
  },
})