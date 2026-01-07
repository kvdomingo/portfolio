import { createFileRoute } from '@tanstack/react-router'
import { buildCldUrl } from '@/utils/cloudinary.client'
import PhotographyLayout from '@/components/PhotographyLayout'

const photographyGear: Record<string, { name: string; publicId: string }[]> = {
  Camera: [
    { name: "Nikon D750", publicId: "NikonD750" },
    { name: "Nikon Z50", publicId: "NikonZ50" },
    { name: "Nikon F100", publicId: "NikonF100" },
    { name: "Nikon D3400", publicId: "NikonD3400" },
    { name: "Asahi Pentax ME", publicId: "AsahiPentaxME" },
    { name: "Yashica Half 17", publicId: "YashicaHalf17" },
    { name: "Instax Mini 99", publicId: "InstaxMini99" },
  ],
  Lens: [
    { name: "Nikon AF-S 24-120mm f/4G ED VR", publicId: "Nikon24-120f4" },
    { name: "Nikon Z DX 16-50mm f/3.5-6.3 VR", publicId: "Nikon16-50f3.5-6.3" },
    { name: "Nikon Z DX 24mm f/1.7", publicId: "NikonZDX24f1.7" },
    { name: "Sigma Art 35mm f/1.4 DG HSM", publicId: "SigmaArt35mmf1.4" },
    { name: "Nikon AF-S DX 35mm f/1.8G", publicId: "Nikon35f1.8g" },
    { name: "Nikon AF-S 50mm f/1.4G", publicId: "Nikon50f1.4g" },
    { name: "Nikon AF-S 50mm f/1.8G", publicId: "Nikon50f1.8g" },
    { name: "Nikon AF-S 85mm f/1.8G", publicId: "Nikon85f1.8g" },
    { name: "Sigma Art 18-35mm f/1.8 DC HSM", publicId: "SigmaArt18-35mmf1.8" },
    { name: "Tamron 18-400mm f/3.5-6.3 Di II VC HLD", publicId: "Tamron18-400f3.5-6.3" },
    { name: "Sigma 24-70mm f/2.8 EX DG HSM", publicId: "Sigma24-70f2.8" },
    { name: "Nikon AF-P DX 70-300mm f/4.5-6.3G ED VR", publicId: "Nikon70-300f4.5-6.3g" },
    { name: "Nikon AF-P DX 18-55mm f/3.5-5.6G VR", publicId: "Nikon18-55f3.5-5.6g" },
  ],
  Adapters: [
    { name: "Nikon FTZ II", publicId: "NikonFTZII" },
    { name: "Meike N-AF1", publicId: "MeikeNAF1" },
  ],
}

export const Route = createFileRoute('/photography/gear')({
  component: Gear,
})

function Gear() {
  return (
    <PhotographyLayout>
      <div className="container flex flex-col gap-8 pb-12">
        {Object.entries(photographyGear).map(([section, gears]) => (
          <div key={section}>
            <h4 className="text-xl font-bold mb-4">{section}</h4>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {gears.map(gear => {
                const url = buildCldUrl(`kdphotography/portfolio/static/portfolio/media-private/gear/${gear.publicId}`)
                return (
                  <li key={gear.publicId} className="flex h-full flex-col items-center justify-center rounded-md border border-solid border-ctp-subtext0">
                    <img
                      src={url}
                      alt={gear.name}
                      className="aspect-square w-full rounded-t-md object-cover"
                    />
                    <div className="flex h-16 w-full items-center justify-center p-4 text-center">
                      <p className="break-words">{gear.name}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </PhotographyLayout>
  )
}
