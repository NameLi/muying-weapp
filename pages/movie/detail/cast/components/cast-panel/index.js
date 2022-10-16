Component({
  properties: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      value: "",
    },
    count: {
      type: Number,
      value: 0,
    },
    actors: {
      type: Array,
      value: [],
    }
  }
})
