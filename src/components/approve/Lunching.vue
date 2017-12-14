<template>
  <div class='approve-lunching'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="postData"></pubHeader>
    <div class='from-content' v-if="formData">
      <div class='content-item' v-for="(item,index) in renderData.form" :key='index'>
        <pub-radio v-if="item.type == 2 || item.type==1" v-bind:label="item.label" v-bind:data='selectData(item.view.data)' v-model="item.currentValue"></pub-radio>
        <pub-check-box v-if="item.type == 3 " v-bind:data='item' v-model="item.currentValue"></pub-check-box>
        <pub-input class='input-item' v-if="item.type == 4 " v-model='item.currentValue' v-bind:placeholder="item.view.placeholder" v-bind:label="item.label" v-bind:type="item.view.type"></pub-input>
        <pub-textarea class='input-item' v-if="item.type == 5 " v-model='item.currentValue' v-bind:placeholder="item.view.placeholder" v-bind:label="item.label"></pub-textarea>
        <pub-time-picker v-if="item.type == 6" v-model='item.currentValue' v-bind:label="item.label"></pub-time-picker>
        <pub-time-area v-if="item.type == 7" v-model='item.currentValue' v-bind:data="item"></pub-time-area>
      </div>
      <div class='content-item' v-for="(item,index) in renderData.file" :key='index'>
        <pub-file v-model='item.currentValue' v-bind:label="item.label" v-if="item.type == 10"></pub-file>
      </div>
      <pub-select label="抄送人" class='content-item' v-model='formData.copier' v-bind:data="formData.copier"></pub-select>
    </div>
  </div>
</template>
<script>
import pubHeader from "../public/Header";
import pubRadio from "../public/PubRadio";
import pubCheckBox from "../public/PubCheckBox";
import pubInput from "../public/PubInput";
import pubTextarea from "../public/PubTextarea";
import pubTimePicker from "../public/PubTimePicker";
import pubTimeArea from "../public/PubTimeArea";
import pubFile from "../public/PubFile";
import pubSelect from "../public/PubSelect";
export default {
  name: "approve-lunching",
  components: {
    pubHeader,
    pubRadio,
    pubCheckBox,
    pubInput,
    pubTextarea,
    pubTimePicker,
    pubTimeArea,
    pubFile,
    pubSelect
  },
  data() {
    return {
      formData: null,
      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false
      }
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm=>{
      vm.formData = null;
      vm.getData();
    })
  },
  computed: {
    headerData() {
      let data = {
        backUrl: { name: "approveList" },
        title: "发起审批",
        btnText: "发布"
      };
      if (this.formData) {
        data.title = this.formData.processname;
      }
      return data;
    },
    renderData() {
      let data = {
        form: [],
        file: []
      };
      if (this.formData) {
        this.formData.nodeForm.forEach(item => {
          if (
            item.type == 1 ||
            item.type == 2 ||
            item.type == 3 ||
            item.type == 4 ||
            item.type == 5 ||
            item.type == 6 ||
            item.type == 7
          ) {
            data.form.push(item);
          } else {
            data.file.push(item);
          }
        });
      }
      return data;
    }
  },
  methods: {
    getData() {
      this.$post({
        url: "/company/approval/intoStart",
        postData: {
          access_token: this.$store.state.userInfo.access_token,
          companyId: this.$store.state.userInfo.company_id,
          processmark: this.$store.state.approve.lunchingParam
        }
      })
        .then(data => {
          data.nodeForm.forEach(item => {
            item.view = JSON.parse(item.view);
          });
          this.formData = data;
        })
        .catch(e => {
          this.$toast("获取失败，请重试");
          console.log(e);
        });
    },
    postData() {
      let params = {
        nodemark: this.formData.nodemark,
        processmark: this.formData.processmark,
        userId: this.$store.state.userInfo.userId.toString(),
        copier: this.formData.copier,
        nodeForm: [],
        attachment: []
      };
      for (let i = 0; i < this.formData.nodeForm.length; i++) {
        if (!this.mustToast(this.formData.nodeForm[i])) {
          return;
        }
        let temp = {
          id: this.formData.nodeForm[i].id,
          label: this.formData.nodeForm[i].label,
          type: this.formData.nodeForm[i].type,
          values: this.formData.nodeForm[i].currentValue
        };
        if (this.formData.nodeForm[i].type != 10) {
          params.nodeForm.push(temp);
        } else {
          params.attachment.push(temp);
        }
      }
      let postParams = {
        access_token: this.$store.state.userInfo.access_token,
        companyId: this.$store.state.userInfo.company_id,
        start: JSON.stringify(params)
      };
      this.$post({ url: "/company/approval/confirm", postData: postParams })
        .then(data => {
          this.$toast("审批发起成功");
          let saveParams = {
            approvalId: data.approvalId,
            name: this.formData.processname,
            type: 1,
            status: 1,
            nodemark: this.formData.nodemark
          };
          //刷新我发起列表
          this.$store.commit("SETWILLUPDATE", { type: 1 });
          //保存传递给详情的参数
          this.$store.commit("SETAPPROVEPARAMS", saveParams);
          this.$router.push({ name: "approveDetails" });
        })
        .catch(e => {
          this.$toast("审批发起失败");
        });
    },
    mustToast(data) {
      let status = true;
      switch (data.type) {
        case 1:
        case 2:
        case 6:
          if (data.is_must == 1) {
            if (data.currentValue == undefined || data.currentValue == "") {
              status = false;
              this.$toast("请选择" + data.label);
            }
          } else if (data.currentValue == undefined) {
            data.currentValue = "";
          }
          break;
        case 3:
          if (data.is_must == 1) {
            if (data.currentValue == undefined) {
              status = false;
              this.$toast("请选择" + data.label);
            } else {
              let temp = JSON.parse(data.currentValue);
              if (temp.length == 0) {
                status = false;
                this.$toast("请选择" + data.label);
              }
            }
          } else if (data.currentValue == undefined) {
            data.currentValue = "[]";
          }
          break;
        case 4:
        case 5:
          if (data.is_must == 1) {
            if (
              data.currentValue == undefined ||
              data.currentValue.length == 0
            ) {
              status = false;
              this.$toast("请输入" + data.label);
            }
          } else if (data.currentValue == undefined) {
            data.currentValue = "";
          }
          break;
        case 10:
          if (data.is_must == 1) {
            if (data.currentValue == undefined) {
              status = false;
              this.$toast("请上传" + data.label);
            } else {
              let temp = JSON.parse(data.currentValue);
              if (temp.length == 0) {
                status = false;
                this.$toast("请上传" + data.label);
              }
            }
          } else if (data.currentValue == undefined) {
            data.currentValue = "[]";
          }
          break;
        case 7:
          if (data.is_must == 1) {
            if (data.currentValue == undefined) {
              status = false;
              this.$toast("请选择" + data.label);
            } else {
              let temp = JSON.parse(data.currentValue);
              if (temp[0] == null || temp[1] == null) {
                status = false;
                this.$toast("请选择完整的时间区间");
              } else if (temp[0] > temp[1]) {
                status = false;
                this.$toast("开始时间需小于结束时间");
              }
            }
          } else if (data.currentValue != undefined) {
            if (data.currentValue != "[]") {
              let temp = JSON.parse(data.currentValue);
              if (temp[0] == null || temp[1] == null) {
                status = false;
                this.$toast("请选择完整的时间区间");
              } else if (temp[0] > temp[1]) {
                status = false;
                this.$toast("开始时间需小于结束时间");
              }
            }
          } else {
            data.currentValue = "[]";
          }
          break;
      }
      return status;
    },
    selectData(data) {
      let arr = [{ label: "请选择", value: "", isSelect: true }];
      data.forEach(item => {
        arr.push({ label: item.value, value: item.value, isSelect: false });
      });
      return arr;
    }
  }
};
</script>


<style lang="scss">
.approve-lunching {
  height: 100%;
  overflow: hidden;
  .from-content {
    margin-top: 1rem;
    @include contentHeight(1,0);
    overflow-y: scroll;
    .content-item {
      > div {
        border-bottom: 1px solid $border-ec;
      }
    }
  }
}
</style>
