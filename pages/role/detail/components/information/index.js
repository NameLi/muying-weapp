Component({
  properties: {
    role: {
      type: Object,
    },
  },

  methods: {
    close() {
      this.triggerEvent('close', true)
    },
  }
})