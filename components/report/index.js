import { getReport, createReport } from "../../api/common";

Component({
  behaviors: [wx.computedBehavior],

  data: {
    loading: false,
    visible: false,
    submitLoading: false,
    reason: null,
    reasons: [],
    _id: null,
    type: "",
  },

  computed: {
    disabled(data) {
      return data.reason === null;
    }
  },

  methods: {
    open(_id, type) {
      this.setData({
        submitLoading: false,
        reasons: [],
        reason: null,
        loading: false,

        visible: true,
        _id,
        type,
      })

      this.getReport();
    },

    // 获取举报类型
    async getReport() {
      let params = {
        type: this.data.type,
      };

      this.setData({ loading: true });
      const { code, data } = await getReport(params);
      this.setData({ loading: false });

      if (code === 200) {
        this.setData({
          reasons: data
        })
      }
    },

    checkReason(e) {
      const reason = e.currentTarget.dataset.reason;

      this.setData({
        reason
      })
    },

    handleConfirm() {
      if (this.data.submitLoading) return;

      if (this.data.reason === null) {
        wx.$toast("请选择原因");
        this.selectComponent('#modal').setData({
          loading: false
        });
        return;
      }
      this.createReport();
    },

    async createReport() {
      if (!this.data.reason) {
        this.$toast("请选择原因");
        return;
      }

      let params = {
        type: this.data.type,
        union_id: this.data._id,
        reason: this.data.reason,
      };
      this.data.submitLoading = true;
      const { code, message } = await createReport(params);
      this.data.submitLoading = false;

      if (code === 200) {
        wx.$toast({
          position: "top",
          message,
        });

        this.triggerEvent("on-success");

        this.setData({
          visible: false,
        })
      }

      this.selectComponent('#modal').setData({
        loading: false
      });
    },
  }
})
