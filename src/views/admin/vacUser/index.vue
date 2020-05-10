<template>
  <div class="vac-user">
      <div class="div-search">
          <ul class="ul-search clearfix">
                <li class="li-search"><span>ID</span> <Input placeholder="查找ID" style="width: 200px" /></li>
                <li class="li-search"><span>用户名</span> <Input  placeholder="查找昵称" style="width: 200px" /></li>
                <li class="li-search">
                    <span>性别</span>
                    <Select v-model="model1" style="width:200px" placeholder="不限">
                        <Option value="">不限</Option>
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                    </Select>
                </li>
                <li class="li-search"><Button type="primary" style="font-size:15px;">查找 <Icon type="ios-search" style="font-size:20px;"/></Button></li>
          </ul>
      </div>
      <div class="div-operation">
          <Button type="success" class="btn-operation" @click="vac_cancel">解除封禁</Button>
      </div>
      <div class="div-table">
          <Table border ref="selection" :columns="columns4" :data="data1" @on-selection-change="change_checked"></Table>
          <div class="pagination">
              <Page :total="100" />
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model1:"",
            model2: '',
            columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        
                    },
                    {
                        title: 'ID',
                        key: 'id',
                        width:100
                    },
                    {
                        title: '昵称',
                        key: 'name',
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '封禁到期时间',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render:(h,params)=> {
                            return h('div',[
                                h('Button',{
                                    props: {
                                        type:'success'
                                    },
                                    style: {
                                        // marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                },'解除封禁')
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        id: '01',
                        name: '张三',
                        sex: '男',
                        status: '正常',
                        date: '2016-10-03',
                    },
                    {
                        id: '02',
                        name: '李四',
                        sex: '女',
                        status: '封禁',
                        date: '2016-10-01',
                    },
                    {
                        id: '03',
                        name: '王二',
                        age: 30,
                        sex: '男',
                        status: '正常',
                        date: '2016-10-02',
                    },
                ],
                table_checked:[]
        }
    },
    methods: {
            change_checked(selection) {
                this.table_checked = selection;
            },
            vac_cancel() {
                if(this.table_checked.length===0) {
                    this.$Message['warning']({
                    background: true,
                    content: '选项不能为空'
                });
                }else {
                }
            },
            edit (index) {
            },
            remove (index) {
                this.data1.splice(index, 1);
            }
        }
}
</script>

<style lang="less" scoped>
    .vac-user {
        box-shadow: 0 2px 7px rgba(0,0,0,.15);
        .div-search {
            .ul-search {
                padding-top: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid #f6ecec;
                span {
                    margin-right: 20px;
                    width: 70px;
                    text-align: right;
                    display: inline-block;
                }
                li.li-search {
                    float: left;
                    margin-left: 55px;
                }
            }
        }
        .div-operation {
            padding: 20px;
            .btn-operation {
                height: 35px;
                margin-right: 20px;
            }
        }
        .div-table {
            .pagination {
                margin-top: 10px;
                padding: 10px;
            }
        }
    }
</style>