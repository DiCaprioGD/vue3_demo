<template>
  <div class="font sys-card">
    <div class="info_box">
      <h2 class="sys-title">Font 字体</h2>
      <p class="info">字体设计秉承易用、易忆及悦目的理念，赋予文字以秩序与和谐之美。</p>
    </div>
    <div class="info_box">
      <h3 class="sys-title">概述</h3>
      <p class="info">
        网页文字与界面元素深度融合，共同构筑了一个供用户交互操作的产品生态系统。在这个系统中，用户不仅进行阅读，还需与界面进行多种互动。因此，在网页设计的范畴内，文字系统的规划对提升产品可用性起着至关重要的作用。
        NariDesign秉持开放、多元、迭代与互联的核心价值观，这些价值观将指导我们设计既“实用”又“易记”，同时兼具“美感”的文字系统。
      </p>
    </div>
    <div class="info_box">
      <h3 class="sys-title">字体</h3>
      <p class="info">
        字体家族优先使用系统默认的字体。对于不同环境显示条件,则提供了—套满足易读性的备用字体。
      </p>
      <div class="fontFamily">
        <div class="font_item">
          <div class="item" v-for="item in fontFamily.zh" :key="item">
            {{ item }}
          </div>
        </div>
        <div class="font_item">
          <div class="item" v-for="item in fontFamily.en" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="info_box">
      <h3 class="sys-title">字号</h3>
      <p class="info" style="text-align: center">
        <img src="@/assets/images/design/font/font_size.jpg" style="width: 50%" alt="" />
      </p>
      <div class="info">
        我们基于电脑显示器阅读距离(50cm)以及最佳阅读角度(0.3),选择采用14号作为标准的正文字,以保证在各主流显示器上用户阅读效率最佳。
      </div>
      <div class="fontSize">
        <div class="fontSizeItem" v-for="item in fontFamily.fontSize" :key="item.title">
          <div class="font_size_item_title">{{ item.title }}</div>
          <div
            class="font_size_item_font_weight"
            :style="{
              fontSize: item.fontSize,
              fontWeight: item.fontWeight
            }"
          >
            {{ item.fontWeight }} {{ item.fontSize }}
          </div>
          <div
            class="font_size_item_font_example"
            :style="{
              fontSize: item.fontSize,
              fontWeight: item.fontWeight
            }"
          >
            深圳南瑞
          </div>
          <div
            class="font_size_item_font_en_example"
            :style="{
              fontSize: item.fontSize,
              fontWeight: item.fontWeight
            }"
          >
            English 123456
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const fontFamily = {
  zh: ['中文', '微软雅黑', '黑体', '冬青黑体', '苹方'],
  en: ['英文', 'Helvetica Neue', 'Helvetica', 'Arial', 'Ping Fang SC'],
  fontSize: [
    {
      title: '超大标题 / H1',
      fontWeight: 'Bold',
      fontSize: '38px'
    },
    {
      title: '页面标题 / H2',
      fontWeight: 'Bold',
      fontSize: '30px'
    },
    {
      title: '中标题 / H3',
      fontWeight: 'Bold',
      fontSize: '24px'
    },
    {
      title: '模块标题',
      fontWeight: 'Bold',
      fontSize: '20px'
    },
    {
      title: '小标题',
      fontWeight: 'Bold',
      fontSize: '16px'
    },
    {
      title: '正文 / 默认',
      fontWeight: 'Regular',
      fontSize: '14px'
    },
    {
      title: '说明文 / 标签 / 备注提示',
      fontWeight: 'light',
      fontSize: '12px'
    }
  ]
}
</script>

<style scoped lang="scss">
.font {
  width: 100%;
  height: 100%;
  .info_box {
    padding: var(--size-4);
  }
  .fontFamily {
    width: 40%;
    height: 80px;
    margin-top: var(--size-5);
    padding-left: var(--padding-LR-3);
    display: flex;
    flex-direction: column;
    background-color: var(--gray-color-1);
    .font_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50%;
      .item {
        width: 20%;
      }
    }
    .font_item:first-child {
      border-bottom: 2px solid #fff;
    }
  }
  .fontSize {
    width: 70%;
    .fontSizeItem {
      display: flex;
      height: 60px;
      justify-content: space-between;
      align-items: flex-start;
      color: var(--font-color-gray-1);
      .font_size_item_title {
        display: flex;
        align-items: flex-start;
      }
      div {
        height: 100%;
        width: 30%;
      }
      div.font_size_item_font_en_example {
        width: 35%;
      }
    }
    .fontSizeItem:nth-child(1) .font_size_item_title,
    .fontSizeItem:nth-child(2) .font_size_item_title {
      padding-top: 15px;
    }
  }
}
</style>
