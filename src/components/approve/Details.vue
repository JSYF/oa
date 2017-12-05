<template>
  <div class='approveDetails'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
    <div class='details-content' v-if="contentData">
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
      <!-- <div class=''></div> -->
      <detailsNode :nodeData="contentData.nodelog"></detailsNode>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import pubHeader from "../public/Header";
import pubShowFile from "../public/PubShowFile";
import pubShowInput from "../public/PubShowInput";
import detailsNode from "./DetailsNode";
export default {
  name: "detail",
  components: {
    pubHeader,
    pubShowFile,
    pubShowInput,
    detailsNode
  },
  data() {
    return {
      headerData: {
        title: "审批详情",
        backUrl: { name: "approve" }
      },
      contentData: null,
      formData: null,
      approveStatus: null
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
    getDetails(params) {
      params.access_token = this.$store.state.userInfo.access_token;
      params.userId = this.$store.state.userInfo.userId;
      params.companyId = this.$store.state.userInfo.company_id;
      // console.log(params);
      this.$post({ url: "/company/approval/showDetail", postData: params })
        .then(data => {
          this.headerData.title = data.name;
          this.contentData = data;
          this.formData = this.slotData(data);
          this.changeData();
        })
        .catch(e => {
          console.log(e);
          this.$toast("查询失败，请重试");
        });
    },
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
              }
              break;
            case "3":
              if (item.values != "[]") {
                item.values = JSON.parse(item.values).join(",");
              }
              break;
            case "4":
            case "5":
              if (item.values == "") {
                item.values = "无";
              }
              break;
          }
        });
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.getDetails(vm.$store.state.approve.detailsParam);
      vm.approveStatus = vm.$store.state.approve.detailsParam.approveStatus;
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
  }
}
</style>


