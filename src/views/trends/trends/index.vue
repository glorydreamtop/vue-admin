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
      :data="trendsList"
      width="100%"
    >
      <el-table-column label="文本" align="center" prop="content">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="全文"
            width="200"
            trigger="hover"
            :content="scope.row.content"
          >
            <span slot="reference">{{ `${scope.row.content.substring(0,10)}...` }}</span>
          </el-popover>

        </template>
      </el-table-column>
      <!-- <el-table-column label="手机号码" prop="phone" align="center" /> -->
      <el-table-column
        label="评论数"
        prop="comment"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column
        label="点赞数"
        prop="like"
        :show-overflow-tooltip="true"
        width="150"
        align="center"
      />
      <el-table-column label="创建时间" align="center" prop="create_time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
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
import { listTrends, delTrends } from '@/api/trends'

export default {
  name: 'Trends',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 表格数据
      trendsList: [],
      // 查询参数
      queryParams: {
        user_id: undefined
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
      if (this.queryParams.user_id === '') {
        this.queryParams.user_id = undefined
      }
      listTrends(this.queryParams).then((response) => {
        this.trendsList = response.data
        this.loading = false
      })
    },
    handleDelete(row) {
      this.loading = true
      delTrends({ trends_id: row.trends_id }).then((res) => {
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
