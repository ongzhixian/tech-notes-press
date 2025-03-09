---
title: Blogs
titleTemplate: Tech
---

<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Timestamp</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="post of blogPosts">
            <td style="width: 100%;"><a :href="post.url">{{ post.frontmatter.title }}</a></td>
            <td>{{ new Date(post.timestamp).toISOString() }}</td>
        </tr>
    </tbody>
</table>

<script setup>
import { data as blogPosts } from './tech-blog-posts.data.js';
</script>

<style scoped>

</style>
