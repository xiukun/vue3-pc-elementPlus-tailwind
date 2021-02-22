<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-22 16:45:22
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-22 16:51:56
-->
<template>
    <div>
        <div class="flex justify-center">
            <div v-for="(item, $index) in imgList" :key="item" class="img-item" @click="showHasImg($index)">
                <img :src="item" alt="" class="image">
            </div>
        </div>
        <div class="flex justify-center">
            <el-button size="medium" type="primary" @click="showImg">点击预览</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createImgPreview } from '@/components/Preview';
export default defineComponent({
    name: 'preview',
    setup() {
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