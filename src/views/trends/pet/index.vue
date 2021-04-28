<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true">
      <el-form-item label="标题" prop="role_name">
        <el-input
          v-model="queryParams.user_name"
          placeholder="请输入标题"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-permission="['system:user:query']"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索</el-button>
        <el-button
          icon="el-icon-refresh"
          size="mini"
          @click="resetQuery"
        >重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="petsList"
      width="100%"
    >
      <el-table-column label="宠物名字" align="center" prop="pet_name" />
      <!-- <el-table-column label="手机号码" prop="phone" align="center" /> -->
      <el-table-column
        label="性别"
        prop="sex"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sex===0?'母':'公' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center" prop="age">
        <template slot-scope="scope">
          <span>{{ scope.row.age }} 岁</span>
        </template>
      </el-table-column>
      <el-table-column
        label="主人名字"
        prop="owner"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="['system:user:del']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listComment, delComment } from '@/api/pet'

export default {
  name: 'Pet',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 表格数据
      petsList: [],
      // 查询参数
      queryParams: {
        comment_id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询动态列表 */
    getList() {
      this.loading = true
      if (this.queryParams.comment_id === '') {
        this.queryParams.comment_id = undefined
      }
      listComment(this.queryParams).then((response) => {
        console.log(response.data)
        this.petsList = response.data.map(item => {
          item.owner = item.user.user_name
          return item
        })
        this.loading = false
      })
    },
    handleDelete(row) {
      this.loading = true
      delComment({ pet_id: row.pet_id }).then((res) => {
        this.msgSuccess('删除成功')
        this.getList()
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-select--default {
  width: 100%;
}
</style>
