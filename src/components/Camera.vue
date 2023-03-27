<script>
export default {
  name: 'Camera',
  emits: ['imageCaptured'],
  data() {
    return {
      stream: null,
      imageData: null,
    }
  },
  mounted() {
    this.initCamera()
  },
  beforeUnmount() {
    if (this.stream)
      this.stream.getTracks().forEach(track => track.stop())
  },
  methods: {
    async initCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true })
        this.$refs.video.srcObject = this.stream
      }
      catch (err) {
        console.error('Could not access camera', err)
      }
    },
    capture() {
      const video = this.$refs.video
      const canvas = this.$refs.canvas
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageData = canvas.toDataURL()
      this.$emit('imageCaptured', this.imageData)
    },
  },
}
</script>

<template>
  <div class="camera">
    <video ref="video" autoplay />
    <button @click="capture">
      Capture
    </button>
    <canvas ref="canvas" />
  </div>
</template>

<style>
.camera {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

video {
  max-width: 100%;
  max-height: 100%;
}

canvas {
  display: none;
}
</style>
