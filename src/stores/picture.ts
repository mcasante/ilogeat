import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePictureStore = defineStore('picture', () => {
  /**
   * Current name of the user.
   */
  const savedPicture = ref<string | ArrayBuffer | null>('')

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setData(imageData: string | ArrayBuffer | null) {
    savedPicture.value = imageData
  }

  return {
    setData,
    savedPicture,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePictureStore, import.meta.hot))
