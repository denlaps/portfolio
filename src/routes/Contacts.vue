<template>
  <div class="container">
    <section class="form-block">
      <form ref="sendForm" action="">
        <h2>Свяжитесь со мной</h2>
        <section class="form-block__contacts">
          <a href="mailto:denlapt@gmail.com">denlapt@gmail.com</a><br>
          <a href="tel:+79536820612">+7(953)-682-06-12</a>
        </section>
        <input type="text" name="name" placeholder="Ваше имя">
        <input type="email" name="email" placeholder="Ваш email">
        <textarea name="message" id="" placeholder="Ваше сообщение"></textarea>
        <button ref="sendBtn">Отправить</button>
        <p class="statusInfo" ref="sendStatus"></p>
      </form>
    </section>
    <section class="map-block" id="map">
      <GmapMap
        :center="{lat: 59.866523, lng: 30.321005}"
        :zoom="16"
        map-type-id="roadmap"
        style="width: 100%; height: 100%"
        :options="{
          backgroundColor: '#FEBB36',
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false,
          styles: styleArr
        }"
      />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleArr: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]
    }
  },

  mounted() {
    this.$refs.sendForm.addEventListener('submit', this.sendData);
  },

  methods: {
    onSuccess() {
      this.$refs.sendForm.reset();
      this.$refs.sendBtn.style = "display: none ";
      this.$refs.sendStatus.innerHTML = "Спасибо :)";
    },

    onError() {
      this.$refs.sendStatus.innerHTML = "Форма не отправилась! Попробуйте позже!";
    },

    sendData(ev) {
      ev.preventDefault();
      var data = new FormData(this.$refs.sendForm);
      this.ajax(data, this.onSuccess, this.onError);
    },

    ajax(data, success, error) {
      const method = 'POST';
      const url = 'https://formspree.io/xnqgnvbr';
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          success(xhr.response, xhr.responseType);
        } else {
          error(xhr.status, xhr.response, xhr.responseType);
        }
      };
      xhr.send(data);
    }
  }
}
</script>

<style lang="scss">
  .page__contacts {
    .container {
      section {
        &.map-block {
          top: 0;
          right: 0;
          height: 100%;
          position: absolute;
          z-index: 3;
        }

        &.form-block {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;

          &__contacts {
            display: block;
            margin-top: 10px;
            margin-bottom: 20px;

            a {
              display: inline-block;
              margin-bottom: 10px;

              &:hover {
                text-decoration: underline;
              }
            }
          }
          
          form {
            display: flex;
            flex-direction: column;
            color: $goldColor;

            h2 {
              font-family: 'Montserrat';
              color: $goldColor;
              font-size: 43px;
              line-height: 1;
              margin-bottom: 15px;
            }

            input, textarea {
              background: #fff;
              opacity: 0.14;
              border: 0;
              color: #1F3033;
              font-size: 16px;
              font-weight: bold;
              font-family: 'Montserrat', Arial;
              outline: none;
              max-width: 400px;
              width: 100%;
              transition: opacity $trDelay;

              &:focus {
                opacity: 0.50;
              }

              &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #1F3033;
                opacity: 1; /* Firefox */
              }

              &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #1F3033;
              }

              &::-ms-input-placeholder { /* Microsoft Edge */
                color: #1F3033;
              }
            }

            input {
              text-indent: 13px;
              height: 51px;
              display: flex;
              align-items: center;
              margin-bottom: 15px;
            }

            textarea {
              padding: 13px;
              min-height: 100px;
            }

            button {
              background: #FEBB36;
              box-shadow: 0px 2px 0px #866118;
              font-family: 'Montserrat';
              font-weight: bold;
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #253D37;
              max-width: 400px;
              margin-top: 20px;
              padding: 15px 0;
              transition: background-color $trDelay, box-shadow $trDelay;

              &:hover {
                background: #fff;
                box-shadow: 0px 2px 0px #828282;
              }
            }

            .statusInfo {
              text-align: center;
              padding: 20px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
</style>