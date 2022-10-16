import { createCollection, deleteCollection } from "../../../api/user";

Component({

  externalClasses: ['tool-item-class'],

  properties: {
    type: {
      required: true,
      type: String,
    },
    // 数据
    data: {
      required: true,
      type: Object,
    },
    defaultCount: {
      type: String,
      value: "收藏",
    },
  },

  data: {
    loading: false
  },

  methods: {
    async likeClick() {
      if (this.data.data.allow_collection === 0) {
        return;
      }

      if (this.data.loading) return;

      this.setData({
        loading: true
      })

      const { code, data } = this.data.data.is_collection
        ? await deleteCollection(this.data.type, this.data.data.id)
        : await createCollection(this.data.type, this.data.data.id);

      this.setData({
        loading: false
      })

      if (code === 200) {
        // this.triggerEvent("on-change", data);
        this.setData({
          data: Object.assign(this.data.data, data)
        })
      }
    },
  }
})
