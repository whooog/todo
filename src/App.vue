<template>
    <div id="app">
        <el-input @keyup.enter.native="addTo()" placeholder="请输入内容" style="width: 500px;" v-model="input"></el-input>
        <el-table
            show-header="false"
            :data="tableData"
            style="width: 500px;margin: 10px auto;">
            <el-table-column
                type="selection">
            </el-table-column>

            <el-table-column
                align="left">

                <template slot-scope="scope">
                    <el-input
                        v-focus
                        placeholder="输入修改的内容"
                        size="mini"
                        v-model="scope.row.name" v-if="scope.row.modified"
                        @keyup.enter.native="modified(scope.row)"
                    />
                    <span v-else @click="modified(scope.row)">{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column
                align="right">
                <template slot-scope="scope">
                    <el-button
                        @click="remove(scope.$index)"
                        icon="el-icon-close"
                        size="mini">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                input: '',

                tableData: [
                    {
                        modified: false,
                        name: '吃饭'
                    }, {
                        modified: false,
                        name: '王小虎'
                    }, {
                        modified: false,
                        name: '王小虎'
                    }, {
                        modified: false,
                        name: '王小虎'
                    }],
            }
        },
        directives: {
            focus: {
                inserted: function (el, bind, vnode) {
                    // console.log('-------------')
                    // console.log(vnode)
                    // console.log(vnode.elm.children[0])
                    // console.log('-------------')

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
               console.log(row);
               row.modified = !row.modified;
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
