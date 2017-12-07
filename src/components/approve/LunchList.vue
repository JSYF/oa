<template>
  <div class='approve-list'>
    <pubHeader v-bind:headerData="headerData"></pubHeader>
    <div class='approve-list-content'>
      <div class='lunch-item-box' v-for="itemBox in lunchList" :key='itemBox.id'>
        <p class='lunch-item-box-name'>
          <span>{{itemBox.name}}</span>
        </p>
        <div class='lunch-item-list'>
          <mt-button class='lunch-item' v-for="lunchItem in itemBox.processList" :key="lunchItem.processname" @click='toLunching(lunchItem)'>
            <img class='lunch-item-img' src="http://www.w3school.com.cn/i/eg_tulip.jpg"></img>
            <p class='lunch-item-name'>{{lunchItem.processname}}</p>
          </mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pubHeader from "../public/Header";
export default {
  name: "approve-lunchlist",
  components: { pubHeader },
  data() {
    return {
      lunchList: null,
      headerData: {
        title: "发起审批",
        backUrl: { name: "approve" }
      }
    };
  },
  methods: {
    //跳转到发起审批页面
    toLunching: function(item) {
      const params = item.processmark;
      this.$router.push({
        name: "approveLunching",
        params: { params }
      });
    },
    getLunchList() {
      this.$post({
        url: "/company/process/showProcess",
        postData: {
          companyId: this.$store.state.userInfo.company_id,
          access_token: this.$store.state.userInfo.access_token
        }
      })
        .then(data => {
          // console.log("流程列表数据",data);
          this.lunchList = data.processType;
        })
        .catch(e => {
          this.$toast("获取流程列表失败，请重试");
          console.log("err", e);
        });
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (!vm.lunchList) {
        vm.getLunchList();
      }
    });
  }
};
</script>

<style lang="scss">
.approve-list-content {
  padding-top: 1rem;
  .lunch-item-box {
    padding: 1rem 0;
    background: $bg-white;
    margin-bottom: 0.5rem;
    .lunch-item-box-name {
      position: relative;
      span {
        color: $font-11;
        font-size: 1.4rem;
        padding-left: 0.9rem;
        line-height: 2rem;
        letter-spacing: 1px;
      }
      &:after {
        position: absolute;
        left: 0;
        height: 100%;
        width: 0.2rem;
        content: "";
        display: block;
        top: 50%;
        transform: translateY(-50%);
        background: $secondary;
      }
    }
    .lunch-item-list {
      margin-top: 0.7rem;
      .lunch-item {
        border: none;
        height: 9rem;
        display: inline-block;
        width: 25%;
        text-align: center;
        box-shadow: none;
        background-color: white;
        .lunch-item-img {
          width: 4.2rem;
          height: 4.2rem;
          border-radius: 50%;
          margin-top: 1.4rem;
          margin-bottom: 0.8rem;
        }
        .lunch-item-name {
          font-size: 1.3rem;
          color: $font-11;
        }
      }
    }
  }
}
</style>
