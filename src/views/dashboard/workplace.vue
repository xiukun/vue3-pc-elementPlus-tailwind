<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-02 18:10:38
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-04 15:35:18
-->
<template>
    <div class='content'>
        <el-tag>
            <el-link type='primary' href='https://github.com/xiukun' target='_blank' :underline='false'>
                我的github仓库地址
            </el-link>
        </el-tag>
        <p class="mt-1.5">
            <el-button @click='dialogShow = true'>
                打开OpenDialog
            </el-button>
        </p>
        <open-dialog v-model:show='dialogShow' :show='dialogShow' title='操作'>
            <p style='height: 1200px;'>
                aaa<br>bbb<br>ccc
            </p>
            <template #btn>
                <el-button>
                    默认按钮
                </el-button>
                <el-button type="primary">
                    默认按钮2
                </el-button>
                <!-- <el-button type="warning">
                    默认按钮3
                </el-button> -->
            </template>
        </open-dialog>
        <div>
            <div class="flex justify-center">
                <div v-for="(item, $index) in imgList" :key="item" class="img-item" @click="showHasImg($index)">
                    <img :src="item" alt="" class="image">
                </div>
            </div>
            <el-button type="primary" @click="showImg">点击预览</el-button>
        </div>
        <div>
            <div class="flex justify-center">
                <div v-for="(item, $index) in imgList" :key="item" class="img-item" @click="showHasImg($index)">
                    <img :src="item" alt="" class="image">
                </div>
            </div>
            <el-button type="primary" @click="showImg">点击预览</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createImgPreview } from '@/components/Preview';
export default defineComponent({
    name: 'Workplace',
    setup() {
        const dialogShow = ref(false);
        const imgList = ref<string[]>([
            'http://dn-p-tystore.qbox.me/p/chapter/attachment/e_bTeg-weA/EgfWEtftEBfs4BfuEg6uelu_JHH3HUD6I7HMet148BDq5uyiKgem4C2.jpg',
            'http://www.jf258.com/uploads/2014-09-29/012939994.jpg',
            'http://pic1.win4000.com/wallpaper/3/58f4672ad3c5c.jpg'
        ]);

        function showHasImg(i: number): void {
            createImgPreview({
                imageList: [imgList.value[i]],
                show: true
                // index: 0
            });
        }

        function showImg(): void {
            createImgPreview({
                imageList: imgList.value,
                show: true,
                // index: 0,
                onSelect: (i: number) => {
                    console.log('当前点击的图片索引：' + i);
                },
                onClose: (i: number) => {
                    console.log('关闭之后的图片索引：' + i);
                }
            });
        }

        return {
            dialogShow,
            imgList,
            showHasImg,
            showImg
        };
    }
});
</script>

<style scoped>
.img-item {
    width: 400px;
    height: 300px;
    overflow: hidden;
    position: relative;
    margin: 0 10px;
    cursor: pointer;
}
.image {
    width: 300px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>