<script lang="ts">
  import { onMount } from "svelte";
  import Masonry from "masonry-layout";
  import ImagesLoaded from "imagesloaded";

  export let images: Array<Record<string, any>>;

  onMount(() => {
    function onAlways() {
      masonry.layout && masonry.layout();
    }

    const masonry = new Masonry(".gallery", {
      itemSelector: ".gallery-item",
      percentPosition: true,
      columnWidth: ".gallery-sizer",
      horizontalOrder: true,
    });

    const imagesLoaded = ImagesLoaded(".gallery");

    imagesLoaded.on("progress", onAlways);
    imagesLoaded.on("done", onAlways);
    imagesLoaded.on("always", onAlways);
  });
</script>

<div class="px-4">
  <div class="gallery">
    <div class="gallery-sizer"></div>
    {#each images as image}
      <div class="gallery-item p-2" data-aos="fade-up">
        <img
          src={image.secure_url}
          class={`w-full cursor-pointer rounded drop-shadow-lg aspect-[${(
            image.width / image.height
          ).toFixed(2)}]`}
          alt={image.public_id}
        />
      </div>
    {/each}
  </div>
</div>
