<template>
  <div class="view">
    <div class="aside">
      <custom-nav :isNavOpen="isNavOpen"></custom-nav>
    </div>
    <div class="container">
      <div class="main">
        <div class="nav-active-box">
          <transition name="fade" mode="out-in">
            <router-view :key="$route.path"></router-view>
          </transition>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        isNavOpen: false,   //侧栏导航展开关闭
        routerList: [],
        routerPathList: []
      }
    },
    methods: {
      navSwitch(flag) {
        this.isNavOpen = flag
      },
    },
  }
</script>

<style scoped lang="less">
  .view {
    width: 100%;
    height: 100vh;
    display: flex;

    .aside {
      height: 100%;
    }

    .container {
      flex: 1;
      display: flex;
      flex-flow: column;

      .main {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        box-sizing: border-box;
        background-color: #FFF;
        width: calc(100vw - 210px); // 210 为侧边栏设置的px值

        .nav-active-list {
          display: flex;
          width: 100%;
          min-height: 36px;
          background-color: rgb(28, 31, 54);
          margin-bottom: 15px;

          .nav-list-item {
            height: 36px;
            width: 150px;
            display: flex;
            align-items: center;
            padding: 0 15px 0 25px;
            box-sizing: border-box;
            margin: 0 9px 0 9px;
            position: relative;
            cursor: pointer;
            color: #e5e5e5;
            transition: all ease .6s;
            span{
              z-index: 100;
            }
            i{
              z-index: 100;
              margin-left: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 20px;
              height: 20px;
              font-size: 16px;
              border-radius: 50%;
              cursor: pointer;
              transition: transform linear .3s;
            }
            i:hover{
              background-color: #f6532f;
              transform: rotate(180deg);
            }
          }
          .nav-list-item::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 1px;
            background-color: #4d5276;
            -webkit-transform:perspective(6px) rotateX(2deg);
            z-index: 0;
          }
          .nav-is-active{
            color: #1c1c1c;
          }
          .nav-is-active::before{
            background-color: #fabf13;
          }
        }

        .nav-active-box {
          padding: 15px 15px 15px 15px;
        }
      }

      .main::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      .main::-webkit-scrollbar-track {
        background-color: #ffffff;
      }

      .main::-webkit-scrollbar-thumb {
        background-color: #7d7d7d;
        border-radius: 10px;
      }

      .main::-webkit-scrollbar-thumb:hover {
        background-color: #4f4d4e;
      }

      .main::-webkit-scrollbar-corner {
        background-color: #FFFFFF;
      }
    }
  }

  .el-container {
    width: 100%;
    height: 100vh;

    .aside {
      height: 100%;
    }

    .el-main {
      width: 100%;
      height: 100%;
      //height: calc(100vh - 60px);
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #eee;
      padding: 15px;
    }

    .el-main::-webkit-scrollbar {
      width: 5px;
      height: 8px;
    }

    .el-main::-webkit-scrollbar-track {
      background-color: #ffffff;
    }

    .el-main::-webkit-scrollbar-thumb {
      background-color: #cacaca;
      border-radius: 10px;
    }

    .el-main::-webkit-scrollbar-thumb:hover {
      background-color: #9f9b9d;
    }

    .el-main::-webkit-scrollbar-corner {
      background-color: #FFFFFF;
    }
  }

  .fade-leave,
  .fade-enter-to {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-10px) scale(1);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease;
  }
</style>