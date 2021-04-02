<template>
    <div class="deposit-item">
<!--        <h4>Deposit</h4>-->
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        name: 'DepositItem'
    })
    export default class DepositItem extends Vue{

    }
</script>

<style lang="scss" scoped>
    .deposit-item{
        h4{
            font-weight: 800;
        }
    }
</style>
