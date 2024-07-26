<template>
  <div>
    <main-nav title="举报" back />
    <n-scrollbar style="max-height: 80vh">
      <h2 style="margin-left: 10px;">请选择举报原因</h2>
      <div style="padding: 0 30px">
        <report-reason
            title="违法违规言论"
            :reasons="Reasons1"
            :modelValue="value"
            @update:modelValue="updateValue"
        />
        <report-reason
            title="侵犯个人权益"
            :reasons="Reasons2"
            @update:modelValue="updateValue"
            :modelValue="value"
        />
        <report-reason
            title="平台违规交易"
            :reasons="Reasons3"
            :modelValue="value"
            @update:modelValue="updateValue"
        />
        <report-reason
            title="垃圾广告类"
            :reasons="Reasons4"
            :modelValue="value"
            @update:modelValue="updateValue"
        />
        <report-reason
            title="内容质量类"
            :reasons="Reasons5"
            :modelValue="value"
            @update:modelValue="updateValue"
        />
        <report-reason
            title="其他"
            :reasons="Reasons6"
            :modelValue="value"
            @update:modelValue="updateValue"
        />
      </div>
      <h3>具体原因(选填)</h3>
      <n-input
          type="textarea"
          placeholder="请输入举报原因"
          :autosize="{ minRows: 3, maxRows: 10 }"
          v-model:value="reason"
      />
    </n-scrollbar>
    <n-flex justify="center" style="margin-top: 30px;">
      <n-button type="error" @click="report">确认举报</n-button>
    </n-flex>

  </div>
</template>

<script setup lang="ts">
import MainNav from "@/components/main-nav.vue";
import { ref } from "vue";
import ReportReason from "@/components/report-reason.vue";
import {useDialog} from "naive-ui";
import {deleteFriend} from "@/api/user";
import {reportPost} from "@/api/post";
import {useRoute} from "vue-router";

const route = useRoute()
const dialog = useDialog();
const value = ref(0);
const reason = ref('');
const Reasons1 = [
  {
    value: 1,
    label: '涉及政治、宗教、色情、暴力、恐怖主义等违反国家法律法规的内容。',
  },
  {
    value: 2,
    label: '发布虚假信息、造谣传谣，误导其他用户或造成不良影响。',
  },
  {
    value: 3,
    label: '发布不良信息，有损学校形象。',
  }
];

const Reasons2 = [
  {
    value: 4,
    label: '泄露他人隐私。',
  },
  {
    value: 5,
    label: '侵犯了他人的著作权、商标权、专利权等知识产权。',
  },
  {
    value: 6,
    label: '发布侮辱、谩骂、攻击他人或地域歧视等言语，对他人进行人身攻击。',
  }
];

const Reasons3 = [
  {
    value: 7,
    label: '交易物品不实。',
  },
  {
    value: 8,
    label: '交易存在欺诈行为。',
  }
];

const Reasons4 = [
  {
    value: 9,
    label: '帖子中包含大量广告、推销信息，影响用户体验和论坛的整洁度。',
  },
  {
    value: 10,
    label: '帖子内容无意义、重复发布或含有大量乱码、无关链接等垃圾信息。',
  }
];

const Reasons5 = [
  {
    value: 11,
    label: '帖子内容不完整、表述不清，缺乏实质性信息或价值。',
  },
  {
    value: 12,
    label: '帖子内容低俗、无聊、恶意炒作等，不符合论坛的定位和氛围。',
  }
];


const Reasons6 = [
  {
    value: 13,
    label: '帖子内容与论坛主题无关，偏离了论坛的讨论范围。',
  },
  {
    value: 14,
    label: '帖子中存在其他违反论坛规定或社会公德的行为。',
  },
  {
    value: 15,
    label: '其他不良行为。',
  }
];

const updateValue = (newValue: number) => {
  value.value = newValue;
};

const report = () => {
  if(value.value === 0){
    window.$message.error('请选择举报原因');
    return;
  }
  dialog.warning({
    title: '确认举报',
    content: '举报的帖子将被审查, 请确认是否举报？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      reportPost({
        tweet_id: route.query.tweet_id,
        comment_id: route.query.comment_id,
        reply_id: route.query.reply_id,
        type: value.value,
        content: reason.value,
      }).then((res) => {
        window.$message.success('举报成功');
      })
          .catch((_err) => {
            window.$message.error('举报失败,请重试');
          });
    },
  });
}
</script>

<style scoped lang="less">
</style>
