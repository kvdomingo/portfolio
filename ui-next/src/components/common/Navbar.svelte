<script lang="ts">
  import { Resize } from "@cloudinary/url-gen/actions";
  import cld from "@/utils/cloudinary";
  import { onMount } from "svelte";

  const LIGHT_LOGO = cld
    .image("logo/logo-white")
    .resize(Resize.scale().width("auto"))
    .toURL();

  const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About/CV" },
  ];

  let isHome = true;

  $: isHome = window.location.pathname === "/";

  onMount(() => {
    const header = document.querySelector("header")!;
    if (isHome) header.style.position = "fixed";
  });
</script>

<header class="w-full">
  <nav
    class="bg-gradient-to-r from-indigo-950/25 to-slate-900/25 px-12 backdrop-blur-md transition-all duration-300 ease-in-out"
  >
    <div class="flex">
      <div class="flex flex-auto items-center">
        <a href="/">
          <img
            src={LIGHT_LOGO}
            alt="logo"
            class="opacity-1 my-2 h-[70px] transition-all duration-300 ease-in-out"
          />
        </a>
      </div>
      <div class="flex flex-auto items-center justify-end gap-6">
        {#each NAV_LINKS as nav}
          <a href={nav.path}>
            <button class="section-header text-white">{nav.label}</button>
          </a>
        {/each}
        <button class="section-header text-white"> Portfolio</button>
      </div>
    </div>
  </nav>
</header>
