<script>
  /**
   * @type {string[]}
   */
  export let galleryImages = [];
  let galleryIndex = 0;
  let modalOpen = false;
  let modalImg = "";
  /**
   * @param {string} src
   */
  function showModal(src) {
    modalImg = src;
    modalOpen = true;
  }
  function prevImg() {
    galleryIndex =
      (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  }
  function nextImg() {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
  }
  function closeModal() {
    modalOpen = false;
  }
</script>

<div class="nomay-media-gallery" style="margin-bottom:32px;">
  <h3 style="margin-bottom:16px;">Media Gallery</h3>
  <div
    class="gallery-images"
    style="display:flex;flex-wrap:wrap;gap:32px;justify-content:center;"
  >
    {#each galleryImages as imgSrc}
      <img
        src={imgSrc}
        alt="Media Screenshot"
        style="max-width:220px;max-height:220px;border-radius:16px;box-shadow:0 4px 24px #ff228a33;transition:0.2s;cursor:pointer;margin-bottom:8px;outline:none;"
        on:click={() => showModal(imgSrc)}
        on:mouseover={(e) =>
          (e.currentTarget.style.boxShadow = "0 8px 32px #ff228a55")}
        on:mouseout={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 24px #ff228a33")}
      />
    {/each}
  </div>
  {#if modalOpen}
    <div
      style="display:flex;position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);align-items:center;justify-content:center;"
      on:click={closeModal}
    >
      <img
        src={modalImg}
        style="max-width:90vw;max-height:90vh;border-radius:16px;box-shadow:0 8px 40px #000b;"
      />
    </div>
  {/if}
</div>
