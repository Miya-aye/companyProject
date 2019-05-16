<template>
    <div class="news_main">
        <a-row>
            <a-col :span="24">
                <p class="news_title">消息中心</p>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" class="news_button">
                <a-button>删除</a-button>
                <a-button>标记已读</a-button>
                <a-button>刷新</a-button>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="10">
                <div class="news_list">
                    <a-table :pagination="{pageSize:'5'}" :rowSelection="rowSelection" :columns="columns" :dataSource="data" >
                        <a slot="name" slot-scope="text" href="javascript:;" >{{text}}</a>
                    </a-table>
                </div>
            </a-col>
            <a-col :span="14">
                <div class="news_text">
                    <h3>您的资料不够完整，请补充填写。</h3>
                    <p>为体验更好的服务，建议您将个人信息填写完整，您可以通过我-个人中心-修改个人信息页进入修改。</p>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>

const columns = [{
  title: '短消息',
  dataIndex: '短消息',
  scopedSlots: { customRender: 'name' },
}, {
  title: '发送人',
  dataIndex: '发送人',
}, {
  title: '时间',
  dataIndex: '时间',
}];
const data = [{
  key: '1',
  短消息: '您的资料不够完整，请补充填写。',
  发送人: 'system',
  时间: '2019-05-01',
}, {
  key: '2',
  短消息: '您有一场下午三点在会议室的会议，参会人员还有李四、王五...',
  发送人: '张三',
  时间: '2019-05-02',
}, {
  key: '3',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '李四',
  时间: '2019-05-03',
}, {
  key: '4',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '54',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '6',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '7',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '8',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '9',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '10',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '11',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}, {
  key: '12',
  短消息: '新的考勤规则已出，请知悉！',
  发送人: '王五',
  时间: '2019-05-05',
}];

export default {
    name: 'News',
    data() {
        return {
            data,
            columns,
        }
    },
    computed: {
        rowSelection() {
            const { selectedRowKeys } = this;
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
            }
        }
    },
    methods: {
    }
}
</script>

<style scoped>
    .news_main .news_title {
      font-size:24px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom:16px;
      font-weight:bold;
    }
    .news_main .news_button {
        text-align:left;
    }
    .news_main .news_text {
        min-height:400px;
        padding:2%;
        border:1px solid #ececec;
    }
    .news_main .news_text h3 {
        font-weight:bold;
        font-size:20px;
        padding:20px 0 10px;
    }
    .news_main .news_text p {
        font-size:16px;
    }
</style>