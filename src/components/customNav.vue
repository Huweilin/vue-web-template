<template>
  <div class="nav">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleNavClick"
      :collapse="isNavOpen"
      :default-active="$route.path"
      text-color="#FFF"
    >
      <div class="nav-logo">
        <span class="title" v-show="!isNavOpen">demo</span>
        <!-- <img src="../assets/img/logo.png" alt v-show="!isNavOpen" />
        <img class="min-logo" src="../assets/img/logo_min.png" alt v-show="isNavOpen" />-->
      </div>
      <template v-for="item in getMenu">
        <el-menu-item :key="item.path" v-if="!item.children || item.children.length <= 1"
          :index="'/' + item.path">
          <i class="active-icon-color" :class="item.meta.iconClass || ''"></i>
          <span slot="title">{{item.meta.name}}</span>
        </el-menu-item>
        <el-submenu :key="item.path" v-else
          :index="'/' + item.path">
          <template slot="title">
            <i class="active-icon-color" :class="item.meta.iconClass || ''"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <template v-for="child in item.children">
            <!-- <el-menu-item v-if="child.path" :key="item.path + '/' + child.path"
              :index="`/${item.path}/${child.path}`">
              <span slot="title">{{child.meta.name}}</span>
            </el-menu-item> -->
            <el-menu-item :key="item.path + '/' + child.path" v-if="child.path&&!child.children"
              :index="`/${item.path}/${child.path}`">
              <span slot="title">{{child.meta.name}}</span>
            </el-menu-item>
            <el-submenu :key="item.path + '/' + child.path" v-if="child.path&&child.children"
              :index="`/${item.path}/${child.path}`">
              <template slot="title">
                <span slot="title">{{child.meta.name}}</span>
              </template>
              <template v-for="childitem in child.children">
                <el-menu-item v-if="childitem.path" :key="item.path + '/' + childitem.path"
                  :index="`/${item.path}/${child.path}/${childitem.path}`">
                  <span slot="title">{{childitem.meta.name}}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'
import Router from '@/router'
export default {
  name: "customNav",
  props: {
    isNavOpen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    getMenu: function () {
      const router = Router.options.routes
      return router[0].children
    },
    ...mapGetters(['routerMap']),
    menuItems () {
      let items = this.routerMap[0] && this.routerMap[0].children
      return items || [];
    }
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleNavClick(key, path) {
      this.$router.push(key);
    },
  },
  
};
</script>
<style lang="less" scoped>
  @deep: ~'>>>';
.nav {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  ul {
    border: none;
  }
  .el-menu--collapse {
    height: 100%;
  }
  .nav-logo {
    width: 100%;
    height: 72px;
    font-size: 40px;
    font-family: FontName;
    font-weight: 400;
    line-height: 72px;
    color: #FFFFFF;
    opacity: 1;
    text-align: center;
    .title {
      font-size: 20px;
    }
  }
  @{deep}.el-menu-item{
    i {
      height: 16px;
      width: 16px;
      font-size: 18px;
      margin-right: 10px;
      color: #fff;
    }
    &.is-active {
      color: #fff;
      // 选中图标颜色
      .active-icon-color {
        color: rgba(0, 232, 124, 1);
      }
      // i {
      // }
    }
  }
  .el-submenu {
    &.is-active {
      @{deep}  > .el-submenu__title {
        background: #2A2C44;
      }
      // 选中图标颜色
      .active-icon-color {
        color: rgba(0, 232, 124, 1);
      }
    }
    @{deep} .el-submenu__title {
      display: flex;
      align-items: center;
      &:hover {
        background: #2A2C44;
      }
      i {
        //拥有子菜单的i
        display: flex;
        height: 16px;
        width: 16px;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        margin-right: 10px;
        color: #fff;
      }
    }
  }
  
}
.nav::-webkit-scrollbar {
  width: 0px; //  设置为0则不显示 不会影响页面宽度
}
.nav::-webkit-scrollbar-track {
  background-color: yellow;
}
.nav::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 10px;
}
.nav::-webkit-scrollbar-thumb:hover {
  background-color: red;
}
.nav::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
.el-menu-vertical-demo {
  background: linear-gradient(180deg, #343A5E 0%, #292D46 100%);
  @{deep} .el-menu {
    background: unset;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 100%;
}

.el-menu {
  .el-menu-item.is-active {
    background: #2A2C44 !important;
  }
  .el-menu-item:hover {
    background: #2A2C44 !important;
  }
  .el-menu-item:focus {
    background: unset;
  }
}
</style>