import { createFeedback } from "../../../api/user";

Page({
  behaviors: [wx.computedBehavior],

  data: {
    isFeedback: false,
    maxlength: 200,
    content: "",
    submitLoading: false,
  },

  computed: {
    wordLength(data) {
      return data.content.length;
    },
  },

  async submit() {
    if (this.data.submitLoading) return;
    
    if (this.data.wordLength < 2) {
      wx.$message.warning("反馈内容不能少于2个文字");
      return;
    }

    let params = {
      content: this.data.content,
    };

    this.setData({ submitLoading: true })
    const { code, message } = await createFeedback(params);
    this.setData({ submitLoading: false })

    if (code === 200) {
      wx.$toast(message);
      this.setData({
        content: "",
        isFeedback: true
      })
    }
  },
})