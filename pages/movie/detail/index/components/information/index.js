const app = getApp()

function arrayToString(array) {
  return Array.isArray(array) ? array.join(" / ") : array
}

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    show: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
    },
    movie: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isEpisode(data) {
      return data.movie.episode_count;
    },
    akas(data) {
      return arrayToString(data.movie.akas)
    },
    countries(data) {
      return arrayToString(data.movie.countries)
    },
    genres(data) {
      return arrayToString(data.movie.genres)
    },
    durations(data) {
      return arrayToString(data.movie.durations)
    },
    languages(data) {
      return arrayToString(data.movie.languages)
    },
    pubdates(data) {
      return arrayToString(data.movie.pubdates)
    }
  },

  methods: {
    close() {
      this.triggerEvent('close', true)
    },
  }
})
