<template>
  <div class="home">
    <UploadList />
    <Pagination />
  </div>
</template>

<script>
// @ is an alias to /src
import UploadList from "@/components/UploadList.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Home",
  components: {
    UploadList,
    Pagination
  }
};
</script>
