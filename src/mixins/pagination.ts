import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class Pager extends Vue {
    mounted(){
        (this as any).$load.loadingShow();
        this.searchQuery();
    }

    updata():void {
        (this as any).$load.loadingShow();
        (this as any).getList();
    }

    /**
     * april-pagination
     * change-page
     */
    changePage(page:any): void{
        (this as any).currentPages=page;
        (this as any).getList({pageNo: page})
    }


    /**
     * 筛选
     */
    async searchQuery() {
        await this.$sleep();
        const { selectObject, queryParams } = (this as any);
        let obj:any = {
            pageNo: 1,
            pageSize: 10,
        };

        //老写法法使用 (selectObject)
        for(let key in selectObject){
            obj = {...obj, ...{[key]: selectObject[key].value}}
        }

        //写法升级后使用 (queryParams)
        obj = {...obj, ...queryParams};

        (this as any).$load.loadingShow();
        (this as any).getList(obj);
    }

    /**
     * 重置
     */
    searchReset():void {
        const { selectObject, queryParams } = (this as any);
        let obj:any = {
            pageNo: 1,
            pageSize: 10,
        };

        //老写法法使用 (selectObject)
        for(let key in selectObject){
            selectObject[key].value = ''
        }

        //写法升级后使用 (queryParams)
        for(let key in queryParams){
            queryParams[key] = ''
        }

        (this as any).params = obj;
        (this as any).currentPages=1;
        (this as any).$load.loadingShow();
        (this as any).getList(obj,'reset')
    }

    selectromChage(data:any):void {
        (this as any).selectObject[data.name].value = data.value;
    }
}
