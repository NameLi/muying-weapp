Component({
  properties: {
    value: {
      type: String,
      value: "",
    },
    list: {
      // type: Array,
      type: null,
      value: []
    },
  },

  methods: {
    checkItem(e) {
      const name = e.currentTarget.dataset.name
      this.triggerEvent("change", name);
    },
  }
})
