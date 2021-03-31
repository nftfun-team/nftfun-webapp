<template>
    <div class='april-paginator' v-if="total > 10" :style="{'text-align': textAlign}">
        <div class="april-paginator-content">
            <div class="april-paginator-content-item-first april-paginator-content-item" @click="setCurrentPage(1)">{{locale == 'zh' ? '首页' : 'First Page'}}</div>

            <div class="april-paginator-content-icon" @click="setCurrentPage(currentPage-1)"
                 :style="{'disabled': currentPage == 1 ,'cursor':currentPage!=1?'pointer':''}">
                <i class="iconfont">&#xe602;</i>
            </div>

            <div class="april-paginator-content-item"  v-for="(item,index) in middlePages" :key='index'
                 :class="{ 'april-paginator-content-item-current': item === currentPage }"
                 @click="setCurrentPage(item)">
                {{item}}
            </div>

            <div class="april-paginator-content-icon" @click="setCurrentPage(currentPage+1)"
                 :style="{'disabled':currentPage==totalPage,'cursor':currentPage!=totalPage?'pointer':''}">
                <i class="iconfont">&#xe604;</i>
            </div>

            <div class="april-paginator-content-item-last april-paginator-content-item" @click="setCurrentPage(totalPage)">{{locale == 'zh' ? '尾页': 'Last Page'}}</div>

            <div class="april-paginator-content-change" v-if="showPage" ><input type="number" @keydown="onInputKeyDown($event)" v-model="changeCurrentPage"> <span @click="jumpToChangeCurrentPage()">{{locale == 'zh' ? '跳转': 'Go to'}}</span></div>
            <div class="april-paginator-content-size" v-if="showPageSize">{{locale == 'zh' ? '每页显示': 'Per Page'}} <input type="number" v-model="changePageSize" @keyup="setPageSize()" >{{locale == 'zh' ? '行': 'Row'}}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';

    @Component({
        name: 'pagination',
    })
    export default class Pagination extends Vue {

        // 当前页码
        @Prop({default: 1, type: Number})
        public currentPages!: number;

        // 每页显示个数选择器的选项
        @Prop({default: 10, type: Number})
        public pageSize!: number;

        // 总条目数
        @Prop({default: 1, type: Number})
        public total!: number;

        // 分页器展示的方向
        @Prop({default: "right", type: String})
        public textAlign!: string;

        // 语言
        @Prop({default: "zh", type: String})
        public locale!: string;

        // 是否展示输入页码跳转
        @Prop({default: false, type: Boolean})
        public showPage!: boolean;

        // 是否展示修改每页大小
        @Prop({default: false, type: Boolean})
        public showPageSize!: boolean;

        public totalPage: number = 0;
        public pageRange: number = 5;
        public middlePages: Array<number> = [];
        public changePageSize: any = '';
        public changePageSizeDebounce: any;
        public changeCurrentPage: any = '';
        public currentPage: number = 1;
        public pageSizes: Number = 10;

        @Watch("currentPages", { immediate:true, deep: true})
        watchCurrentPages(): void {
            this.changeCurrentPage = this.currentPage = this.currentPages;
            this.init();
        }

        @Watch("pageSize", { immediate:true, deep: true})
        watchPageSize(): void {
            this.pageSizes = Number(this.pageSize);
            this.init()
        }

        @Watch("total", { immediate:true, deep: true})
        watchTotal(): void {
            this.init()
        }

        created(){
            this.init();
        }

        /**
         * reset Init
         */
        init() {
            this.setTotalPage();
            this.setMiddlePage();
        }

        /**
         * set Total Page
         */
        setTotalPage():void {
            this.totalPage = Math.ceil(this.total / this.pageSize);
        }

        /**
         * set Middle Page
         */
        setMiddlePage() {
            this.middlePages = [];
            for (
                let i = this.currentPage - this.pageRange < 1 ? 1 : this.currentPage - this.pageRange;
                i <= this.currentPage + this.pageRange && i <= this.totalPage;
                i++
            ) {
                this.middlePages.push(i);
            }
        }

        /**
         * jumpToChangeCurrentPage
         */
        jumpToChangeCurrentPage() {
            if (this.changeCurrentPage && this.changeCurrentPage > 0 && this.changeCurrentPage <= this.totalPage) {
                this.currentPage = Number(this.changeCurrentPage);
                this.init();
                this.changePage()
            }
        }

        /**
         * 输入限制 onkeydown
         * @param event
         */
        onInputKeyDown(event:any) {
            let inputKey = (event && event.key) || '0';
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'].indexOf(inputKey) === -1) {
                event.preventDefault();
                return;
            }
        }

        /**
         * setCurrentPage
         * @param i
         */
        setCurrentPage(i:number) {
            if (i > 0 && i <= this.totalPage) {
                this.currentPage = i;
                this.setMiddlePage();
                this.changePage()
            }
        }

        /**
         * setPageSize
         */
        setPageSize() {
            //因为修改了每页显示行数，所以需跳转到第一页
            clearTimeout(this.changePageSizeDebounce);
            this.changePageSizeDebounce = setTimeout(() => {
                this.changeCurrentPage = this.currentPage = 1;
                this.pageSizes = Number(this.changePageSize);
                this.sizeChange();
                this.init();
            }, 500)
        }

        @Emit("currentPage")
        changePage(){
            return this.currentPage
        }

        @Emit("sizeChange")
        sizeChange(){
            return this.pageSizes || 10
        }
    }
</script>

<style lang="scss">

    .april-paginator{
        width: 100%;
        color: #000;
        &-content{
            overflow: hidden;
            padding: 10px 20px;
            display: inline-block;
            &-item{
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                margin: 0 5px;
                float: left;
                font-size: 12px;
                border-radius: 2px;
                transition: background 500ms;
                &:hover{
                    cursor: pointer;
                }
                &-frist, &-last{
                    width: auto;
                    span{
                        font-size: 14px;
                    }
                    background-color: rgba(0, 0, 0, 0) !important;
                }
                &-first{
                    margin-left: 0;
                }
                &-current{
                    background: #409eff;
                    color: #fff;
                }
            }
            &-icon{
                width: 24px;
                height: 24px;
                line-height: 24px;
                margin: 0 5px;
                float: left;
                text-align: center;
            }
            &-change{
                float: left;
                margin-left: 20px;
                input{
                    width: 50px;
                    height: 24px;
                    outline: none;
                    border-radius: 2px;
                    margin: 0 10px;
                    text-align: center;
                    overflow: hidden;
                    border: 1px solid #ccc;
                }
                span{
                    font-size: 14px;
                    cursor: pointer;
                    color: #409eff;
                }
            }
            &-size{
                font-size: 14px;
                float: right;
                margin-left: 25px;
                color: #606266;
                input{
                    width: 40px;
                    height: 24px;
                    outline: none;
                    border-radius: 2px;
                    margin: 0 10px;
                    text-align: center;
                    border: 1px solid #ccc;
                    overflow: hidden;
                }
            }
        }
    }

</style>
