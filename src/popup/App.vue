<template>
  <div v-if='status == "new"'>

    <div class="container" v-if='boards'>
      <div class="boards">
        <h1>Moonboard</h1>
        <ul>
          <li
            v-for='board in boards'
            :key="board.id"
            >

            <a href="#" @click="sendImage(board)">
              {{board.title}}
            </a>
          </li>
        </ul>
      </div>
      <div class="image">
        <img :src="image"/>
      </div>
    </div>

  </div>
  <div v-else-if='status == "sending"'>
    sending...
  </div>
  <div v-else-if='status == "success"'>
    success!
  </div>
  <div v-else-if='status == "error"'>
    error!
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        boards: null,
        image: null,
        status: 'new'
      }
    },
    mounted() {
        let uri = window.location.search.substring(1); 
        let params = new URLSearchParams(uri);
        this.image = params.get("image_url");

        axios.get(`http://localhost:3000/api/boards/`).then((response) => {
          this.boards = response.data
        }
      );
    },
    methods: {
      sendImage: function(board) {
        this.status = 'sending'
        axios.post(`http://localhost:3000/items/`, {
            board_id: board.id,
            image_url: this.image
          }).then((response) => {
          if (response.status == 200) {
            this.status = 'success'
          }
          else {
            this.status = 'error'
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  html, body {
    font-size: 16px;
  }

  a, h1 {
    color: #007bff;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 0 0.625rem 0;
  }

  .container {
    display: flex;
    justify-content: space-between;
    max-width: 600px;
  }

  .boards {
  }

  .image {
    display: flex;
    max-width: 250px;
    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
</style>
