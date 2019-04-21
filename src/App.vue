<template>
    <div id="app">
        <el-input @keyup.enter.native="addTo()" placeholder="请输入内容" style="width: 500px;" v-model="input"></el-input>
        <el-table
            show-header="false"
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 500px;margin: 10px auto;"
            highlight-current-row="true"
           >
            <el-table-column  type="selection">
            </el-table-column>

            <el-table-column
                align="left">

                <template slot-scope="scope">
                    <el-input
                        v-focus
                        placeholder="输入修改的内容"
                        size="mini"
                        v-model="scope.row.name"
                        v-if="scope.row.modified"
                        @keyup.enter.native="modified(scope.row)"
                    />
                    <span v-else @click="modified(scope.row)">{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                align="right">
                <template slot="header">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                        @click="remove(scope.$index)"
                        icon="el-icon-close"
                        size="mini">
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                input: '',
                search: '',
                tableData: [
                    {
                        modified: false,
                        name: '吃饭'
                    }, {
                        modified: false,
                        name: '睡觉'
                    }, {
                        modified: false,
                        name: '喝水'
                    }, {
                        modified: false,
                        name: '工作'
                    }],
                currentPage:1, //初始页
                pagesize:5,    //    每页的数据
            }
        },
        directives: {
            focus: {
                inserted: function (el, bind, vnode) {
                    console.log('-------------')
                    console.log(vnode)
                    console.log(vnode.elm.children[0])
                    console.log('-------------')

                    vnode.elm.children[0].focus();
                }
            }
        },
        methods: {
            addTo() {
                if (this.input == null || this.input.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '无效的TODO'
                    });
                } else {
                    this.tableData.push({name: this.input});
                    this.input = '';
                }

            },
            remove(index) {
                this.tableData.splice(index, 1);
            },
            modified(row) {
                /**
                 * row.modified
                 *  true: 输入框变文本
                 *  false: 文本变输入框
                 *
                 * 点击文本的时候：变成编辑状态
                 * 回车确定的时候：全部变成文本
                 */

                console.log(row.modified);
                const modified = row.modified;

                this.tableData.forEach((item)=>{
                    item.modified=false;
                });

                console.log(row.modified);

                row.modified = !modified;
                console.log(row.modified);
            },
            handleSizeChange(size) {
                this.pageSize=size;
               // console.log("长度改变:"+size)
            },
            handleCurrentChange(currentPage) {
                this.currentPage=currentPage;
               // console.log("当前改变："+currentPage);

            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 100px;
    }
</style>
