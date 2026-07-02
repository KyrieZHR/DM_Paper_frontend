<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import request from '@/api/request'
import { getCompanyInfo } from '@/api/content'

const form = reactive({
  name: '', phone: '', email: '', company: '', message: '',
})
const contact = ref({
  address: '河南省新密市大隗镇黄湾寨开发区',
  phone: '400-888-6789',
  email: 'info@hengyuanpaper.com',
  fax: '0596-8888888',
  postcode: '363100',
})

onMounted(async () => {
  try {
    const res = await getCompanyInfo() as any
    if (res?.data?.contact) contact.value = res.data.contact
  } catch {}
})

async function handleSubmit() {
  if (!form.name || !form.phone || !form.email || !form.message) {
    ElMessage.warning('请填写完整信息')
    return
  }
  try {
    await request.post('/contact', form)
    ElMessage.success('提交成功，我们会尽快联系您')
    form.name = ''; form.phone = ''; form.email = ''; form.company = ''; form.message = ''
  } catch {}
}
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>联系我们</h1>
        <p>期待与您的合作</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="contact-grid">
          <div class="info-col scroll-reveal">
            <h3>联系方式</h3>
            <div class="info-item">
              <span class="label">地址</span>
              <span>{{ contact.address }}</span>
            </div>
            <div class="info-item">
              <span class="label">电话</span>
              <span>{{ contact.phone }}</span>
            </div>
            <div class="info-item">
              <span class="label">邮箱</span>
              <span>{{ contact.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">传真</span>
              <span>{{ contact.fax }}</span>
            </div>
            <div class="info-item">
              <span class="label">邮编</span>
              <span>{{ contact.postcode }}</span>
            </div>
          </div>

          <div class="form-col scroll-reveal">
            <h3>在线留言</h3>
            <el-form :model="form" label-position="top">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入您的姓名" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话">
                    <el-input v-model="form.phone" placeholder="请输入您的电话" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="请输入您的邮箱" />
              </el-form-item>
              <el-form-item label="公司名称">
                <el-input v-model="form.company" placeholder="请输入您的公司名称（选填）" />
              </el-form-item>
              <el-form-item label="留言内容">
                <el-input v-model="form.message" type="textarea" :rows="4" placeholder="请输入您的留言内容" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="large" @click="handleSubmit">提交留言</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.sub-banner {
  position: relative; height: 300px; display: flex;
  align-items: center; justify-content: center;
  background: @color-dark; overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(fade(#334155, 10%) 1px, transparent 1px),
      linear-gradient(90deg, fade(#334155, 10%) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at center, fade(@color-primary, 8%) 0%, transparent 70%); }
  .content { position: relative; z-index: 1; text-align: center;
    h1 { font-size: @font-size-3xl; font-weight: 800; letter-spacing: -0.02em; color: @color-white; margin-bottom: @spacing-sm; }
    p { font-size: @font-size-lg; color: @color-muted; }
  }
}

.contact-grid {
  display: grid; gap: @spacing-2xl;
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: 1fr 1fr; }
}

.info-col {
  h3 { font-size: @font-size-xl; margin-bottom: @spacing-lg; color: @color-primary; }
  .info-item {
    display: flex; gap: @spacing-lg; margin-bottom: @spacing-md; padding: @spacing-sm 0;
    border-bottom: 1px solid @color-border; font-size: @font-size-base;
    .label { color: @color-primary; font-weight: bold; min-width: 50px; }
  }
}

.form-col {
  h3 { font-size: @font-size-xl; margin-bottom: @spacing-lg; color: @color-primary; }
}
</style>
