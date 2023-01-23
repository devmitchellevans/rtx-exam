<template>
  <div class="home">
    <!-- if from database -->
    <div v-if="hotel.length !== 0">
      <el-table
      :data="hotels"
      style="width: 100%">
      <el-table-column
        label="Name"
        prop="hotel_name">
      </el-table-column>
      <el-table-column
        label="Country"
        prop="hotel_country">
      </el-table-column>
      <el-table-column
        label="Score"
        prop="hotel_score">
      </el-table-column>
      <el-table-column
        align="right">
          <template v-slot="scope">
            <el-button
              size="mini"
              @click="handleEdit(hotels[scope.$index].id)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(hotels[scope.$index].id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      layout="prev, pager, next"
      :total="this.hotel.length * 2"
      @current-change="setPage">
    </el-pagination>
    </div>
      <!-- end if from database -->
      <!-- if from source -->
    <div v-else>
      <el-table
      :data="properties"
      style="width: 100%">
      <el-table-column
        label="Name"
        prop="property.name">
      </el-table-column>
      <el-table-column
        label="Country"
        prop="property.location.country">
      </el-table-column>
      <el-table-column
        label="Score"
        prop="property.reviews.summary.score">
      </el-table-column>
      </el-table>
      <el-pagination
      layout="prev, pager, next"
      :total="this.prop.length * 2"
      @current-change="setPage">
    </el-pagination>
    </div>
    <!-- end if from source -->
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
      prop: [],
      hotel: [],
      model: {},
      search: '',
      page: 1,
      pageSize: 5,
    };
  },
  mounted() {
    this.getHotel();
  },
  computed: {
    hotels() {
      return this.hotel.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
    },
    properties() {
      return this.prop.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
    },
  },
  methods: {
    getHotel() {
      client({
        method: 'get',
        url: '/hotel',
      }).then((response) => {
        this.hotel = response?.data;
        console.log(this.hotel.length);
        if (this.hotel.length === 0) {
          client({
            method: 'get',
            url: '/fromSource',
          }).then((data) => {
            this.prop = data?.data?.outlets?.availability?.results;
            console.log(this.prop);
            for (let i = 0; i < this.prop.length; i += 1) {
              this.model.hotel_name = this.prop[i].property.name;
              this.model.hotel_country = this.prop[i].property.location.country;
              if (this.prop[i].property.reviews === undefined) {
                this.model.hotel_score = 0;
              } else {
                this.model.hotel_score = this.prop[i].property.reviews.summary.score;
              }
              console.log(this.model);
              client({
                method: 'post',
                url: '/hotel/add',
                data: this.model,
              }).then(() => {
              });
            }
          });
        }
        // console.log(JSON.parse(JSON.stringify(this.hotel)));
      });
    },
    handleEdit(index) {
      console.log(index);
      this.$router.push(`/edit/${index}`);
    },
    handleDelete(index) {
      return client({
        method: 'delete',
        url: `/hotel/delete/${index}`,
      }).then((res) => {
        this.hotel = res?.data;
        if (res.status === 200) {
          this.$message('Successfully deleted');
          this.getHotel();
        } else {
          this.$message('Failed');
        }
      });
    },
    setPage(val) {
      this.page = val;
    },
  },
};

</script>
