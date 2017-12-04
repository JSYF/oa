<template>
  <div class='approve-lunching'>
    <pubHeader v-bind:headerData="headerData" @rightBtnMehod="postData"></pubHeader>
    <div class='from-content' v-if="formData">
      <div class='content-item' v-for="(item,index) in renderData.form" :key='index'>
        <pubRadio v-if="item.type == 2 || item.type==1" v-bind:data='item' v-model="item.currentValue"></pubRadio>
        <pubCheckBox v-if="item.type == 3 " v-bind:data='item' v-model="item.currentValue"></pubCheckBox>
        <pubInput class='input-item' v-if="item.type == 4 " v-model='item.currentValue' v-bind:data="item"></pubInput>
        <pubTextarea class='input-item' v-if="item.type == 5 " v-model='item.currentValue' v-bind:data="item"></pubTextarea>
        <pubTimePicker v-if="item.type == 6" v-model='item.currentValue' v-bind:data="item"></pubTimePicker>
        <pubTimeArea v-if="item.type == 7" v-model='item.currentValue' v-bind:data="item"></pubTimeArea>
      </div>
      <div class='content-item' v-for="(item,index) in renderData.file" :key='index'>
        <pubFile v-model='item.currentValue' v-bind:data="item" v-if="item.type == 10"></pubFile>
      </div>
      <pubSelect label="抄送人" class='content-item' v-model='formData.copier' v-bind:data="formData.copier"></pubSelect>
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
  props: ["params"],
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
  computed: {
    headerData() {
      let data = {
        backUrl: { name: "approveList" },
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
  mounted() {
    this.getData();
  },
  watch: {
    params() {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$post({
        url: "/company/approval/intoStart",
        postData: {
          access_token: this.$store.state.userInfo.access_token,
          companyId: this.$store.state.userInfo.company_id,
          processmark: this.params
        }
      })
        .then(data => {
          data.nodeForm.forEach(item => {
            item.view = JSON.parse(item.view);
          });
          this.formData = data;
          console.log(data);
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
      console.log("发起审批参数", JSON.stringify(postParams));
      this.$post({ url: "/company/approval/confirm", postData: postParams })
        .then(data => {
          console.log("success", data);
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
            data.currentValue = "";
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
            data.currentValue = "";
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
            let temp = JSON.parse(data.currentValue);
            if (temp[0] == null || temp[1] == null) {
              status = false;
              this.$toast("请选择完整的时间区间");
            } else if (temp[0] > temp[1]) {
              status = false;
              this.$toast("开始时间需小于结束时间");
            }
          } else {
            data.currentValue = "";
          }
          break;
      }
      return status;
    }
  }
};
</script>


<style lang="scss">
.approve-lunching {
  height: 100%;
  overflow: hidden;
  .from-content {
    height: calc(100% - #{$header-height});
    overflow-y: scroll;
    .content-item {
      > div {
        border-bottom: 1px solid $border-ec;
      }
      .mint-cell {
        height: 100%;
        background-image: none;
        .mint-cell-wrapper {
          padding: 0 1.2rem;
          background-image: none;
          .mint-cell-value {
            margin-right: 1.7rem;
          }
          .mint-cell-allow-right {
            &:after {
              border: solid 2px $border-99;
              border-bottom-width: 0;
              border-left-width: 0;
              right: 1rem;
              height: 0.9rem;
              width: 0.9rem;
            }
          }
        }
      }
    }
  }
}
</style>
