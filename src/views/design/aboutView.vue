<template>
  <div class="about sys-card">
    <div class="info_box" style="border-bottom: 1px solid var(--gray-color-3)">
      <h1 class="sys-title">前言</h1>
      <p class="sys-info">
        为规范公司数字化、信息化系统建设风格，提供统一的系统界面设计、色彩运用及组件开发标准，保持用户视觉及交互的标准性、
        一致性、延续性，特制定本技术规范。
      </p>
    </div>
    <div class="info_box" style="border-bottom: 1px solid var(--gray-color-3)">
      <h2 class="sys-title">目的</h2>
      <p class="info">
        本文档适用于所有信息系统的UI设计规范，确保这些信息系统在界面设计/用户体验与开发过程中有统一的设计规范可循，保证视觉和交互体验的一致性和延续性。
      </p>
      <p class="info">
        规范化的设计语言，有利于统一企业形象，降低用户学习成本，
        提升用户易用度，降低开发难度并提高开发效率。
      </p>
      <p class="info">
        期望此规范能达到帮助UI设计师规范化设计与提升前端技术人员 的工作效率的目的。
      </p>
      <p class="info">
        本文档适用于所有UI设计师与前端技术人员，使用者应熟读并严格遵照本规范文档要求对系统进行UI设计工作和开发工作。文档中可能有未提及的部分，应该尽可能取相似原则进行设计与开发。
      </p>
      <p class="info">
        本文档所有示例都基于1920X1080(px), 的分辨率为基础制定，如有特殊情况会有补充说明。
      </p>
    </div>
    <div class="info_box" style="border-bottom: 1px solid var(--gray-color-3)">
      <h2 class="sys-title">设计原则</h2>
      <div class="rules_box">
        <div class="rule_item" v-for="item in rules" :key="item.title">
          <h3 class="rule_title">{{ item.title }}</h3>
          <ul>
            <li v-for="child in item.children" :key="child.title">
              <span>{{ child.title }}</span>
              <p>{{ child.content }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rules = [
  {
    title: '一致性',
    children: [
      {
        title: '操作习惯一致性',
        content: '遵循用户的现实操作习惯,保持与现实操作的流程、逻辑—致;'
      },
      {
        title: '视觉和功能一致性',
        content:
          '所有界面视觉元素和结构保持—致性,帮助用户识别UI元素并归类。功能保持—致性使产品更具可预测性,即使在第—次访问的页面/屏幕上与之交互,也能感觉到安全和舒适。'
      }
    ]
  },
  {
    title: '反馈明确',
    children: [
      {
        title: '控制反馈',
        content: '通过界面样式与交互动效,让用户清晰感知自己的操作;'
      },
      {
        title: '页面结果反馈',
        content: '操作结束后,通过页面元素的变化,清晰直观的展现当前功能状态。'
      }
    ]
  },
  {
    title: '操作效率',
    children: [
      {
        title: '简化流程',
        content: '设计简洁直观的操作流程;'
      },
      {
        title: '清晰明确',
        content: '语言表达清晰且明确,易于用户理解作出决策;'
      },
      {
        title: '用户易于识别',
        content: '界面简单直白,易于用户识别与记忆,降低用户学习难度。'
      }
    ]
  }
]
</script>

<style scoped lang="scss">
.about {
  .info_box {
    padding: var(--size-4);
    p.info {
      font-size: var(--size-normal);
    }
  }
  .rules_box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .rule_item {
      width: 30%;
      .rule_title {
        font-weight: bold;
        font-size: var(--size-7);
        margin-bottom: var(--size-4);
        color: var(--font-color-gray-1);
      }
      ul li span {
        font-weight: bold;
        font-size: var(--size-6);
        color: var(--font-color-gray-1);
      }
      ul li:not(:last-child) {
        margin-bottom: var(--size-6);
      }
    }
  }
}
</style>
