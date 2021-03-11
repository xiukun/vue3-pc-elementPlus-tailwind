<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-03-11 10:05:08
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-11 13:20:12
-->
<template>
    <table-search :current-page='table.page' :page-size='table.size' :total='table.total' @size-change='handleSizeChange' @current-change='handleCurrentChange'>
        <el-table ref='filterTable' row-key='date' border :data='tableData.data' style='width: 100%;'>
            <el-table-column type='index' width='50' :index='indexMethod' />
            <el-table-column prop='date' label='日期' sortable width='180' column-key='date' />
            <el-table-column prop='name' label='姓名' width='180' />
            <el-table-column prop='address' label='地址' />
            <el-table-column prop='amt' label='金额'>
                <template #default='scope'>
                    <el-input v-model.number='scope.row.amt' v-format:money='[scope.row, "amt"]' />
                </template>
            </el-table-column>
            <el-table-column prop='tag' label='标签' width='100'>
                <template #default='scope'>
                    <el-tag :type='scope.row.tag === "家" ? "primary" : (scope.row.tag === "公司" ? "danger" : scope.row.tag === "超市" ? "info" : "success")' disable-transitions>
                        {{ scope.row.tag }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </table-search>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import TableSearch from '@/components/Page/index.vue';
import { getTableList, ITag } from '@/api/components/index';
import { format } from '@/utils/tools';
interface ITable {
    data: Array<unknown>;
    total: number;
    page: number;
    size: number;
    tag: ITag;
}

const renderTableList = async (table: ITable) => {
    const d = await getTableList({ page: table.page, size: table.size, tag: table.tag });
    table.data = d.data.Data.data;
    table.total = d.data.Data.total;
};
const tableRender = (table: ITable) => {
    renderTableList(table);
    const handleSizeChange = (v: number) => (table.size = v) && renderTableList(table);
    const handleCurrentChange = (v: number) => (table.page = v) && renderTableList(table);
    const indexMethod = (index: number) => (table.page - 1) * table.size + index + 1;
    return { table, handleSizeChange, handleCurrentChange, indexMethod };
};

export default defineComponent({
    name: 'page-test',
    components: {
        TableSearch
    },
    setup() {
        // const
        const tableData: ITable = reactive({
            data: [],
            total: 0,
            page: 1,
            size: 10,
            tag: '所有'
        });
        return {
            format,
            tableData,
            ...tableRender(tableData)
        };
    }
});
</script>
