<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          <h2>File List</h2>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th style="width: 10%">
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >{{envSelected}}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" v-on:click="selectEnv('all')">All</a>
                      <a class="dropdown-item" v-on:click="selectEnv('staging')">Stg.</a>
                      <a class="dropdown-item" v-on:click="selectEnv('production')">Prod</a>
                    </div>
                  </div>
                </th>
                <th style="width: 10%">
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >{{appNameSelected}}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" v-on:click="selectAppName('All')">All</a>
                      <a
                        class="dropdown-item"
                        v-for="(data,index) in $store.getters.dropdown"
                        :key="index"
                        v-on:click="selectAppName(data)"
                      >{{data.label}}</a>
                    </div>
                  </div>
                </th>
                <th style="width: 15%">วันที่</th>
                <th style="width: 35%">ชื่อไฟล์</th>
                <th style="width: 10%">
                  <div class="dropdown">
                    <button
                      class="btn btn-info dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >{{platformSelected}}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" v-on:click="selectPlatform('All')">All</a>
                      <a class="dropdown-item" v-on:click="selectPlatform('Android')">Android</a>
                      <a class="dropdown-item" v-on:click="selectPlatform('IOS')">IOS</a>
                    </div>
                  </div>
                </th>
                <th style="width: 20%">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list,index) in $store.getters.uploadList" :key="index">
                <td v-if="index !== editIndex">{{ list.Env }}</td>
                <td v-if="index !== editIndex">{{ list.ApplicationName.Name }}</td>
                <td v-if="index !== editIndex">{{dateFormat(list.LastUpdated)}}</td>
                <td v-if="index !== editIndex">{{ list.Name }}</td>
                <td v-if="index !== editIndex">{{ list.Os }}</td>
                <td v-if="index !== editIndex">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-success dropdown-toggle"
                      data-toggle="dropdown"
                      data-display="static"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >Action</button>
                    <div
                      class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left text-center"
                    >
                      <button
                        type="button"
                        class="btn btn-warning mr-2"
                        v-on:click="openEdit(index,list)"
                      >แก้ไข</button>
                      <button
                        type="button"
                        class="btn btn-danger mr-2"
                        v-on:click="deleteFile(list.Id)"
                      >ลบ</button>
                      <button
                        type="button"
                        class="btn btn-info"
                        v-on:click="sendTopList(list.Id)"
                      >ขึ้น</button>
                    </div>
                  </div>

                  <!-- กดปุ่มแก้ไข  -->
                </td>
                <td v-if="index === editIndex">
                  <div class="dropdown">
                    <button
                      class="btn btn-warning dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >{{envValueToUpdate}}</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" v-on:click="selectEnvToUpdate('staging')">staging</a>
                      <a
                        class="dropdown-item"
                        v-on:click="selectEnvToUpdate('production')"
                      >production</a>
                    </div>
                  </div>
                </td>
                <td v-if="index === editIndex">{{ list.ApplicationName.Name }}</td>
                <td v-if="index === editIndex">{{ dateFormat(list.LastUpdated) }}</td>
                <td v-if="index === editIndex">
                  <input
                    type="text"
                    :value="list.Name"
                    class="form-control"
                    v-on:change="name = $event.target.value"
                  />
                </td>
                <td v-if="index === editIndex">
                  <!-- <label>
                    <input type="file" @change="handleFileUpload($event)" />
                  </label>-->
                  {{ list.Os }}
                </td>
                <td v-if="index === editIndex">
                  <button
                    type="button"
                    class="btn btn-success mr-2"
                    v-on:click="updateFile()"
                  >ยืนยัน</button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-on:click="closeEdit(index)"
                  >ยกเลิก</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "UploadList",
  data() {
    return {
      lists: [],
      editIndex: -1,
      name: "",
      id: "",
      file: "",
      appNameValue: "aiskaraoke",
      platformSelected: "All",
      appNameSelected: "All",
      envSelected: "All",
      envValue: "all",
      envValueToUpdate: ""
    };
  },
  created() {
    this.fetch();
    this.getDropDown();
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    getDropDown() {
      this.$store.dispatch("getDropDown");
    },

    fetch() {
      const formData = new FormData();
      formData.append("appName", this.appNameValue);
      formData.append("offset", 0);
      formData.append("max", 20);
      formData.append("env", this.envValue);
      this.$store.dispatch("fetchList", formData);
      this.$store.dispatch("setVariable", {
        appName: this.appNameValue,
        env: this.envValue
      });
    },

    deleteFile(id) {
      const formData = new FormData();
      formData.append("id", id);
      this.$store.dispatch("deleteFile", formData);
    },

    sendTopList(id) {
      const formData = new FormData();
      formData.append("id", id);
      this.$store.dispatch("sendTopList", formData);
    },

    openEdit(index, list) {
      this.editIndex = index;
      this.name = list.Name;
      this.id = list.Id;
      this.envValueToUpdate = list.Env;
    },

    closeEdit(index) {
      this.editIndex = -1;
      this.name = "";
      this.id = "";
    },

    updateFile() {
      const formData = new FormData();
      formData.append("id", this.id);
      formData.append("appName", this.appNameValue);
      formData.append("name", this.name);
      // formData.append("file", this.file);
      formData.append("env", this.envValueToUpdate);

      this.$store.dispatch("updateFile", formData);
    },

    selectPlatform(value) {
      this.platformSelected = value;
      this.$store.dispatch("filterList", {
        os: this.platformSelected.toLowerCase(),
        name: this.appNameValue.toLowerCase(),
        env: this.envValue.toLowerCase()
      });
    },

    selectAppName(data) {
      this.appNameSelected = typeof data === "string" ? data : data.label;
      this.appNameValue = typeof data === "string" ? data : data.value;
      this.fetch();
      // this.$store.dispatch("filterList", {
      //   os: this.platformSelected.toLowerCase(),
      //   name: this.appNameValue.toLowerCase(),
      //   env: this.envValue.toLowerCase()
      // });
    },

    dateFormat(value) {
      const date = new Date(value);
      var month = date.toLocaleString("en-US", { month: "short" });
      return date.getDate() + " " + month + " " + date.getFullYear();
    },

    selectEnv(value) {
      this.envValue = value;

      if (value === "staging") {
        this.envSelected = "Stg.";
      } else {
        this.envSelected = "Prod";
      }

      this.$store.dispatch("filterList", {
        os: this.platformSelected.toLowerCase(),
        name: this.appNameValue.toLowerCase(),
        env: this.envValue.toLowerCase()
      });
    },

    selectEnvToUpdate(env) {
      this.envValueToUpdate = env;
      console.log(this.envValueToUpdate);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdown-menu {
  min-width: 13rem;
}

.my-page {
  float: right;
  margin-right: 10rem;
}
</style>
