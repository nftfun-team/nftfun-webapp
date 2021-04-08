<template>
<div class="_logo">
    <img src="~img/logo/logo.svg" alt="">
</div>
</template>

<script>
export default {
    name: 'logo'
}
</script>

<style scoped lang="scss">
    ._logo {
        display: inline-flex;
        height: 100%;
        align-items: center;
    }
    @media (max-width: 900px){
        ._logo img{
            height: 40px;
        }
    }
</style>
