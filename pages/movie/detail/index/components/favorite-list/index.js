import { getUserFavorites, updateUserMovieFavorite } from "../../../../../../api/user";

Component({
  options: {
    addGlobalClass: true,
  },
  
  properties: {
    movie: {
      type: Object
    }
  },

  data: {
    loading: false,
    list: [],
    submitLoading: false,
  },

  attached() {
    this.getUserFavorites();
  },

  methods: {
    showCreateModal() {
      this.triggerEvent('show-create')
    },

    close() {
      this.setData({ loading: false });
      // this.$router.back();
    },

    async getUserFavorites() {
      let params = {
        movie: this.data.movie.id,
      };

      this.setData({ loading: true });
      const { code, data } = await getUserFavorites(params);
      this.setData({ loading: false });

      if (code === 200) {
        this.setData({
          list: data
        })
      }
    },

    checkChange(e) {
      const index = e.currentTarget.dataset.index;
      const value = e.detail;
      const key = 'list[' + index + '].is_checked';

      this.setData({
        [key]: value
      })
    },

    async submit() {
      const checkedList = this.data.list.filter((item) => item.is_checked);
      const favorite_ids = checkedList.map((item) => item.id);

      const params = {
        favorite_ids,
      };

      this.setData({ submitLoading: true })
      const { code, data, message } = await updateUserMovieFavorite(this.data.movie.id, params);
      this.setData({ submitLoading: false })

      if (code === 200) {
        wx.$toast({
          position: "top",
          message: message,
        });

        this.triggerEvent("favorite-update", data);
      }
    }
  },
})
