<template>
  <div>
    <el-card class="container">
      <template #header>
        <div class="card-header">
          <span>实名信息</span>
        </div>
      </template>

      <section class="tip">
        <el-icon><InfoFilled /></el-icon>
        <p class="text">
          完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
        </p>
      </section>

      <!-- 根据是否进行过实名认证来展示不同的组件 -->
      <div class="info" v-if="userInfo.authStatus == 1">
        <el-descriptions class="margin-top" :column="1" border>
          <el-descriptions-item width="10px">
            <template #label>
              <div class="cell-item">用户姓名</div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">证件类型</div>
            </template>
            {{ userInfo.certificatesType == "10" ? "身份证" : "户口本" }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">证件号码</div>
            </template>
            {{ userInfo?.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="noinfo" v-else>
        <el-form label-width="80" :model="params" :rules="rules" ref="form">
          <el-form-item label="用户姓名" prop="name">
            <el-input
              placeholder="请输入用户姓名"
              v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select
              placeholder="请选择证件类型"
              v-model="params.certificatesType">
              <el-option
                :label="item.name"
                :value="item.value"
                v-for="(item, index) in arrType"
                :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input
              placeholder="请输入证件号码"
              v-model="params.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="上传证件" prop="certificatesUrl">
            <el-upload
              ref="upload"
              limit="1"
              action="/api/oss/file/fileUpload?fileHost=userAuah"
              list-type="picture-card"
              :on-exceed="exceedhandler"
              :on-success="successhandler"
              :on-preview="previewhandler"
              :on-remove="removehandler">
              <img
                src="../../../assets/auth_example.jpg"
                alt="图片实例"
                width="100%"
                height="100%" />
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img
                w-full
                alt="Preview Image"
                :src="params.certificatesUrl"
                style="height: 100%; width: 100%" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="submit"
              >提交</el-button
            >
            <el-button type="default" @click="reset">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  getRealName();
  getAuthMethod();
});

// 表单校验
const validatorName = (value: any, callBack: any) => {
  let reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  let regTwo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(value) || regTwo.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的名字"));
  }
};
const validatorType = (value: any, callBack: any) => {
  if (value == "10" || value == "20") {
    callBack();
  } else {
    callBack(new Error("请选择证件的类型"));
  }
};
const validatorNo = (value: any, callBack: any) => {
  let sfz =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let hkb = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (sfz.test(value) || hkb.test(value)) {
    callBack();
  } else {
    callBack(callBack(new Error("请输入正确的证件号码")));
  }
};
const validatorUrl = (value: any, callBack: any) => {
  if (value.length) {
    callBack();
  } else {
    callBack(new Error("请上传正确的证件照片"));
  }
};
const rules = {
  name: [{ required: true, validator: validatorName }],
  certificatesType: [{ required: true, validator: validatorType }],
  certificatesNo: [{ required: true, validator: validatorNo }],
  certificatesUrl: [{ required: true, validator: validatorUrl }],
};

// 向后台获取用户的实名认证信息
import { ref, reactive } from "vue";
import { checkRealName } from "../../../api/user/index";
import {
  CheckRealNameResData,
  RealNameData,
  UserParams,
} from "../../../api/user/type";
let userInfo = ref<RealNameData>({} as RealNameData);
const getRealName = async () => {
  let result: CheckRealNameResData = await checkRealName();
  if (result.code == 200) {
    userInfo.value = result.data;
  } else {
    alert("无法获取用户相关信息！");
  }
};

// 向后台获取证件类型信息
import { reqAuthMethod } from "../../../api/auth/index";
import { authMethodResData, authMethodData } from "../../../api/auth/type";
import { ElMessage } from "element-plus";
let arrType = ref<authMethodData>([]);
const getAuthMethod = async () => {
  let result: authMethodResData = await reqAuthMethod("CertificatesType");
  if (result.code == 200) {
    arrType.value = result.data;
  } else {
    alert("获取证件信息出错！");
  }
};

//用户提交信息，进行实名认证
let params = reactive<UserParams>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});

// 用户上传图片超量的提示
const exceedhandler = () => {
  ElMessage({
    type: "error",
    message: "只能上传一张图片",
  });
};

// 图片上传成功,存储服务器返回的数据
const successhandler = (response: any) => {
  params.certificatesUrl = response.data;
  // 图片上传成功，清除校验信息
  form.value.clearValidate("certificatesUrl");
};

// 点击放大按钮预览图片
let dialogVisible = ref<boolean>(false);
const previewhandler = () => {
  dialogVisible.value = true;
};

// 删除图片时，把收集到的数据删除
const removehandler = () => {
  params.certificatesUrl = "";
};

// 点击清空按钮，清除数据
let upload = ref();
const reset = () => {
  params.certificatesNo = "";
  params.name = "";
  params.certificatesType = "";
  params.certificatesUrl = "";
  upload.value.clearFiles();
};

// 点击提交按钮
import { reqConductAuthen } from "../../../api/auth/index";
let form = ref();
const submit = async () => {
  await form.value.validate();
  try {
    await reqConductAuthen(params);
    ElMessage({
      type: "success",
      message: "认证成功！",
    });
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败！",
    });
  }
  getRealName();
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 20px;
  margin-left: 20px;
  .card-header {
    margin: 10px 0;
  }

  .tip {
    color: #7f7f7f;
    display: flex;
    justify-content: center;
    font-size: small;
  }

  .info {
    .margin-top {
      margin-top: 20px;
    }
  }

  .noinfo {
    width: 50%;
    margin: 20px auto;
  }
}
</style>
