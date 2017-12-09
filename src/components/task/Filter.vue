<template>
  <div class="taskFilter">
    <mt-button @click='showList(index)' :class="[item.isOpen ?'isOpen':'','filter-btns']" v-for="(item,index) in data" :key="item.id">{{item.showValue}}
      <i class="oa-icon filter-down"></i>
    </mt-button>
    <div class='filterList-box' v-show="isShowList">
      <mt-button @click="select(0,index)" :class="[listItem.isSelect?'select':'','filter-list-item']" v-show="data[0].isOpen" v-for="(listItem,index) in data[0].list" :key="listItem.value">
        <span>{{listItem.label}}</span>
      </mt-button>
      <mt-button @click="select(1,index)" :class="[listItem.isSelect?'select':'','filter-list-item']" v-show="data[1].isOpen" v-for="(listItem,index) in data[1].list" :key="listItem.value">
        <span>{{listItem.label}}</span>
      </mt-button>
    </div>
  </div>
</template>


<script>
export default {
  name: "taskFilter",
  data() {
    return {
      data: [
        {
          id: 0,
          showValue: "截止时间",
          value: 0,
          isOpen: false,
          list: [
            { label: "全部", value: 0, isSelect: true },
            { label: "当天内", value: 1, isSelect: false },
            { label: "三天内", value: 3, isSelect: false }
          ]
        },
        {
          id: 1,
          showValue: "紧急程度",
          isOpen: false,
          value: 0,
          list: [
            { label: "全部", value: 0, isSelect: true },
            { label: "不重要且不紧急", value: 1, isSelect: false },
            { label: "重要但不紧急", value: 2, isSelect: false },
            { label: "紧急但不重要", value: 3, isSelect: false },
            { label: "重要且紧急", value: 4, isSelect: false }
          ]
        }
      ],
      isShowList: false
    };
  },
  model: {
    props: "returnData",
    event: "returnDataFunc"
  },
  methods: {
    showList(index) {
      if (this.isShowList) {
        if (index == 0) {
          if (this.data[0].isOpen == true) {
            this.data[0].isOpen = false;
            this.isShowList = false;
          } else {
            this.data[1].isOpen = false;
            this.data[0].isOpen = true;
          }
        } else {
          if (this.data[1].isOpen == true) {
            this.data[1].isOpen = false;
            this.isShowList = false;
          } else {
            this.data[0].isOpen = false;
            this.data[1].isOpen = true;
          }
        }
      } else {
        this.isShowList = true;
        this.data[index].isOpen = true;
      }
    },
    select(type, index) {
      this.data[type].isOpen = false;
      if (this.data[type].list[index].isSelect) {
        return;
      }
      let list = this.data[type];
      list.list.forEach(item => {
        item.isSelect = false;
      });
      this.data[type].list[index].isSelect = true;
      this.data[type].showValue = this.data[type].list[index].label;
      this.data[type].value = this.data[type].list[index].value;
      this.postData();
    },
    postData() {
      let returnData = {};
      if (this.data[0].value == 0) {
        returnData.deadline = "";
      } else {
        returnData.deadline = this.data[0].value;
      }

      if (this.data[1].value == 0) {
        returnData.level = "";
      } else {
        returnData.level = this.data[1].value;
      }
      this.$emit("returnDataFunc", returnData);
    }
  }
};
</script>


<style lang="scss">
.taskFilter {
  .filter-btns {
    background: $bg-white;
    height: 4rem;
    width: 50%;
    line-height: 4rem;
    font-size: 1.5rem;
    color: $font-99;
    &.isOpen {
      color: $secondary;
      i {
        display: inline-block;
        transform: rotate(-180deg);
      }
    }
  }
  .filterList-box {
    background: $bg-white;
    // position: absolute;
    .filter-list-item {
      width: 100%;
      text-align: left;
      height: 4.4rem;
      line-height: 4.4rem;
      padding-left: 4.4rem;
      font-size: 1.3rem;
      color: $font-99;
      &.select {
        span {
          position: relative;
          color: $secondary;
          &::before {
            font-family: "oa-icon";
            display: block;
            position: absolute;
            content: "\e66c";
            right: calc(-1.5rem - 2.3rem);
            height: 1.1rem;
            width: 1.1rem;
          }
        }
      }
    }
  }
}
</style>



