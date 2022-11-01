<template>
    <div class="container-fluid">
        <div class="row justify-content-center mt-4">
            <div class="col-md-9 col-lg-6">

                <AddPost/>

                <div class="mt-5" v-if="posts.length">
                    <div class="p-2" v-for="(post, index) in posts" :key="index">
                        <div class="card">
                            <div class="card-header">
                                <div class="d-flex justify-content-between ">
                                    <h5 class="card-title">Card title</h5>
                                    <font-awesome-icon icon="fa-solid fa-ellipsis" />
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="card-text" v-html="post.detail"></div>

                                <div v-if="post.files.length">
                                    <Carousel>
                                        <Slide v-for="slide in post.files" :key="slide">
                                            <img class="carousel__item" :src="slide.file_path">
                                        </Slide>
                                        <template #addons>
                                            <Navigation />
                                            <Pagination />
                                        </template>
                                    </Carousel>
                                </div>
                            </div>

                            <div class="card-footer">
                                <div class="row">                                
                                    <div class="col-md-4 col-lg-4">
                                        <p class="text-center">
                                            <font-awesome-icon icon="fa-regular fa-thumbs-up" />
                                            Like
                                        </p>
                                    </div>
                                    <div class="col-md-4 col-lg-4">
                                        <p @click="showComment(index)" class="text-center" style="cursor: pointer;">
                                            <font-awesome-icon icon="fa-regular fa-comment" />
                                            Comment
                                        </p>
                                    </div>
                                    <div class="col-md-4 col-lg-4">
                                        <p class="text-center">
                                            <font-awesome-icon icon="fa-solid fa-share" />
                                            Share
                                        </p>
                                    </div>
                                </div>

                                <div id="collapse" v-if="commentIndex == index">
                                    <p>show comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div id="loading" class="spinner-border my-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import AuthUser from '@/store/AuthUser'
import Post from '@/store/Post'
import AddPost from './Add.vue'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'
import { faBrain } from '@fortawesome/free-solid-svg-icons'

export default{
    components: {
        AddPost,
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },

    data(){
        return{
            posts: [],
            commentIndex: -1,
            collapseId: 'collapse',
        }
    },

    async created(){
        await this.fetchPosts()
        console.log(document.documentElement.offsetHeight)
    },

    mounted () {
        this.scroll()
    },

    methods:{
        async fetchPosts(){
            await Post.dispatch('fetchPosts', AuthUser.getters.user.id)
            this.posts = Post.getters.posts
            document.getElementById("loading").style.display = "none";
        },
        async fetchComment(){

        },  
        showComment(index){
            console.log(index)
            this.commentIndex = index
            console.log('show comment index', this.commentIndex)
        },
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = parseInt(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight) === document.documentElement.offsetHeight
                if (bottomOfWindow) {
                    // this.scrolledToBottom = true // replace it with your code
                    console.log('loading...')

                }
            }
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/post_scss.scss';
</style>