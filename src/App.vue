<template>
    <div id="app">
        <el-input @keyup.enter.native="insert()" placeholder="请输入内容" style="width: 400px;" v-model="input"></el-input>
        <el-button @click="insert()">添加</el-button>
        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pagesize,currentPage*pagesize)"
            highlight-current-row="true"
            show-header="false"
            style="width: 500px;margin: 10px auto;"
        >
            <el-table-column type="selection">

            </el-table-column>

            <el-table-column
                align="left">
                <template slot="header">
                    全选
                </template>
                <template slot-scope="scope">

                    <el-input
                        @blur.prevent="modified(scope.row)"
                        @keyup.enter.native="modified(scope.row)"
                        placeholder="输入修改的内容"
                        size="mini"
                        v-focus
                        v-if="scope.row.modified"
                        v-model="scope.row.name"
                    />

                    <span @click="modified(scope.row)" v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                align="right">
                <template slot="header">
                    <el-input
                        placeholder="输入关键字搜索"
                        size="mini"
                        v-model="search"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                        @click="modified(scope.row)"
                        size="mini">编辑
                    </el-button>
                    <el-button
                        @click="remove(scope.$index)"
                        size="mini">
                        删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
            :current-page="currentPage"
            :page-size="pagesize"
            :page-sizes="[5, 10, 20, 40]"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                dataKey: 'todos',
                input: '',
                search: '',
                tableData: [],
                currentPage: 1, //初始页
                pagesize: 5,    //    每页的数据
            }
        },
        directives: {
            focus: {
                inserted: function (el, bind, vnode) {
                    // console.log('-------------');
                    // console.log(vnode);
                    // console.log(vnode.elm.children[0]);
                    // console.log('-------------');
                    vnode.elm.children[0].focus();
                }
            }
        },
        created: function () {
            this.refresh();
        },
        methods: {
            append(data) {
                let datas = this.$store.get(this.dataKey);
                // console.log('this.$store.get(this.dataKey): ' +datas);
                if ("undefined" == typeof datas || null == data ) {
                    datas = [data];
                } else {
                    datas.push(data);
                }
                this.$store.set(this.dataKey, datas);
            },
            refresh() {
                let todos = this.$store.get(this.dataKey);
                if (null != todos) {
                    this.tableData = todos;
                }
            },
            insert() {
                if (this.input == null || this.input.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '无效的TODO'
                    });
                } else {
                    this.append({name: this.input, modified: false});
                    this.input = '';
                    this.refresh();
                }

            },
            remove(index) {
                this.tableData.splice(index, 1);
                // let move = JSON.stringify(this.$store.get(this.dataKey)[index])
                // this.$store.remove('move')
                // this.refresh();
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

                this.tableData.forEach((item) => {
                    item.modified = false;
                });

                console.log(row.modified);

                row.modified = !modified;
                console.log(row.modified);
            },
            handleSizeChange(size) {
                this.pagesize = size;
                console.log("长度改变:" + size)
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
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
