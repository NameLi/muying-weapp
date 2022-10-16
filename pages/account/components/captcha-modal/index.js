import { getCaptcha, createPhoneCode } from "../../../../api/common";

Component({
  properties: {
    codeLength: {
      type: Number,
      value: 4,
    },
    phone: {
      type: String
    },
    type: {
      type: String,
      value: "register",
    },
  },

  data: {
    loading: false,
    captche: "",
    visible: false,
    codeList: [],
    code: "",
    isFocus: false
  },

  attached() {
    this.setData({
      codeList: new Array(this.data.codeLength).fill("")
    })
  },

  methods: {
    open() {
      this.setData({
        visible: true,
        code: "",
        captche: "",
        loading: false,
        isFocus: true
      })

      this.getCaptcha();
    },

    async getCaptcha() {

      if (this.data.loading) return;

      this.setData({ loading: true })
      const { code, data } = await getCaptcha();
      this.setData({ loading: false })

      if (code === 200) {
        this.setData({
          captche: data.replace(/[\r\n]/g, "")
        })
      }
    },

    //
    async createPhoneCode() {
      let params = {
        phone: this.data.phone,
        code: this.data.code,
        type: this.data.type,
      };

      this.setData({ sendLoading: true });
      const { code, message } = await createPhoneCode(params);
      this.setData({ sendLoading: false });

      if (code === 200) {
        this.setData({ visible: false });

        wx.$toast(message);
        this.triggerEvent("on-success");
      } else if (code !== 450) {
        this.setData({ code: "" });
        this.getCaptcha();
      }
    },

    inputChange({ detail }) {
      this.setData({
        code: detail.value
      })

      if (this.data.code.length === this.data.codeLength) {
        this.createPhoneCode();
      }
    },
  }
})