<template>
  <div class="layout sys-card">
    <div class="info_box">
      <h2 class="sys-title">布局</h2>
      <p class="info">
        空间布局是体系化视觉设计的起点，和传统的平面设计的不同之处在于，
        UI界面的布局空间要基于动态化、体系化的角度出发。我们对网格基本单位、大小屏适配、栅格系统等提出规范化要求。
        我们这里以三种布局为例：<span style="font-weight: bold">左右布局、上下布局、T型布局</span>。
      </p>
      <div class="layout_box">
        <div class="layout_left">
          <el-aside width="200px" class="left_nav">伸缩导航菜单</el-aside>
          <el-container>
            <el-header class="left_header">头部内容</el-header>
            <el-main class="left_content_main">自动响应</el-main>
          </el-container>
        </div>
        <p style="text-align: center; color: var(--gray-color-8); margin: var(--size-5) 0">
          左右布局
        </p>
        <div class="layout_top">
          <el-container>
            <el-header class="left_header">头部内容</el-header>
            <el-main class="left_content_main">自动响应</el-main>
          </el-container>
        </div>
        <p style="text-align: center; color: var(--gray-color-8); margin: var(--size-5) 0">
          上下布局
        </p>
        <div class="layout_T">
          <el-header class="left_header">头部内容</el-header>
          <el-container>
            <el-aside width="200px" class="left_nav">伸缩导航菜单</el-aside>
            <el-main class="left_content_main">自动响应</el-main>
          </el-container>
        </div>
        <p style="text-align: center; color: var(--gray-color-8); margin-top: var(--size-5)">
          T型布局
        </p>
      </div>
    </div>
    <div class="info_box">
      <h2 class="sys-title">间隔</h2>
      <h3 class="sys-title">8点网格</h3>
      <p class="info">
        通过网格体系来实现视觉体系的秩序。我们选用网格的基数为8,不仅符合偶数的思路，同时能够匹配多数主流的显示设备。
        通过建立网格的思考方式，还能帮助设计者快速实现布局空间的设计决策同时
        也能简化设计到开发的沟通损耗。
      </p>
      <p class="info">
        在网格系统中应该更加注重的是间距，而间距要遵循网格系统(例如使用4、8、16、24、32等和8具有规律的数字)同时在产品中的各类元素也要遵循这类原则
        (例如图标大小、组件大小等)。
      </p>
      <h3 class="sys-title">常用间隔尺寸</h3>
      <div class="interval">
        <div style="height: 4px">4px</div>
        <div style="height: 8px">8px</div>
        <div style="height: 16px">16px</div>
        <div style="height: 24px">24px</div>
        <div style="height: 32px">32px</div>
      </div>
      <h3 class="sys-title">组合示例</h3>
      <p class="info">标题文字</p>
      <div class="example">
        <div
          style="height: var(--size-5); background-color: var(--sys-blue-color-8); width: 95%"
        ></div>
        间隔12px
      </div>
      <p class="info">标题文字多字行段</p>
      <div class="example">
        <div
          style="height: var(--size-4); background-color: var(--sys-blue-color-8); width: 90%"
        ></div>
        控件说明文字间隔8px
      </div>
      <p class="info" style="text-align: center">
        文字展示内容的辅助性说明文字,可能出现在底部。文字展示内容的辅助性说明文字,可能出现在底部。
      </p>
      <el-form-item label="多个标题文字">
        <el-select style="width: 200px" placeholder="多个标题文字" />
      </el-form-item>
      <div class="example">
        <div
          style="height: var(--size-normal); background-color: var(--sys-blue-color-8); width: 100%"
        ></div>
      </div>
      <el-form-item label="多个标题文字">
        <el-select style="width: 200px" placeholder="多个标题文字" />
      </el-form-item>
      <div class="example">
        <div
          style="height: var(--size-normal); background-color: var(--sys-blue-color-8); width: 100%"
        ></div>
      </div>
      <el-form-item label="多个标题文字">
        <el-select style="width: 200px" placeholder="多个标题文字" />
      </el-form-item>
      <div class="example">
        <div
          style="height: var(--size-4); background-color: var(--sys-blue-color-8); width: 90%"
        ></div>
        控件说明文字间隔8px
      </div>
      <p class="info" style="text-align: center">
        文字展示内容的辅助性说明文字,可能出现在底部。文字展示内容的辅助性说明文字,可能出现在底部。
      </p>
      <h3 class="sys-title">标题文字</h3>
      <div class="example">
        <div
          style="height: var(--size-2); background-color: var(--sys-blue-color-8); width: 90%"
        ></div>
        控件说明文字间隔4px
      </div>
      <p class="info">
        正文第一段,文字展示内容的辅助性说明文字,可能出现在底部。文字展示内容的辅助性说明文字,可能出现在底部。
      </p>
      <br />
      <div class="model flex_normal_center">模块1</div>
      <div class="example">
        <div
          style="height: var(--size-10); background-color: var(--sys-blue-color-8); width: 93%"
        ></div>
        模块间隔32px
      </div>
      <div class="model flex_normal_center">模块2</div>
      <h3 class="sys-title" style="margin-bottom: 0">标题文字</h3>
      <div class="example">
        <div
          style="height: var(--size-5); background-color: var(--sys-blue-color-8); width: 95%"
        ></div>
        间隔12px
      </div>
      <div class="model flex_normal_center"></div>
      <div class="example">
        <div
          style="height: var(--size-5); background-color: var(--sys-blue-color-8); width: 95%"
        ></div>
        间隔12px
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  .info_box {
    flex: 1;
    padding: var(--size-4);
    p.info {
      font-size: var(--size-normal);
    }
  }
  .layout_box {
    width: 100%;
    height: 180vh;
    padding: 2%;
    margin-top: var(--size-4);
    background-color: var(--gray-color-3);
    border-radius: var(--size-3);
    display: flex;
    flex-direction: column;
    .layout_left {
      height: 50%;
      display: flex;
    }
    .layout_top {
      height: 50%;
      display: flex;
    }
    .layout_T {
      height: 50%;
      display: flex;
      flex-direction: column;
    }

    .left_nav {
      width: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--size-medium);
      color: #fff;
      background-color: var(--sys-blue-color-3);
    }

    .left_header {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--size-medium);
      color: #fff;
      background-color: var(--sys-blue-color-5);
    }
    .left_content_main {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: var(--size-medium);
      background-color: #fff;
    }
  }
  .interval {
    div {
      background-color: rgba(255, 214, 216, 1);
      margin: var(--size-5) 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .example {
    display: flex;
    height: var(--size-5);
    justify-content: space-between;
    align-items: center;
  }
  .model {
    height: 100px;
    width: 90%;
    color: var(--sys-blue-dark-color-1);
    background-color: var(--gray-color-4);
  }
  :deep(.el-form-item) {
    margin: 5px 0;
  }
}
</style>
