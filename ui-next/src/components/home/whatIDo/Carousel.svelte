<script lang="ts">
  import { onMount } from "svelte";
  import Flickity from "flickity";
  import "flickity-fullscreen";
  import "flickity-fullscreen/fullscreen.css";
  import "flickity-imagesloaded";
  import { Resize } from "@cloudinary/url-gen/actions";
  import info from "@/info.json";
  import cld from "@/utils/cloudinary.ts";

  const { carousel } = info.home.photography;

  const images = carousel.map(c =>
    cld.image(c).resize(Resize.scale("auto")).toURL(),
  );

  onMount(() => {
    new Flickity(".carousel", {
      wrapAround: true,
      autoPlay: true,
      lazyLoad: true,
      imagesLoaded: true,
      pageDots: false,
      cellAlign: "center",
      // @ts-ignore
      fullscreen: true,
    });
  });
</script>

<div class="carousel overflow-hidden">
  {#each images as img}
    <img src={img} class="absolute inset-0 block rounded-2xl px-2" />
  {/each}
</div>
