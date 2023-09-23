<script lang="ts">
  import { Resize } from "@cloudinary/url-gen/actions";
  import cld from "@/utils/cloudinary.ts";
  import { onMount } from "svelte";

  const LIGHT_LOGO = cld
    .image("logo/logo-white")
    .resize(Resize.scale().width("auto"))
    .toURL();

  const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About/CV" },
  ];

  const PORTFOLIO_LINKS = [
    { path: "/photography", label: "Photography" },
    { path: "/dev", label: "Software" },
    { path: "/svip", label: "Video/Image Processing" },
  ];

  let isHome = true;

  $: isHome = window.location.pathname === "/";

  onMount(() => {
    const header = document.querySelector("header")!;
    if (isHome) header.style.position = "fixed";
  });
</script>

<header class="z-10 w-full">
  <nav
    class="bg-gradient-to-r from-indigo-950/25 to-slate-900/25 px-12 backdrop-blur-md transition-all duration-300 ease-in-out"
  >
    <div class="flex">
      <div class="flex flex-auto items-center">
        <a href="/">
          <img
            src={LIGHT_LOGO}
            alt="logo"
            class="opacity-1 my-2 h-[70px] w-auto transition-all duration-300 ease-in-out"
          />
        </a>
      </div>

      <ul
        class="md:menu md:menu-horizontal section-header hidden flex-auto items-center justify-end gap-6 md:visible md:flex"
      >
        {#each NAV_LINKS as nav}
          <li>
            <a href={nav.path}>
              {nav.label}
            </a>
          </li>
        {/each}
        <li>
          <details>
            <summary>Portfolio</summary>
            <ul>
              {#each PORTFOLIO_LINKS as port}
                <li>
                  <a href={port.path}>
                    {port.label}
                  </a>
                </li>
              {/each}
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </nav>
</header>
