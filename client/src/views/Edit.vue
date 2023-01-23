<template>
    <div class="edit">
    <el-row>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light">
      <p align="left">Name</p>
      <el-input
      placeholder="Please input"
      :value ="hotel.hotel_name"
      v-model="model.hotel_name"></el-input>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <br/>

  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light">
      <p align="left">Country</p>
      <el-input
      placeholder="Please input"
      :value ="hotel.hotel_country"
      v-model="model.hotel_country"></el-input>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <br/>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light">
      <p align="left">Score</p>
      <el-input
      placeholder="Please input"
      :value ="hotel.hotel_score"
      type="number"
      v-model="model.hotel_score"></el-input>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  <br/>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light" align="right">
      <el-button size="large" type="primary" @click="edit()">Edit</el-button>
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
  mounted() {
    return client({
      method: 'get',
      url: `/hotel/${this.$route.params.id}`,
    }).then((res) => {
      this.hotel = res?.data[0];
      console.log(JSON.parse(JSON.stringify(this.hotel)));
    });
  },
  methods: {
    edit() {
      console.log(this.model);
      return client({
        method: 'put',
        url: `/hotel/update/${this.$route.params.id}`,
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
