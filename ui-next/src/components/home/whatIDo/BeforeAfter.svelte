<script lang="ts">
  import cld from "@/utils/cloudinary.ts";
  import { Resize } from "@cloudinary/url-gen/actions";
  import * as juxtapose from "juxtaposejs/build/js/juxtapose.min.js";
  import "juxtaposejs/build/css/juxtapose.css";
  import { onMount } from "svelte";

  const before = cld
    .image("svip/186/7-ImageSegment/cancer")
    .resize(Resize.scale().width("auto"))
    .toURL();
  const after = cld
    .image("svip/186/7-ImageSegment/cancer_otsu")
    .resize(Resize.scale().width("auto"))
    .toURL();

  onMount(() => {
    new juxtapose.JXSlider(
      "#juxtapose",
      [
        {
          src: before,
          label: "before",
        },
        {
          src: after,
          label: "after",
        },
      ],
      {
        animate: true,
        showLabels: false,
        showCredits: false,
        startingPosition: "30%",
        makeResponsive: true,
      },
    );
  });
</script>

<div id="juxtapose" class="juxtapose" />
