<template>
<div class="_card">
    <p>{{label}}</p>
    <p>{{value}}</p>
</div>
</template>

<script>
export default {
    name: 'card',
    props: ['label', 'value']
}
</script>

<style scoped lang="scss">
    ._card {
        width: 256px;
        height: 138px;
        background: #FFFFFF;
        border: 1px solid rgba(239, 239, 239, 0.5);
        box-shadow: -2px 5px 6px #EFEEF1;
        border-radius: 8px;
        padding: 20px;
        margin: 0 30px 30px;

        p {
            width: 100%;
            font-weight: bold;

            &:nth-of-type(1) {
                font-size: 16px;
                line-height: 19px;
                color: #686666;
                margin-bottom: 28px;
            }

            &:nth-of-type(2) {
                font-size: 24px;
                line-height: 28px;
                color: #000000;
            }
        }
    }
</style>
