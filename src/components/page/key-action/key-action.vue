<template>
    <div class="key-action">
        <div>
            <el-form :inline="true">
                <el-row>
                    <el-col :span="4">
                        <el-select v-model="appName" clearable placeholder="选择App" class="handle-select mr10"
                                   @clear="appId=null">
                            <el-option v-for="item in apps" :key="item.appId" :label="item.appName"
                                       @click.native="appChange(item)"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-col>

                    <el-col :span="2">
                        <el-select v-model="os" clearable placeholder="选择系统" class="handle-select mr10"
                                   @clear="os=null">
                            <el-option v-for="item in oses" :key="item.key" :label="item.value" :value="item.key"
                                       @click.native="osChange(item)"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">
                        <el-select v-model="channel" clearable placeholder="选择渠道" class="handle-select mr10"
                                   @clear="channelId=null">
                            <el-option v-for="item in channels" :key="item.id" :label="item.channelName"
                                       @click.native="channelChange(item)"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="5">
                        <el-input v-model="accountId" placeholder="投放账户ID"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="queryList">查询</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="add">新增</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div>
            <el-table
                :data="tables.list"
                style="width: 100%; margin-top: 20px"

                border
                stripe
                height="250">
                <el-table-column
                    fixed
                    prop="appName"
                    label="应用名称"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="os"
                    label="操作系统"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="channelId"
                    label="渠道"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="accountId"
                    label="账户ID"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="convertType"
                    label="转化目标"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="config.activation_time"
                    label="激活时间"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="config.arpu"
                    label="ARPU"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="config.excitation_count"
                    label="激励次数"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="config.ecpmv1"
                    label="eCPM-V1"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="config.secpmv3"
                    label="SeCPM-V3"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="config.charge"
                    label="付费"
                    width="120">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="配置"
                    width="120">
                    <template slot-scope="scope">
                        <!--                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--        弹窗，新增和编辑的页面不一样-->
        <el-dialog
            title="配置"
            :visible.sync="centerDialogVisible"
            width="35%"
            center>
            <div>
                <div v-show="!editMode" style="display: flex; flex-direction: column; align-items: center;">
                    <a>前4项表单，在“编辑模式时”请勿修改!后期添加禁用功能</a>
                    <el-select v-model="appName" placeholder="选择App" class="handle-select mr10">
                        <el-option v-for="item in apps" :key="item.id" :label="item.appName"
                                   :value="item.appId"></el-option>
                    </el-select>
                    <el-select v-model="os" placeholder="选择系统" class="handle-select mr10">
                        <el-option v-for="item in oses" :key="item.key" :label="item.value"
                                   :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="channel" placeholder="选择渠道" class="handle-select mr10">
                        <el-option v-for="item in channels" :key="item.id" :label="item.channelName"
                                   :value="item.channelName"></el-option>
                    </el-select>
                    <el-select v-model="convertGoal" placeholder="选择转化" class="handle-select mr10">
                        <el-option v-for="item in convertGoals" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <el-col>
                    <el-row v-for="dic in dicConfigs"
                            style="display: flex; flex-direction: row; align-items: center;justify-content: center">
                        <div :hidden="dic.value3==null">
                            <el-tooltip :content="dic.value3" placement="left">
                                <i class="el-icon-warning"></i>
                            </el-tooltip>
                        </div>
                        <el-col :span="5">
                            <div>{{ dic.value1 }}</div>
                        </el-col>
                        <el-col :span="2">
                            <div>{{ dic.value2 }}</div>
                        </el-col>
                        <el-col :span="14">
                            <div>
                                <el-input v-model="dic.value4" placeholder="请输入内容"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">保 存</el-button>
                <el-button type="primary">发 布</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import {getApps, getChannels, getDics} from "../../../api/dic";
import {getList} from "../../../api/key-action";

export default {
    name: "key-action",
    data() {
        return {
            editMode: false,
            centerDialogVisible: false,
            apps: [], // [{"id":1,"appName":"迷你大虾","appId":"mndx","desc":"网赚","appType":1,"createTime":"2022-03-11T08:37:23.000+0000"},{"id":2,"appName":"么么视频","appId":"momoshipin","desc":"电商","appType":2,"createTime":"2022-03-17T11:07:11.000+0000"}]
            formData: {
                activation_time: null,
                arpu: null,
                excitation_count: null,
                ecpmv1: null,
                secpmv3: null,
                charge: null,
            },
            convertGoals: ["激活", "次留", "关键行为", "付费"],
            convertGoal: [],
            oses: [{
                key: 0,
                value: "android",
            }, {
                key: 1,
                value: "ios",
            }],
            channels: [], // [{"id":1,"channelCode":"ch_001","channelName":"巨量","createTime":"2022-03-11T08:40:42.000+0000"}]
            channel: null,
            osValue: 0,
            appName: null,
            appId: null, // 传参用
            os: null, // 传参用
            channelId: null, // 传参用
            accountId: null, // 传参用
            dicConfigs: [], // 配置内容
            tables: {},

        }
    },

    mounted() {
        this.loadData();
        this.queryList();
    },

    methods: {
        appChange(event) {
            this.appId = event.id;
        },
        osChange(event) {
            this.os = event.value;
        },
        channelChange(event) {
            this.channelId = event.id;
        },

        add(){
            this.editMode = false;
            this.centerDialogVisible = true

        },

        edit(row) {
            this.editMode = true;
            this.centerDialogVisible = true;
            console.log(row)
        },

        queryList() {
            getList({
                "appId": this.appId,
                "os": this.os,
                "channel": this.channelId,
                "accountId": this.accountId,
                "pageNum": 1,
                "pageSize": 1000,
            }).then(tables => {
                this.tables = tables;
            })
        },

        loadData() {
            getApps().then(apps => {
                this.apps = apps
            })
            getDics({
                "type": "key-action"
            }).then(configs => {
                this.dicConfigs = configs
            })
            getChannels().then(channels => {
                this.channels = channels
            })
        }
    }
}

</script>

<style scoped>

</style>