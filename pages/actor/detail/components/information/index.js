Component({
  properties: {
    actor: {
      type: Object,
    },
    loading: {
      type: Boolean,
    },
  },
  
  methods: {
    close() {
      this.triggerEvent('close', true)
    },
  }
})
