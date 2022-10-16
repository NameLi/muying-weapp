import { createUserFavorite } from "../../../../../api/user";

Component({

  behaviors: [wx.computedBehavior],

  properties: {
    height: {
      type: String,
      value: '96vh'
    },
  },

  data: {
    form: {
      name: "",
      brief: "",
    },
  },

  computed: {
    nameCount(data) {
      return data.form.name.length || 0;
    },
    briefCount(data) {
      return data.form.brief.length || 0;
    },
  },

  methods: {
    goBack() {
      this.triggerEvent('close')
    },

    titleInput({ detail }) {
      this.setData({
        'form.name': detail.value
      })
    },

    contentInput({ detail }) {
      this.setData({
        'form.brief': detail.value
      })
    },

    async createUserFavorite() {
      if (this.data.loading) return;

      if (this.data.form.name === "") {
        wx.$message.warning("请输入收藏夹名称");
        return;
      }

      const toast = wx.$toast({
        message: "保存中",
        type: "loading",
        duration: 0,
        mask: true,
      });

      this.setData({ loading: true });
      const { code } = await createUserFavorite(this.data.form);
      this.setData({ loading: false });

      toast.close();

      if (code === 200) {
        wx.$toast({
          position: "top",
          message: "创建成功",
        });

        this.triggerEvent("create");
      }
    },


  }
})
