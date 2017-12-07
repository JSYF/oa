<template>
  <div class='approveDetails'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
    <div :class="[hasFooter?'hasfooter':'','details-content']" v-if="contentData">
      <div class='approveStatus' v-if="approveStatus == 2 || approveStatus == 3">
        <i :class="[approveStatus == 2 ? 'check-pass':'check-nopass','oa-icon']"></i>
      </div>
      <div class='form-item'>
        <mt-cell title='流程名称' :value='contentData.name'></mt-cell>
      </div>
      <div class='form-item-box' v-for="(formItem,index) in  formData" :key='index'>
        <div class='form-item' v-for="(item,index2) in  formItem" :key='index2'>
          <mt-cell :title='item.label' :value='item.values' v-if="item.type !=4&&item.type !=5 &&item.type !=10"></mt-cell>
          <pubShowInput class='input-item' v-if="item.type ==4 || item.type ==5" :label="item.label" :values="item.values" :isInput="isInput(item.type)"></pubShowInput>
          <pubShowFile class='file-item' :fileData="item" v-if="item.type == 10"></pubShowFile>
        </div>
      </div>
      <div class='approveing-form' v-if="hasFooter&&approveForm">
        <div class='content-item' v-for="(item,index) in approveForm" :key='index'>
          <pubRadio v-if="item.type == 2 || item.type==1" v-bind:data='item' v-model="item.currentValue"></pubRadio>
          <pubCheckBox v-if="item.type == 3 " v-bind:data='item' v-model="item.currentValue"></pubCheckBox>
          <pubInput class='input-item' v-if="item.type == 4 " v-model='item.currentValue' v-bind:data="item"></pubInput>
          <pubTextarea class='input-item' v-if="item.type == 5 " v-model='item.currentValue' v-bind:data="item"></pubTextarea>
          <pubTimePicker v-if="item.type == 6" v-model='item.currentValue' v-bind:data="item"></pubTimePicker>
          <pubTimeArea v-if="item.type == 7" v-model='item.currentValue' v-bind:data="item"></pubTimeArea>
        </div>
      </div>
      <pubTextarea v-if="hasFooter" class='input-item' v-model='approveText.currentValue' v-bind:data="approveText"></pubTextarea>
      <pubSelect label="抄送人" class='content-item' v-model='contentData.copier' v-bind:data="formData.copier" :unSelect="true"></pubSelect>
      <detailsNode :nodeData="contentData.nodelog"></detailsNode>
    </div>
    <div class='details-footer' v-if="hasFooter">
      <mt-button class='btn-item' @click="agree">
        <i class='oa-icon agree'></i>
        <span>同意</span>
      </mt-button>
      <mt-button class='btn-item' @click="disagree">
        <i class='oa-icon disagree'></i>
        <span>不同意</span>
      </mt-button>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import pubHeader from "../public/Header";
import pubShowFile from "../public/PubShowFile";
import pubShowInput from "../public/PubShowInput";
import detailsNode from "./DetailsNode";
import pubRadio from "../public/PubRadio";
import pubCheckBox from "../public/PubCheckBox";
import pubInput from "../public/PubInput";
import pubTextarea from "../public/PubTextarea";
import pubTimePicker from "../public/PubTimePicker";
import pubTimeArea from "../public/PubTimeArea";
import pubFile from "../public/PubFile";
import pubSelect from "../public/PubSelect";
export default {
  name: "detail",
  components: {
    pubHeader,
    pubShowFile,
    pubShowInput,
    detailsNode,
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
      headerData: {
        title: "审批详情",
        backUrl: { name: "approve" }
      },
      contentData: null,
      formData: null,
      approveForm: null,
      approveStatus: null,
      approveText: {
        currentValue: "",
        label: "请输入审批意见(选填)"
      }
    };
  },

  methods: {
    isInput(type) {
      if (type == 4) {
        return true;
      } else {
        return false;
      }
    },
    /**查询详情 */
    getDetails(params) {
      params.access_token = this.$store.state.userInfo.access_token;
      params.userId = this.$store.state.userInfo.userId;
      params.companyId = this.$store.state.userInfo.company_id;
      console.log("params", params);
      this.$post({ url: "/company/approval/showDetail", postData: params })
        .then(data => {
          if (data.nodeForm) {
            data.nodeForm.forEach(item => {
              item.view = JSON.parse(item.view);
            });
          }
          this.headerData.title = data.name;
          this.contentData = data;
          this.formData = this.slotData(data);
          this.approveForm = data.nodeForm;
          this.changeData();
          console.log(this.contentData);
        })
        .catch(e => {
          console.log(e);
          this.$toast("查询失败，请重试");
        });
    },
    /**数据分组 */
    slotData(data) {
      let arr = {};
      let returnArr = [];
      data.forms.forEach(item => {
        let temp = "form" + item.nodemark;
        if (arr[temp] == undefined) {
          arr[temp] = [];
          arr[temp].push(item);
        } else {
          arr[temp].push(item);
        }
      });
      for (let a in arr) {
        returnArr.push(arr[a]);
      }
      return returnArr;
    },
    /**修改数据格式 */
    changeData() {
      this.formData.forEach(items => {
        items.forEach(item => {
          switch (item.type) {
            case "7":
              if (item.values != "[]") {
                let temp = JSON.parse(item.values);
                item.values =
                  moment(temp[0]).format("YYYY-MM-DD HH:mm") +
                  " - " +
                  moment(temp[1]).format("YYYY-MM-DD HH:mm");
              } else {
                item.values = "无";
              }
              break;
            case "3":
              if (item.values != "[]") {
                item.values = JSON.parse(item.values).join(",");
              } else {
                item.values = "无";
              }
              break;
            case "1":
            case "2":
            case "4":
            case "5":
              if (item.values == "") {
                item.values = "无";
              }
              break;
            case "6":
              if (item.values == "") {
                item.values = "无";
              } else {
                item.values = moment(parseInt(item.values)).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
              break;
          }
        });
      });
    },
    /**同意 */
    agree() {
      let params = {
        nodemark: this.$store.state.approve.detailsParam.nodemark,
        userId: this.$store.state.userInfo.userId.toString(),
        approvalId: this.$store.state.approve.detailsParam.approvalId,
        result: 0,
        resultText: this.approveText.currentValue,
        nodeForm: [],
        attachment: []
      };
      for (let i = 0; i < this.approveForm.length; i++) {
        if (!this.mustToast(this.approveForm[i])) {
          return;
        }
        let temp = {
          id: this.approveForm[i].id,
          label: this.approveForm[i].label,
          type: this.approveForm[i].type,
          values: this.approveForm[i].currentValue
        };
        if (this.approveForm[i].type != 10) {
          params.nodeForm.push(temp);
        } else {
          params.attachment.push(temp);
        }
      }
      console.log("请求参数", {
        access_token: this.$store.state.userInfo.access_token,
        companyId: this.$store.state.userInfo.company_id,
        approveResult: params
      });
      this.$post({
        url: "/company/approval/approve",
        postData: {
          access_token: this.$store.state.userInfo.access_token,
          companyId: this.$store.state.userInfo.company_id,
          approveResult: JSON.stringify(params)
        }
      })
        .then(data => {
          let saveParam = this.$store.state.approve.detailsParam;
          saveParam.status = 0;
          this.$store.dispatch("setApproveParams", saveParam);
          this.getDetails(saveParam);
          this.$toast("同意审批成功");
        })
        .catch(e => {
          console.log("err", e);
          this.$toast("同意审批失败,请重试");
        });
    },
    /**不同意 */
    disagree() {
      let params = {
        nodemark: this.$store.state.approve.detailsParam.nodemark,
        userId: this.$store.state.userInfo.userId,
        approvalId: this.$store.state.approve.detailsParam.approvalId,
        result: 1,
        resultText: this.approveText.currentValue
      };
    },
    /**检查表单的完整性 */
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
    }
  },
  computed: {
    hasFooter() {
      console.log(this.$store.state.approve.detailsParam);
      if (
        this.$store.state.approve.detailsParam.type == 2 &&
        this.$store.state.approve.detailsParam.status == 1
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.contentData = null;
      vm.getDetails(vm.$store.state.approve.detailsParam);
    });
  }
};
</script>

<style lang="scss">
.approveDetails {
  height: 100%;
  .details-content {
    @include contentHeight(1,0);
    overflow-y: scroll;
    padding: 1rem 0;
    .form-item {
      background: $bg-white;
      min-height: 4.8rem;
      padding: 0 1.2rem;
      .mint-cell {
        background: none;
        .mint-cell-wrapper {
          padding: 0;
          background-image: none;
          .mint-cell-title {
            font-size: 1.5rem;
            color: $font-99;
          }
          .mint-cell-value {
            font-size: 1.5rem;
            color: $font-11;
          }
        }
      }
    }
    .form-item-box {
      margin-bottom: 1rem;
    }
    .approveing-form {
      margin-top: 1rem;
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
    &.hasfooter {
      height: calc(100% - #{$header-height} - #{$agreesFooterHeight});
      margin-bottom: $agreesFooterHeight;
    }
  }
  .details-footer {
    position: fixed;
    bottom: 0;
    z-index: 999;
    background: white;
    width: 100%;
    height: $agreesFooterHeight;
    line-height: $agreesFooterHeight;
    @include clearFix();
    .btn-item {
      width: 50%;
      height: 100%;
      position: relative;
      float: left;
      .oa-icon {
        display: inline-block;
        width: 2.2rem;
        height: 2.2rem;
        font-size: 1rem;
        border-radius: 50%;
        color: white;
        background: $secondary;
        position: relative;
        vertical-align: middle;
        &:before {
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      span {
        margin-left: 1rem;
        display: inline-block;
        vertical-align: middle;
      }
      &:first-child {
        &::before {
          content: "";
          position: absolute;
          right: 0;
          top: 15%;
          width: 1px;
          height: 70%;
          background: $bg-ec;
        }
      }
      &:last-child {
        .oa-icon {
          background: $danger;
        }
      }
    }
  }
}
</style>


