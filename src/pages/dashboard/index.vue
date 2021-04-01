<template>
<div></div>
</template>

<script>
import Button from '@/components/button/index.vue';

export default {
    name: 'index',
    components: {Button}
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
