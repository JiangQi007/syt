<template>
  <section class="user">
    <el-card class="userinfo">
      <!-- header -->
      <template #header>
        <div class="card-header">
          <span>点击选择就诊人</span>
          <el-button type="success" @click="addUser">添加就诊人</el-button>
        </div>
      </template>

      <!-- body -->
      <main class="visitor" v-if="scene == 0">
        <Visitor
          v-for="(item, index) in patientInfo"
          :key="item.id"
          class="item"
          :item="item"
          :style="{ backgroundColor: index == choose ? '#e6f7ff' : '#fff' }"
          @click="changeChoice(index)"
          @removePatient="removePatient"
          @changeScene="changeScene"></Visitor>
      </main>

      <!-- 添加就诊人板块 -->
      <main class="form" v-if="scene == 1">
        <!-- 就诊人信息 -->
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form style="width: 50%; margin: 10px auto">
          <el-form-item label="就诊人姓名">
            <el-input
              placeholder="请输入姓名"
              v-model="patientNew.name"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select
              placeholder="请选择证件类型"
              v-model="patientNew.certificatesType">
              <el-option
                v-for="item in CertificatesTypeArr"
                :key="item.id"
                :value="item.value"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              placeholder="请输入证件号码"
              v-model="patientNew.certificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="patientNew.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="patientNew.birthdate"
              type="datetime"
              placeholder="请选择出生日期"
              value-format="YYYY-MM-DD HH:mm:ss.SSS" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              placeholder="请输入手机号码"
              v-model="patientNew.phone"></el-input>
          </el-form-item>
        </el-form>

        <!-- 建档信息 -->
        <el-divider content-position="left">建档信息</el-divider>
        <el-form style="width: 50%; margin: 10px auto">
          <el-form-item label="婚姻情况">
            <el-radio-group v-model="patientNew.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保">
            <el-radio-group v-model="patientNew.isInsure">
              <el-radio :label="1">自费</el-radio>
              <el-radio :label="0">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前住址">
            <el-cascader v-model="patientNew.addressSelected" :props="props" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
              placeholder="请输入详细地址"
              v-model="patientNew.address"></el-input>
          </el-form-item>
        </el-form>

        <!-- 联系人信息 -->
        <el-divider content-position="left">联系人信息</el-divider>
        <el-form style="width: 50%; margin: 10px auto">
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请输入姓名"
              v-model="patientNew.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select
              placeholder="请选择证件类型"
              v-model="patientNew.contactsCertificatesType">
              <el-option
                v-for="item in CertificatesTypeArr"
                :key="item.id"
                :value="item.value"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              placeholder="请输入证件号码"
              v-model="patientNew.contactsCertificatesNo"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              placeholder="请输入手机号码"
              v-model="patientNew.contactsPhone"></el-input>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" size="default" @click="changePatient"
              >提交</el-button
            >
            <el-button type="default" size="default" @click="reset"
              >重写</el-button
            >
          </el-form-item>
        </el-form>
      </main>
    </el-card>
  </section>
</template>

<script setup lang="ts">
// 子组件删除信息后，父组件需要重新获取数据来刷新页面
const removePatient = () => {
  fetchPatientInfo();
};

// 当路径中带有type=add则跳转到添加界面
import { useRoute, useRouter } from "vue-router";
let $router = useRouter();
let $route = useRoute();

// 显示已有的就诊人的信息
import { watch } from "vue";
import Visitor from "../../hospital/register/visitor.vue";
import { reactive, ref } from "vue";
import { reqGetPatient } from "../../../api/patient/index";
import { PatientInfoResData, PatientInfoArr } from "../../../api/patient/type";
import { onMounted } from "vue";
let patientInfo = ref<PatientInfoArr>([]);
onMounted(async () => {
  fetchPatientInfo();
  getCertificatesType();

  if ($route.query.type == "add") {
    scene.value = 1;
  }

  if ($route.query.type == "edit") {
    scene.value = 1;
  }
});
const fetchPatientInfo = async () => {
  let resule: PatientInfoResData = await reqGetPatient();
  if (resule.code == 200) {
    patientInfo.value = resule.data;
  }
};

// 选择就诊人
let choose = ref<number>(0);
const changeChoice = (index: number) => {
  choose.value = index;
};

// 选择显示修改界面还是展示界面
let scene = ref<number>(0);

// 添加就诊人页面的展示
const addUser = () => {
  scene.value = 1;
  // 清空上一次数据
  reset();
};
const reset = () => {
  Object.assign(patientNew, {
    id: null,
    address: "",
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: ["0", "0", "0"],
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
    districtCode: addressSelected.value[2],
    provinceCode: addressSelected.value[0],
    cityCode: addressSelected.value[1],
  });
};

// 修改就诊人,子组件自定义事件的回调
const changeScene = (item: addInfo) => {
  scene.value = 1;
  Object.assign(patientNew, item);
};

// 添加就诊人时先获取系统支持的证件类型
import { reqAuthMethod } from "../../../api/auth/index";
import { authMethodData, authMethodResData } from "../../../api/auth/type";
let CertificatesTypeArr = ref<authMethodData>([]);
const getCertificatesType = async () => {
  let result: authMethodResData = await reqAuthMethod("CertificatesType");
  if (result.code == 200) {
    CertificatesTypeArr.value = result.data;
  }
};

// 获取选择器中的地区信息
import { ElMessage, type CascaderProps } from "element-plus";
import { reqDistrict } from "../../../api/district/index";
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    let result = await reqDistrict((node.data?.id as string) || "86");
    // 将原始数据进行处理，注入到级联选择器中
    let showData = result.data.map(
      (item: {
        name: string;
        value: string;
        hasChildren: boolean;
        id: string;
      }) => {
        return {
          id: item.id,
          label: item.name,
          value: item.value,
          leaf: !item.hasChildren,
        };
      }
    );
    resolve(showData);
  },
};

// 收集表单的信息进行提交
import { addInfo } from "../../../api/patient/type";
import { reqChangePatient } from "../../../api/patient/index";
type StringArray = string[];
let addressSelected = ref<StringArray>([]);
let patientNew = reactive<addInfo>({
  address: "",
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: ["0", "0", "0"],
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
  districtCode: addressSelected.value[2],
  provinceCode: addressSelected.value[0],
  cityCode: addressSelected.value[1],
});
const changePatient = async () => {
  try {
    await reqChangePatient(patientNew);
    ElMessage({
      type: "success",
      message: patientNew.id ? "更新就诊人成功！" : "添加就诊人成功！",
    });

    // 如果是从挂号界面而来；如果是从就诊人管理页面来
    if ($route.query.type) {
      $router.back();
    } else {
      scene.value = 0;
    }

    fetchPatientInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: patientNew.id ? "更新就诊人失败！" : "添加就诊人失败！",
    });
  }
};

// 监听全部就诊人的数据,如果是预约挂号的路径，则需要比对用户id拿到用户信息；
// 然后再将信息保存，传给子组件
watch(
  () => patientInfo.value,
  () => {
    if ($route.query.type == "edit") {
      let patient = patientInfo.value.find((item: any) => {
        return item.id == $route.query.id;
      });
      Object.assign(patientNew, patient);
    }
  }
);
</script>

<style scoped lang="scss">
.user {
  margin: 30px 30px;
  .userinfo {
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: large;
        font-weight: 500;
      }
    }

    .visitor {
      display: flex;
      flex-wrap: wrap;
      .item {
        flex: 0 0 31%;
        margin: 10px 10px;
      }
    }
  }
}
</style>
