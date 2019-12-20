<template>
  <div class="timer">
      <div class="message">{{ message }}</div>
    <div class="status-tag" :class="statusType">{{ statusText }}</div>

    <div v-if="statusType !== 'expired'">
      <div class="day">
        <span class="number">{{ days }}</span>
        <div class="format">{{ wordString.day }}</div>
      </div>
      <div class="hour">
        <span class="number">{{ hours }}</span>
        <div class="format">{{ wordString.hours }}</div>
      </div>
      <div class="min">
        <span class="number">{{ minutes }}</span>
        <div class="format">{{ wordString.minutes }}</div>
      </div>
      <div class="sec">
        <span class="number">{{ seconds }}</span>
        <div class="format">{{ wordString.seconds }}</div>
      </div>
    </div>

    <div v-else>
         <div class="day">
        <span class="number">0</span>
        <div class="format">{{ wordString.day }}</div>
      </div>
      <div class="hour">
        <span class="number">0</span>
        <div class="format">{{ wordString.hours }}</div>
      </div>
      <div class="min">
        <span class="number">0</span>
        <div class="format">{{ wordString.minutes }}</div>
      </div>
      <div class="sec">
        <span class="number">0</span>
        <div class="format">{{ wordString.seconds }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://backend.easyhackctf.com"

export default {
  name: "timer",

  props: ["trans"],
  data: function() {
    return {
      timer: "",
      wordString: {},
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      message: "",
      statusType: "",
      statusText: ""
    };
  },
  created: function() {
    this.wordString = JSON.parse(this.trans);
  },
  mounted() {

    axios.get("/api/ctf")
    .then(resp => {
      let ctf = resp.data.ctfs[0];

      this.start = new Date(ctf.startDate).getTime();
      this.end = new Date(ctf.finishDate).getTime();
      this.$forceUpdate();
    }).catch(err => {
      console.log(err);
    })


    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start, end) {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.message = this.wordString.expired;
        this.statusType = "expired";
        this.statusText = this.wordString.status.expired;
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
        this.message = this.wordString.running;
        this.statusType = "running";
        this.statusText = this.wordString.status.running;
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
        this.message = this.wordString.upcoming;
        this.statusType = "upcoming";
        this.statusText = this.wordString.status.upcoming;
      }
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }
  }
};
</script>

<style>
.timer {
  margin-bottom: 15px;

}
.day, .hour, .min, .sec {
        font-size: 30px;
        display: inline-block;
        font-weight: 500;
        text-align: center;
        margin: 0 10px;
      }
.format {
          font-weight: 400;
          font-size: 14px;
          opacity: 0.8;
          width: 70px;
          font-size:17px;
}

.number{
        background: white;
        color:#3D3D3D;
        padding: 0 5px;
        border-radius: 5px;
        display: inline-block;
        width: 70px;
        height: 70px;
        font-size:50px;
        text-align: center;
 }
.message {
        font-size: 14px;
        font-weight: 400;
        margin-top: 5px;
}
.status-tag{
        width: 270px;
        margin: 10px auto;
        padding: 8px 0;
        font-weight: 400;
        color: #fff;
        text-align: center;
        font-size:20px;
        
}

@media only screen and (max-width: 680px ){

    .format {
          font-weight: 400;
          font-size: 14px;
          opacity: 0.8;
          width: 60px;
          font-size:15px;
}


.number{
        background: white;
        color:#3D3D3D;
        padding: 0 5px;
        border-radius: 5px;
        display: inline-block;
        width: 50px;
        height: 50px;
        font-size:35px;
        text-align: center;
 }

}
</style>