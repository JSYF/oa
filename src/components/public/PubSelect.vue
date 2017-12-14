<template>
  <div class='pubSelect'>
    <div @click='addSelect' class='select-title-bar'>
      <mt-cell v-bind:click='addSelect' :value="num" :is-link="select">
        <label slot="title" class='label'>
          {{label}}
          <span v-if="select">(点击头像取消)</span>
        </label>
      </mt-cell>
    </div>
    <div class='select-box'>
      <div class='select-item' v-for="(item,index) in selectList" :key='item.id' @click='delSelect(index)'>
        <img :src="item.img" class='user-img'>
        <p class='user-name'>{{item.realname}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pubSelect",
  props: ["data", "label", "unSelect", "value"],
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  data() {
    return {
      selectList: []
    };
  },
  computed: {
    list() {
      //根据ID获取用户资料
      //   let arr = [];
      //   this.data.forEach(item => {
      //     arr.push({});
      //   });
      //   return arr;
    },
    //是否是职能选一个
    alone() {
      if (this.isAlone == true) {
        return false;
      } else {
        return true;
      }
    },
    //是否是选择展示
    select() {
      if (this.unSelect == true) {
        return false;
      } else {
        return true;
      }
    },
    // 已选人数
    num() {
      if (this.isAlone != true && this.selectList.length != 0) {
        return this.selectList.length + "人";
      } else {
        return "";
      }
    }
  },
  watch: {
    value() {
      this.selectList = this.value;
    }
  },
  methods: {
    addSelect() {
      this.selectList.push({
        userId: "10000000081",
        realname: "雷神",
        img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
      });
      this.$emit("returnDataFunc", this.selectList);
    },
    delSelect(index) {
      this.selectList.splice(index, 1);
      this.$emit("returnDataFunc", this.selectList);
    }
  }
};
</script>



<style lang="scss">
.pubSelect {
  margin: 1rem 0;
  background: $bg-white;
  .select-title-bar {
    height: 5rem;
    margin-bottom: 2rem;
    border-bottom: 0 !important;
    position: relative;
    &::after {
      content: "";
      display: block;
      height: 1px;
      width: 90%;
      right: 0;
      background: $border-ec;
      position: absolute;
      bottom: 0;
    }
    .mint-cell {
      background: none;
      height: 5rem;
      line-height: 5rem;
    }
    .mint-cell-wrapper {
      background: none;
      height: 100%;
      .label {
        font-size: 1.6rem;
        color: $font-11;
        span {
          font-size: 1.4rem;
          color: $font-99;
        }
      }
      .mint-cell-value {
        font-size: 1.6rem;
        color: $font-11;
      }
    }
  }
  .select-box {
    @include clearFix();
    padding: 0 1.2rem;
    .select-item {
      width: 16.5%;
      float: left;
      margin-bottom: 1.5rem;
      text-align: center;
      .user-img {
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
      }
      .user-name {
        margin-top: 0.8rem;
        font-size: 1.4rem;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>


