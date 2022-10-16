import { createUserMovieRating } from "../../../../../api/user";

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    movie: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean
    }
  },

  data: {
    form: {
      rating: 0,
      content: "",
    },
    readonly: false
  },

  computed: {
    contentCount(data) {
      return data.form.content?.length || 0;
    },
    rating(data) {
      const rating = data.form.rating;
      return rating ? `${rating}.0` : "";
    },
  },

  attached() {
    this.data.id = this.data.movie.id;

    const edit = this.data.edit;
    this.setData({
      readonly: edit
    })

    if (edit) {
      const rating = this.data.movie.my_rating.rating;
      const content = this.data.movie.my_rating.content;

      this.setData({
        'form.rating': Number(rating),
        'form.content': content,
      })
    }
  },

  methods: {
    // 关闭
    goBack() {
      this.triggerEvent('close', true)
    },

    // 评分
    rateChange(e) {
      this.setData({
        'form.rating': e.detail
      })
    },

    // 内容
    contentChange(e) {
      this.setData({
        'form.content': e.detail.value
      })
    },

    // 创建评分
    async createUserMovieRating() {
      if (this.data.form.rating === 0) {
        wx.$toast("请选择评分");
        return;
      }

      if (this.data.loading) return;

      if (this.data.form.rating === 0) {
        wx.$message.warning("请选择评分");
        return;
      }

      const toast = wx.$toast({
        message: "保存中",
        type: "loading",
        duration: 0,
        mask: true,
      });

      this.setData({ loading: true });
      const { code, data, message } = await createUserMovieRating(this.data.id, this.data.form);
      this.setData({ loading: false });

      toast.close();

      if (code === 200) {
        wx.$toast({
          position: "top",
          message: "发布成功",
        });

        this.triggerEvent("rating-change");
      } else {
        wx.$toast(message);
      }
    }
  },
})