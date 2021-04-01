<template>
<div class="_dashboard">
    <Tabs :tabsList="tabsList" :active="activeIndex"/>
    <div class="_flex _justify-content-center">
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Card :label="'REBASE COOLDOWN'" :value="'0d:3h:29m:51s'"/>
        <Button :name="'REBASE'" class="_btn"/>
    </div>
</div>
</template>

<script>
import Button from '@/components/button/index.vue';
import Tabs from '@/components/tabs/index.vue';
import Card from './card.vue'

export default {
    name: 'index',
    components: {Button, Tabs, Card},
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

    ._dashboard {
        padding-top: 84px;

        ._btn {
            min-width: 256px;
            margin: 40px 30px 0;

            &::before {
                background-color: #FAFAF1;
            }
        }
    }
</style>
