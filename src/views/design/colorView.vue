<template>
  <div class="color sys-card">
    <div class="info_box">
      <h2 class="sys-title">Color 色彩</h2>
      <p class="info">色彩在产品中起到传递信息、创建层级、表达情感、构建一致性的目的。</p>
    </div>
    <div class="info_box">
      <h3 class="sys-title">主色</h3>
      <p class="info">
        核心色彩是任一产品中最为显著且频繁应用的色调，它不仅用于凸显关键信息、指引用户行为流程，还深刻影响着产品的整体氛围与视觉风格。
        在我们的UI框架中，我们采用了标志性的创新蓝作为默认主题色彩，这一选择不仅映射出创新进取、互联互通的品牌精神与生态愿景，其平衡而内敛的特性，也使得它在多种后台管理系统的设计中展现出极高的适用性和和谐感。
      </p>
      <div class="brand">
        <div>Brand Color</div>
        <div>
          <div>rgba(39, 93, 233, 1)</div>
          <div>#275de9</div>
        </div>
      </div>
    </div>
    <div class="info_box">
      <h3 class="sys-title">基础调色板</h3>
      <p class="info">
        基础色板共计54个阶梯颜色，包含系统4套主色以及辅助色。这些颜色基本可以满足常用系统设计中对于颜色的需求。
      </p>
      <div class="color-features">
        <div class="color-features-box">
          <div class="color-features-lists" v-for="item in layout.colorFeatures" :key="item.name">
            <div class="color-features-lists-name">{{ item.name }}</div>
            <div
              class="color-features-list"
              v-for="(color, index) in item.colorList"
              :key="color"
              :style="{
                backgroundColor: color,
                color:
                  index === item.colorList.length - 1 || index === item.colorList.length - 2
                    ? `var(--gray-color-7)`
                    : '#FFF'
              }"
            >
              {{ color }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store'

const layout = useLayoutStore()
</script>

<style scoped lang="scss">
.color {
  width: 100%;
  height: 100%;
  .info_box {
    padding: var(--size-4);
  }
  .brand {
    background-color: var(--sys-blue-color-1);
    border-radius: var(--size-3);
    display: flex;
    flex-flow: column;
    height: 200px;
    justify-content: space-between;
    margin: var(--size-6);
    padding: var(--padding-LR-5) var(--padding-LR-6);
    color: #fff;
    font-size: var(--size-6);
  }
  .color-features {
    display: flex;
    justify-content: center;
    .color-features-box {
      width: 90%;
      display: flex;
      justify-content: space-between;
      .color-features-lists {
        width: 15%;
        .color-features-lists-name {
          text-align: center;
          font-size: var(--size-6);
          color: var(--font-color-gray-1);
          margin-bottom: var(--size-3);
        }
        .color-features-list {
          height: var(--size-11);
          display: flex;
          align-items: center;
          padding-left: var(--size-6);
        }
      }
    }
  }
}
</style>
