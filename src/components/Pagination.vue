<template>
  <div style="width:100%" class="mt-4">
    <div class="my-page">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        v-on:change="selectPage($event)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      offset: 0,
      count: 0
    };
  },
  computed: {
    rows() {
      return this.$store.getters.listsLength;
    }
  },
  methods: {
    selectPage(event) {

      //* ตรงนี้โค้ดหยาบมาก  เดี่ยวมาแก้นะ
      if (event === 1) {
        // reset
        this.offset = 0;
        this.count = 0;
      } else {
        this.count++; // กดครั้งที่เท่าไหร่
        let diff = 0;
        if (event > this.currentPage) {
          // next page
          diff = event - this.currentPage; // หาค่าต่าง
          this.offset = this.offset + diff * this.perPage; // เพิ่มทีละ 20
          this.offset = this.count === 1 ? this.offset + 1 : this.offset; // ถ้ากดครั้งแรก +1 ด้วยเพราะ offset เริ่ม 0
        } else if (event < this.currentPage) {
          // prev page
          diff = this.currentPage - event; // หาค่าต่าง
          this.offset = this.offset - diff * this.perPage; // ลดทีละ 20
        }
      }
      console.log(this.offset)
      this.currentPage - event;
      this.getList();
    },

    getList() {
      const formData = new FormData();
      formData.append("appName", this.$store.getters.appName);
      formData.append("offset", this.offset);
      formData.append("max", this.perPage);
      formData.append("env", this.$store.getters.env);
      this.$store.dispatch("fetchList", formData);
    }
  }
};
</script>

<style scoped>
.my-page {
  float: right;
  margin-right: 10rem;
}
</style>