<template>
    <div id="app">
        <el-input @keyup.enter.native="insert()" placeholder="请输入内容" style="width: 400px;" v-model="input"></el-input>
        <el-button @click="insert()">添加</el-button>
        <el-table
            :data="todo.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                        @blur.prevent ="modified(scope.row)"
                        @keyup.enter="$event.target.blur"
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
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 40]"
            :total="todo.length"
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
                todoKey: 'todos',
                input: '',
                search: '',
                todo: [],
                currentPage: 1, //初始页
                pageSize: 5,    //    每页的数据
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
            /**
             * 在组件初始化的时候，把locoStore的数据加载内存
             */
            this.todo = this.$store.get(this.todoKey);
        },
        methods: {
            insert() {
                if (this.input == null || this.input.trim() == '') {
                    this.$message({
                        type: 'warning',
                        message: '无效的TODO'
                    });
                } else {
                    this.todo.unshift({name: this.input, modified: false});
                    this.$store.set(this.todoKey, this.todo);
                    this.input = '';
                }
            },
            remove(index) {
                /**
                 * TODO
                 *  1. 弹出确定框提示是否删除
                 *  2. 确定: 删除当前行
                 *  3. 取消: 啥也不干
                 */
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.todo.splice(index, 1);
                    this.$store.set(this.todoKey, this.todo);
                }).catch(() => {
                    console.log('取消删除');
                });


                /**
                 * TODO
                 *  1. 从 localStore 取出TODO[]
                 *  2. 从TODO[] 删除当前index的数据 (此时TODO[] 已经少了一条数据流)
                 *  3. 将TODO[] 存回 localStore
                 *  4. 将 localStore 的数据读到 todo
                 *
                 *  取出数据,在内存中对数据进行增删改查后再存回去
                 *  数据操作还是一样的,只是之前的数据源是 this.todo,现在是 this.$store.get(*)
                 *
                 *  程序填空?
                 */

                //----------------------------------------------
                // 1. 取出TODO[]
                // let array = this.$store.get('?')

                // 2. 从TODO[] 删除当前index的数据
                // '?'.splice(index, 1)

                // 3. 将TODO[] 存回 localStore
                // this.'?'.set('?')
                //----------------------------------------------

                /**
                 * TODO
                 *  其实目前的思路有问题, 即每次都从 localStore 读取数据操作后再存回去,最后再读到内存,很麻烦
                 *  我们可以:
                 *    照样还是操作 todo (内存数据),不过在操作(增删改)之后将数据覆盖存储到 localStore 即可.
                 *    1. 初始化的时候从 localStore 读取数据
                 *    2. 增(删改)的时候跟以前一样 todo[].push... 不过最后要将 todo 存储到 localStore(这样就不会丢失了)
                 */
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
                const modified = row.modified;

                this.todo.forEach((item) => {
                    item.modified = false;
                });
                this.$store.set(this.todoKey,this.todo);

                row.modified = !modified;
            },
            handleSizeChange(size) {
                this.pageSize = size;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
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
