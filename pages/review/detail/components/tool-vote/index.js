import { createReviewVote } from "../../../../../api/user"

Component({
  properties: {
    review: {
      type: Object,
    },
  },

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    async voteClick(e) {
      if (this.data.loading) return;

      const type = e.currentTarget.dataset.type;
      const id = this.data.review.id;

      let params = {
        type: this.data.review.vote_type === 0 ? type : "cancel",
      };

      this.setData({ loading: true });
      const { code, data, message } = await createReviewVote(id, params);
      this.setData({ loading: false });

      if (code === 200) {
        this.setData({
          review: Object.assign(this.data.review, data)
        })

        wx.$toast(message);
      }
    },
  }
})
