export default {
  props: {
    row: Number,
    col: String,
    value: null,
  },
  data() {
    return {
      isEditVisible: false,
    }
  },
  computed: {
    newValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', this.row, this.col, value)
      },
    },
  },
}
