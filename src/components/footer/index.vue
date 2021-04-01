<template>
<footer>
    <a href="">
        <img src="~img/twitter.svg" alt="">
    </a>
    <a href="">
        <img src="~img/telegram.svg" alt="">
    </a>
    <a href="">
        <img src="~img/medium.svg" alt="">
    </a>
    <a href="">
        <img src="~img/github.svg" alt="">
    </a>
</footer>
</template>

<script>
export default {
    name: 'index'
}
</script>

<style scoped lang="scss">
    footer {
        height: 115px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F3CDC7;
        a {
            margin: 0 15px;
        }
    }
</style>
