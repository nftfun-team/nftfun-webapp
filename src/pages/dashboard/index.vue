<template>
<div>
    <Tabs :tabsList="tabsList" :active="activeIndex"/>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';
import Tabs from '@/components/tabs/index.vue';

export default {
    name: 'index',
    components: {Button, Tabs},
    data() {
        return {
            tabsList: [
                {
                    name: '1',
                    label: 'PRICE AND SUPPLY',
                    active: 1
                },
                {
                    name: '2',
                    label: 'REBASE HISTORY',
                    active: 2
                }
            ],

        }
    }
}
</script>

<style scoped lang="scss">
    ._header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 160px;
        font-size: 40px;
        color: #000000;
        font-weight: bold;
        padding: 0 80px;
        background: #FCFEFF;
        box-shadow: 0 4px 4px rgba(243, 243, 243, 0.8);
    }
</style>
