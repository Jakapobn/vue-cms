<template>
  <div class="upload">
    <UploadNewFile />
  </div>
</template>

<script>
// @ is an alias to /src
import UploadNewFile from "@/components/UploadNewFile.vue";

export default {
  name: "Upload",
  components: {
    UploadNewFile
  }
};
</script>
