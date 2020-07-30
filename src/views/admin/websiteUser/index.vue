<template>
  <div class="website-user">
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
                <li class="li-search">
                    <span>封禁状态</span>
                    <Select v-model="model2" style="width:200px" placeholder="不限">
                        <Option value="">不限</Option>
                        <Option value="male">已封禁</Option>
                        <Option value="female">未封禁</Option>
                    </Select>
                </li>
                <li class="li-search"><Button type="primary" style="font-size:15px;">查找 <Icon type="ios-search" style="font-size:20px;"/></Button></li>
          </ul>
      </div>
      <div class="div-operation">
          <Button type="error" class="btn-operation">删除</Button>
          <Button type="info" class="btn-operation">添加</Button>
      </div>
      <div class="div-table">
          <Table border ref="selection" :columns="columns4" :data="data1"></Table>
          <div class="pagination">
              <Page :total="100" />
          </div>
      </div>
      <div>
          <Table :columns="column22" :data="data22" :border="true" :stripe="true"></Table>
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
                        title: '状态',
                        key: 'status',
                        render(h,params) {
                            return h('span',{style: {'color':params.row.status=='正常'?'#000':'red'}},params.row.status)
                        }
                    },
                    {
                        title: '注册日期',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render:(h,params)=> {
                            return h('div',[
                                h('Button',{
                                    props: {
                                        type:'primary'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                },'编辑'),
                                h('Button',{
                                    props: {
                                        type:'error'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                },'删除')
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
                column22: [
                    {
                        title: '计划',
                        key: 'name',
                        width: "220"
                    },
                    {
                        title: '时间',
                        key: 'age',
                        width: 180
                    },
                ],
                data22: [
                    {
                        name: '起床、吃早餐',
                        age: '8:30-9:00',
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: '学习专业知识或者制作网页',
                        age: '9:00-11:30',
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: '吃午饭以及睡午觉',
                        age: '12:00-13:30',
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: '学习专业知识或者制作网页',
                        age: '13:30-16:30',
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: '娱乐时间',
                        age: '16:30-17:00',
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: '吃晚饭以及洗澡',
                        age: '17:20-19:30'
                    },
                    {
                        name: '学习专业知识或者制作网页',
                        age: '19:30-21:00'
                    },
                    {
                        name: '娱乐',
                        age: '21:00-22:00'
                    },
                    {
                        name: '睡觉',
                        age: '22:00-8:30'
                    }
                ]
        }
    },
    methods: {
            edit (index) {
            },
            remove (index) {
                this.data1.splice(index, 1);
            }
        }
}
</script>

<style lang="less" scoped>
    .website-user {
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