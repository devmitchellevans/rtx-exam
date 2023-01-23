<template>
  <div class="about">
  <el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light">
    <p align="left">Name</p>
    <el-input placeholder="Please input" v-model="model.hotel_name"></el-input>
  </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<br/>

<el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light">
    <p align="left">Country</p>
    <el-input placeholder="Please input" v-model="model.hotel_country"></el-input>
  </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<br/>
<el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light">
    <p align="left">Score</p>
    <el-input placeholder="Please input" type="number" v-model="model.hotel_score"></el-input>
  </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<br/>
<el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light" align="right">
    <el-button size="large" type="primary" @click="add()">Add</el-button>
  </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/',
  json: true,
});

export default {
  data() {
    return {
      hotel: [],
      model: {},
    };
  },
  methods: {
    add() {
      console.log(this.model);
      return client({
        method: 'post',
        url: '/hotel/add',
        data: this.model,
      }).then((res) => {
        if (res.status === 200) {
          this.$message('Successfully added!');
          this.$router.push('/');
        } else {
          this.$message('Failed!');
        }
      });
    },
  },
};

</script>
