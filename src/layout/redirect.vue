<!--
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-02-08 09:35:16
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 09:37:32
-->
<script lang="ts">
import { defineComponent, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'Redirect',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { pathMatch } = route.params;
        router.replace({
            path:
                typeof pathMatch === 'string'
                    ? `/${pathMatch}`
                    : `/${pathMatch.join('/')}`,
        });
    },
    render() {
        return h('div');
    },
});
</script>