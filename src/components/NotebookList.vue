<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link v-for="(notebook,index) in notebooks" :key="index" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>
<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import {friendlyDate} from '@/helpers/util'

//window.Notebooks = Notebooks

export default {
  data() {
    return {
      notebooks: []
    }
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })

    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },

  methods: {
    onCreate() {
      this.$prompt('请输入新的笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,35}$/,
        inputErrorMessage: '标题不得为空且不得大于30个字符！'
      }).then(({value}) => {
        return Notebooks.addNoteBook({title:value})

      }).then(res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
      })

    },

    onEdit(notebook) {
      let title = ''
      this.$prompt('请输入新的笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,35}$/,
        inputValue:notebook.title,
        inputErrorMessage: '标题不得为空且不得大于30个字符！'
      }).then(({value}) => {
        title = value
        return Notebooks.updateNotebook(notebook.id, {title})
      }).then(res => {
        notebook.title = title
        this.$message.success(res.msg)
      })
    },

    onDelete(notebook) {
      this.$confirm('此操作将删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
        return Notebooks.deleteNotebook(notebook.id)
      }).then(res =>{
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message.success(res.msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
