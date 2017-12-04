<template>
    <div class='pubSelect'>
        <div @click='addSelect' class='select-title-bar'>
            <mt-cell v-bind:click='addSelect' :value="num" is-link>
                <label slot="title" class='label'>
                    {{label}}
                    <span>(点击头像取消)</span>
                </label>
            </mt-cell>
        </div>
        <div class='select-box'>
            <div class='select-item' v-for="(item,index) in selectList" :key='item.id' @click='delSelect(index)'>
                <img :src="item.img" class='user-img'>
                <p class='user-name'>{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "pubSelect",
  props: ["data", "label"],
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  data() {
    return {
      selectList: [
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        },
        {
          id: "",
          name: "雷神",
          img: "http://mat1.gtimg.com/fashion/sitong/2017.10.8/4444.jpg"
        }
      ]
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
    num() {
      return this.selectList.length + "人";
    }
  },
  methods: {
    addSelect() {
      console.log("123");
      this.selectList.push({
        id: "1",
        name: "雷神",
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
    .mint-cell-wrapper {
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


