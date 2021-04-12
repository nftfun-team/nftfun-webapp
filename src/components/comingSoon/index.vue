<template>
    <div class="coming">
        <img src="~img/coming.svg" alt="">
        <p>Coming soon…</p>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({name: 'ComingSoon'})
export default class ComingSoon extends Vue {

}
</script>

<style scoped lang="scss">
    .coming{
        /*margin-top: 200px;*/
        width: 100%;
        text-align: center;
        img{
            width: 250px;
        }
        p{
            margin-top: 65px;
            font-size: 54px;
        }
    }
    @media (max-width: 800px) {
        .coming{
            margin-top: 100px;
            width: 100%;
            text-align: center;
            img{
                width: 150px;
            }
            p{
                margin-top: 25px;
                font-size: 28px;
            }
        }
    }
</style>
