<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          <h2>เพิ่มไฟล์</h2>
        </div>
        <div class="card-body">
          <div class="container">
            <div class="large-12 medium-12 small-12 cell d-i-f">
              <div class="dropdown mr-4">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{selectedEnv}}</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" v-on:click="selectEnv('staging')">Stg.</a>
                  <a class="dropdown-item" v-on:click="selectEnv('production')">Prod</a>
                </div>
              </div>
              <div class="dropdown mr-4">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >{{selectedText}}</button>
                <div
                  v-if="selectedValue === 'undefind'"
                  class="red-alert"
                  role="alert"
                >*Please Select App</div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a
                    class="dropdown-item"
                    v-for="(data,index) in $store.getters.dropdown"
                    :key="index"
                    v-on:click="selectDropDown(data)"
                  >{{data.label}}</a>
                </div>
              </div>
              <label v-if="editName" class="mr-4">
                <input
                  type="text"
                  :value="file.name"
                  class="form-control"
                  v-on:change="fileName = $event.target.value"
                />
              </label>
              <label class="mt-1">
                File
                <input
                  type="file"
                  id="file"
                  ref="file"
                  accept=".apk, .ipa"
                  v-on:change="handleFileUpload()"
                />
              </label>
            </div>
          </div>
          <button type="button" class="mt-4 btn btn-success" v-on:click="submitFile()">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadNewFile",
  props: {},
  data() {
    return {
      file: "",
      fileName: "",
      selectedText: "App",
      selectedEnv: "Stg.",
      selectedEnvValue: "staging",
      selectedValue: "",
      editName: false
    };
  },
  created() {
    this.getDropDown();
  },
  methods: {
    getDropDown() {
      this.$store.dispatch("getDropDown");
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name;
      this.editName = true;
      console.log(this.file);
    },

    selectDropDown(data) {
      console.log(data);
      this.selectedText = data.label;
      this.selectedValue = data.value;
    },

    selectEnv(env) {
      console.log(env);
      this.selectedEnv = env;
      this.selectedEnvValue = env.toLowerCase();
    },

    submitFile() {
      console.log(this.selectedValue);
      if (this.selectedValue !== "" && this.selectedValue !== "undefind") {
        const formData = new FormData();

        formData.append("appName", this.selectedValue);
        formData.append("name", this.fileName);
        formData.append("file", this.file);
        formData.append("Env",this.selectedEnvValue);
        this.$store.dispatch("addFile", formData);
      } else {
        this.selectedValue = "undefind";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.d-i-f {
  display: inline-flex;
}

.red-alert {
  color: red;
}
</style>
