<template>
  <div class="div-loading">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- 伪元素动画 -->
    <!-- <div class="wrapper">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>-->
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.div-loading {
  .loading {
    width: 70px;
    height: 200px;
    margin: auto;
    display: flex;
    span {
      display: inline-block;
      width: 8px;
      height: 40px;
      border-radius: 4px;
      background: #91d5ff;
      margin: auto;
      -webkit-animation: load 1s ease infinite;
      }
      span:nth-child(2) {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }
      span:nth-child(3) {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
      span:nth-child(4) {
        -webkit-animation-delay: 0.6s;
      }
      span:nth-child(5) {
        -webkit-animation-delay: 0.8s;
    }
  }
  @-webkit-keyframes load {
    0%,
    100% {
      height: 40px;
      background: #91d5ff;
    }
    50% {
      height: 80px;
      background: #40a9ff;
    }
  }

  //   通过伪元素完成动画
    // .wrapper {
    //   span {
    //     display: inline-block;
    //     position: relative;
    //     margin-left: 10px;
    //     height: 40px;
    //   }
  //     span::before {
  //       content: "";
  //       display: inline-block;
  //       width: 8px;
  //       height: 40px;
  //       border-radius: 4px;
  //       background: #91d5ff;
  //       position: absolute;
  //       left: 0;
  //       top: 50%;
  //       -webkit-animation: load1 1s ease infinite;
  //     }
  //     span:nth-child(1):before {
  //       -webkit-animation-delay: 0.2s;
  //     }
  //     span:nth-child(2):before {
  //       -webkit-animation-delay: 0.4s;
  //     }
  //     span:nth-child(3):before {
  //       -webkit-animation-delay: 0.6s;
  //     }
  //     span:nth-child(4):before {
  //       -webkit-animation-delay: 0.8s;
  //     }
  //     @-webkit-keyframes load1 {
  //       0%,
  //       100% {
  //         height: 40px;
  //         background: #91d5ff;
  //         top: 50%;
  //       }
  //       50% {
  //         height: 80px;
  //         top: 0;
  //         background: #40a9ff;
  //       }
  //     }
  //   }
}
</style>