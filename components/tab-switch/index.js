Component({
  options: {
    styleIsolation: 'shared'
  },

  properties: {
    tabs: {
      type: Array,
      value: [
        {
          label: "热度",
          value: "hot",
        },
        {
          label: "最新",
          value: "created_at",
        },
      ],
    },

    aciveName: {
      type: String,
      value: "hot",
    },

    disabled: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    onChange({ detail }) {
      if (this.data.disabled) return;
      this.triggerEvent("change", detail);
    },
  }
})
