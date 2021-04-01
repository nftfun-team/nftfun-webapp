<template>
<div class="_main-describe">
    <h3>{{title}}</h3>
    <p>{{subTitle}}</p>
</div>
</template>

<script>
export default {
    name: 'main-describe',
    props: ['title', 'subTitle']
}
</script>

<style scoped lang="scss">
    ._main-describe {
        border-top: 1px solid #EF8969;
        padding: 30px 0;

        h3 {
            font-size: 40px;
            line-height: 47px;
            color: #28292B;
            margin-bottom: 20px;
        }

        p {
            font-size: 24px;
            line-height: 28px;
            color: #28292B;
        }
    }
</style>
