import type {
  AmenityDoc,
  ApartmentDetail,
  ApartmentListItem,
  HomePage,
  SiteSettings,
} from "./types";

/**
 * Offline fixtures mirroring seed content when Sanity project ID is missing
 * or fetch fails. Do not hardcode this data inside React components — import
 * via `lib/sanity/fetch.ts` only.
 *
 * Images live under `public/images/` so UI review works offline / behind
 * firewalls that block stock CDN hosts (e.g. Unsplash).
 */

const local = (file: string) => `/images/${file}`;

export const fallbackAmenities: AmenityDoc[] = [
  {
    _id: "amenity-wifi",
    title: { vi: "Internet", en: "Internet access" },
    icon: "wifi",
  },
  {
    _id: "amenity-ac",
    title: { vi: "Máy lạnh", en: "Air conditioning" },
    icon: "ac",
  },
  {
    _id: "amenity-kitchen",
    title: { vi: "Bếp", en: "Kitchen" },
    icon: "kitchen",
  },
  {
    _id: "amenity-tv",
    title: { vi: "TV màn hình phẳng", en: "Flat TV" },
    icon: "tv",
  },
  {
    _id: "amenity-balcony",
    title: { vi: "Ban công", en: "Balcony" },
    icon: "balcony",
  },
  {
    _id: "amenity-washer",
    title: { vi: "Máy giặt", en: "Washing machine" },
    icon: "washer",
  },
  {
    _id: "amenity-garden",
    title: { vi: "Vườn xanh", en: "Garden" },
    icon: "garden",
  },
  {
    _id: "amenity-parking",
    title: { vi: "Chỗ đậu xe", en: "Parking" },
    icon: "parking",
  },
];

export const fallbackSiteSettings: SiteSettings = {
  brandName: { vi: "PML Resort", en: "PML Resort" },
  phone: "0908 985 844",
  phoneE164: "+84908985844",
  zaloUrl: "https://zalo.me/0908985844",
  email: "pmluanvn@gmail.com",
  address: {
    vi: "208 Trường Chinh, Phường Tân Bình, TP.Hồ Chí Minh",
    en: "208 Truong Chinh, Tan Binh Ward, Ho Chi Minh City",
  },
  seo: {
    title: {
      vi: "PML Resort — Căn hộ tham khảo",
      en: "PML Resort — Apartment reference",
    },
    description: {
      vi: "Tham khảo căn hộ và liên hệ PML Resort. Không mua bán trực tuyến.",
      en: "Browse apartments and contact PML Resort. Inquiry only.",
    },
  },
};

const apt = (
  partial: ApartmentDetail,
): ApartmentDetail => partial;

export const fallbackApartments: ApartmentDetail[] = [
  apt({
    _id: "apartment-sky-residence",
    title: { vi: "Sky Residence", en: "Sky Residence" },
    slug: "sky-residence",
    status: "available",
    location: {
      vi: "Tầng cao · view thành phố",
      en: "High floor · city view",
    },
    priceLabel: { vi: "Liên hệ", en: "Contact for price" },
    summary: {
      vi: "Căn hộ sáng sủa với không gian mở và ban công rộng.",
      en: "A bright residence with an open plan and generous balcony.",
    },
    specs: { bedrooms: 2, bathrooms: 2, areaM2: 78, floor: "18" },
    featured: true,
    order: 1,
    heroImage: {
      url: local("res-classic.jpg"),
      alt: {
        vi: "Phòng khách Sky Residence",
        en: "Sky Residence living room",
      },
    },
    gallery: [
      {
        url: local("res-classic.jpg"),
        alt: { vi: "Phòng khách", en: "Living room" },
      },
      {
        url: local("sky-bedroom.jpg"),
        alt: { vi: "Phòng ngủ", en: "Bedroom" },
      },
      {
        url: local("sky-kitchen.jpg"),
        alt: { vi: "Bếp", en: "Kitchen" },
      },
      {
        url: local("gal-01.jpg"),
        alt: { vi: "Hành lang", en: "Hallway" },
      },
      {
        url: local("gal-02.jpg"),
        alt: { vi: "Góc ngồi", en: "Lounge" },
      },
      {
        url: local("gal-03.jpg"),
        alt: { vi: "Chi tiết", en: "Detail" },
      },
    ],
    rooms: [
      {
        _key: "sky-living",
        title: { vi: "Phòng khách", en: "Living Room" },
        description: {
          vi: "Thiết kế hiện đại, ấm cúng — TV 4K, ánh sáng ẩn và sofa rộng tạo không gian thư giãn đúng nghĩa.",
          en: "Modern design with comfort at its core — a large 4K TV, hidden lighting, and a generous sofa for quiet evenings.",
        },
        images: [
          {
            url: local("res-classic.jpg"),
            alt: { vi: "Phòng khách", en: "Living room" },
          },
          {
            url: local("gal-01.jpg"),
            alt: { vi: "Chi tiết trang trí", en: "Decor detail" },
          },
          {
            url: local("gal-02.jpg"),
            alt: { vi: "Góc ngồi", en: "Lounge corner" },
          },
          {
            url: local("gal-03.jpg"),
            alt: { vi: "Ánh sáng", en: "Lighting" },
          },
          {
            url: local("sky-living.jpg"),
            alt: { vi: "Góc bàn", en: "Table detail" },
          },
        ],
      },
      {
        _key: "sky-kitchen",
        title: { vi: "Bếp", en: "Kitchen" },
        description: {
          vi: "Không gian bếp rộng, đường nét sạch — đầy đủ dụng cụ nấu và máy pha cà phê cho ngày mới.",
          en: "A generous kitchen with clean lines — complete cookware and a coffee machine for slow mornings.",
        },
        images: [
          {
            url: local("sky-kitchen.jpg"),
            alt: { vi: "Bếp", en: "Kitchen" },
          },
          {
            url: local("gal-04.jpg"),
            alt: { vi: "Quầy bếp", en: "Counter" },
          },
          {
            url: local("gal-05.jpg"),
            alt: { vi: "Chi tiết bếp", en: "Kitchen detail" },
          },
        ],
      },
      {
        _key: "sky-bedroom",
        title: { vi: "Phòng ngủ", en: "Bedroom" },
        description: {
          vi: "Phòng ngủ dịu ánh sáng, giường êm và góc nghỉ riêng tư sau ngày dài.",
          en: "A restful bedroom with soft light, a comfortable bed, and a private corner after long days.",
        },
        images: [
          {
            url: local("sky-bedroom.jpg"),
            alt: { vi: "Phòng ngủ", en: "Bedroom" },
          },
          {
            url: local("gal-06.jpg"),
            alt: { vi: "Góc nghỉ", en: "Rest corner" },
          },
        ],
      },
    ],
    amenities: fallbackAmenities.slice(0, 6),
    body: {
      vi: [
        {
          _type: "block",
          _key: "vi1a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi1as",
              text: "Sky Residence hướng đến nhịp sống nhẹ nhàng với ánh sáng tự nhiên suốt ngày và tông đất ấm.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi1b",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi1bs",
              text: "Ban công rộng mở tầm nhìn thành phố, trong khi nội thất hiện đại giữ không gian vừa thoáng vừa gần gũi.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi1c",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi1cs",
              text: "Đây là nơi làm mới nhịp sống giữa đô thị — yên tĩnh, thực tế và đủ tiện nghi cho ngày dài.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi1d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi1ds",
              text: "Phòng khách sáng, bếp gọn và phòng ngủ êm tạo một nhịp sống hoàn chỉnh cho gia đình nhỏ hoặc làm việc từ xa.",
              marks: [],
            },
          ],
        },
      ],
      en: [
        {
          _type: "block",
          _key: "en1a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en1as",
              text: "Sky Residence favours a calm daily rhythm with natural light throughout the day and warm earthy tones.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en1b",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en1bs",
              text: "A generous balcony opens to the city, while modern furnishings keep the plan both airy and intimate.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en1c",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en1cs",
              text: "It is a place of renewal in the urban core — quiet, practical, and equipped for long days.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en1d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en1ds",
              text: "A bright living room, compact kitchen, and restful bedrooms form a complete rhythm for a small household or remote work.",
              marks: [],
            },
          ],
        },
      ],
    },
  }),
  apt({
    _id: "apartment-garden-suite",
    title: { vi: "Garden Suite", en: "Garden Suite" },
    slug: "garden-suite",
    status: "available",
    location: {
      vi: "Gần sân vườn · tầng thấp",
      en: "Garden side · lower floor",
    },
    priceLabel: { vi: "Liên hệ", en: "Contact for price" },
    summary: {
      vi: "Không gian ấm cúng, kết nối gần với khu xanh của khuôn viên.",
      en: "A warm suite close to the property’s green courtyard.",
    },
    specs: { bedrooms: 1, bathrooms: 1, areaM2: 52, floor: "3" },
    featured: true,
    order: 2,
    heroImage: {
      url: local("res-mini.jpg"),
      alt: {
        vi: "Garden Suite nhìn ra sân",
        en: "Garden Suite overlooking courtyard",
      },
    },
    gallery: [
      {
        url: local("res-mini.jpg"),
        alt: { vi: "Không gian chính", en: "Main space" },
      },
      {
        url: local("garden-kitchen.jpg"),
        alt: { vi: "Bếp mở", en: "Open kitchen" },
      },
      {
        url: local("gal-04.jpg"),
        alt: { vi: "Ánh sáng", en: "Light" },
      },
      {
        url: local("gal-05.jpg"),
        alt: { vi: "Nội thất", en: "Interior" },
      },
      {
        url: local("gal-06.jpg"),
        alt: { vi: "Góc nghỉ", en: "Lounge" },
      },
    ],
    rooms: [
      {
        _key: "garden-main",
        title: { vi: "Không gian chính", en: "Living Room" },
        description: {
          vi: "Không gian ấm gần sân vườn — ánh sáng dịu và nội thất gần gũi cho nhịp sống chậm.",
          en: "A warm living space by the courtyard — soft light and intimate furnishings for a slower pace.",
        },
        images: [
          {
            url: local("res-mini.jpg"),
            alt: { vi: "Không gian chính", en: "Main space" },
          },
          {
            url: local("garden-main.jpg"),
            alt: { vi: "Góc ngồi", en: "Sitting area" },
          },
          {
            url: local("gal-06.jpg"),
            alt: { vi: "Góc nghỉ", en: "Lounge" },
          },
        ],
      },
      {
        _key: "garden-kitchen",
        title: { vi: "Bếp", en: "Kitchen" },
        description: {
          vi: "Bếp mở gọn gàng, đủ dụng cụ và ánh sáng ấm cho bữa ăn hàng ngày.",
          en: "A compact open kitchen with warm light and everything needed for daily meals.",
        },
        images: [
          {
            url: local("garden-kitchen.jpg"),
            alt: { vi: "Bếp mở", en: "Open kitchen" },
          },
          {
            url: local("gal-04.jpg"),
            alt: { vi: "Ánh sáng", en: "Light" },
          },
          {
            url: local("gal-05.jpg"),
            alt: { vi: "Nội thất", en: "Interior" },
          },
        ],
      },
    ],
    amenities: [
      fallbackAmenities[2],
      fallbackAmenities[0],
      fallbackAmenities[3],
      fallbackAmenities[4],
      fallbackAmenities[6],
    ],
    body: {
      vi: [
        {
          _type: "block",
          _key: "vi2a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi2as",
              text: "Garden Suite phù hợp cho nhịp sống chậm, gần thiên nhiên trong đô thị.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi2b",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi2bs",
              text: "Tone ấm và chi tiết trang trí làm nổi bật sự gần gũi của căn hộ tầng thấp.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi2c",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi2cs",
              text: "Không gian mở kết nối dễ dàng với khu xanh của khuôn viên — lý tưởng để nghỉ ngơi sau ngày bận rộn.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi2d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi2ds",
              text: "Bếp mở và góc ngồi đọc sách tạo cảm giác như một ngôi nhà nhỏ đúng nghĩa.",
              marks: [],
            },
          ],
        },
      ],
      en: [
        {
          _type: "block",
          _key: "en2a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en2as",
              text: "Garden Suite suits a slower pace, close to greenery in the city.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en2b",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en2bs",
              text: "Warm tones and careful details highlight the intimacy of a lower-floor residence.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en2c",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en2cs",
              text: "An open plan connects easily to the courtyard — ideal for rest after a busy day.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en2d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en2ds",
              text: "An open kitchen and a quiet reading corner feel like a small home in the true sense.",
              marks: [],
            },
          ],
        },
      ],
    },
  }),
  apt({
    _id: "apartment-horizon-loft",
    title: { vi: "Horizon Loft", en: "Horizon Loft" },
    slug: "horizon-loft",
    status: "reserved",
    location: {
      vi: "Penthouse · panorama",
      en: "Penthouse · panorama",
    },
    priceLabel: { vi: "Liên hệ", en: "Contact for price" },
    summary: {
      vi: "Loft cao với trần thông thoáng và tầm nhìn rộng.",
      en: "A lofty plan with generous ceiling height and wide views.",
    },
    specs: { bedrooms: 3, bathrooms: 2, areaM2: 118, floor: "PH" },
    featured: true,
    order: 3,
    heroImage: {
      url: local("res-village.jpg"),
      alt: {
        vi: "Horizon Loft phòng khách",
        en: "Horizon Loft living area",
      },
    },
    gallery: [
      {
        url: local("res-village.jpg"),
        alt: { vi: "Không gian loft", en: "Loft living" },
      },
      {
        url: local("horizon-bath.jpg"),
        alt: { vi: "Phòng tắm", en: "Bathroom" },
      },
      {
        url: local("horizon-terrace.jpg"),
        alt: { vi: "Ban công", en: "Terrace" },
      },
      {
        url: local("gal-01.jpg"),
        alt: { vi: "Phòng khách", en: "Living room" },
      },
      {
        url: local("gal-04.jpg"),
        alt: { vi: "Ánh sáng", en: "Light" },
      },
      {
        url: local("hero-arch.jpg"),
        alt: { vi: "Cửa sổ", en: "Window" },
      },
    ],
    rooms: [
      {
        _key: "horizon-living",
        title: { vi: "Không gian loft", en: "Living Room" },
        description: {
          vi: "Trần cao và ánh sáng xuyên suốt — không gian loft phóng khoáng cho sinh hoạt và tiếp khách.",
          en: "High ceilings and continuous light — a generous loft living area for daily life and hosting.",
        },
        images: [
          {
            url: local("res-village.jpg"),
            alt: { vi: "Không gian loft", en: "Loft living" },
          },
          {
            url: local("horizon-loft.jpg"),
            alt: { vi: "Góc loft", en: "Loft corner" },
          },
          {
            url: local("gal-01.jpg"),
            alt: { vi: "Phòng khách", en: "Living room" },
          },
          {
            url: local("hero-arch.jpg"),
            alt: { vi: "Cửa sổ", en: "Window" },
          },
        ],
      },
      {
        _key: "horizon-bath",
        title: { vi: "Phòng tắm", en: "Bathroom" },
        description: {
          vi: "Phòng tắm riêng với vật liệu tự nhiên và ánh sáng dịu.",
          en: "A private bath with natural materials and soft light.",
        },
        images: [
          {
            url: local("horizon-bath.jpg"),
            alt: { vi: "Phòng tắm", en: "Bathroom" },
          },
          {
            url: local("gal-04.jpg"),
            alt: { vi: "Ánh sáng", en: "Light" },
          },
        ],
      },
      {
        _key: "horizon-terrace",
        title: { vi: "Ban công", en: "Terrace" },
        description: {
          vi: "Ban công rộng mở panorama — nơi ngắm thành phố vào buổi tối.",
          en: "A wide terrace with panoramic views — evenings overlooking the city.",
        },
        images: [
          {
            url: local("horizon-terrace.jpg"),
            alt: { vi: "Ban công", en: "Terrace" },
          },
        ],
      },
    ],
    amenities: fallbackAmenities,
    body: {
      vi: [
        {
          _type: "block",
          _key: "vi3a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi3as",
              text: "Horizon Loft dành cho ai muốn không gian rộng và ánh sáng xuyên suốt.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi3b",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi3bs",
              text: "Trần cao và tầm nhìn panorama tạo cảm giác phóng khoáng hiếm có trong đô thị.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi3c",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi3cs",
              text: "Nội thất tối giản nhấn mạnh đường nét kiến trúc và chất liệu tự nhiên.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "vi3d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "vi3ds",
              text: "Ban công rộng và phòng tắm riêng cho từng khu vực nghỉ tạo trải nghiệm sống đầy đủ.",
              marks: [],
            },
          ],
        },
      ],
      en: [
        {
          _type: "block",
          _key: "en3a",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en3as",
              text: "Horizon Loft is for those who want volume and light in equal measure.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en3b",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en3bs",
              text: "High ceilings and panoramic views create a rare sense of openness in the city.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en3c",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en3cs",
              text: "Minimal furnishings emphasise architectural lines and natural materials.",
              marks: [],
            },
          ],
        },
        {
          _type: "block",
          _key: "en3d",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "en3ds",
              text: "A wide terrace and dedicated baths for each sleeping area complete the living experience.",
              marks: [],
            },
          ],
        },
      ],
    },
  }),
];

export const fallbackApartmentCards: ApartmentListItem[] =
  fallbackApartments.map(
    ({ amenities: _a, gallery: _g, rooms: _r, body: _b, ...card }) => card,
  );

export const fallbackHomePage: HomePage = {
  hero: {
    headline: {
      vi: "không đâu bằng",
      en: "there is no place like",
    },
    subcopy: {
      vi: "Tham khảo căn hộ và liên hệ đội ngũ PML Resort.",
      en: "Browse reference apartments and reach the PML Resort team.",
    },
    image: {
      url: local("hero-arch.jpg"),
      alt: {
        vi: "Nội thất PML Resort",
        en: "PML Resort interior",
      },
    },
    ctaTarget: "contact",
  },
  intro: {
    title: { vi: "deco.", en: "deco." },
    body: {
      vi: "Bộ sưu tập căn hộ được chọn lọc — chú trọng sự thoải mái, phong cách và công năng, để bạn hình dung không gian sống của mình.",
      en: "Our collection of select residences, designed with an emphasis on comfort, style, and functionality, offers you a unique stay.",
    },
  },
  featuredApartments: fallbackApartmentCards,
  galleryTitle: { vi: "gallery.", en: "gallery." },
  gallery: [
    { url: local("gal-01.jpg"), alt: { vi: "Phòng khách", en: "Living" } },
    { url: local("gal-02.jpg"), alt: { vi: "Không gian", en: "Space" } },
    { url: local("gal-03.jpg"), alt: { vi: "Chi tiết", en: "Detail" } },
    { url: local("gal-04.jpg"), alt: { vi: "Ánh sáng", en: "Light" } },
    { url: local("gal-05.jpg"), alt: { vi: "Nội thất", en: "Interior" } },
    { url: local("gal-06.jpg"), alt: { vi: "Góc nghỉ", en: "Lounge" } },
    {
      url: local("hero-arch.jpg"),
      alt: { vi: "Cửa sổ", en: "Window" },
    },
    {
      url: local("res-classic.jpg"),
      alt: { vi: "Residence", en: "Residence" },
    },
  ],
  amenitiesIntro: {
    title: { vi: "amenities.", en: "amenities." },
    body: {
      vi: "Mỗi căn mang một trải nghiệm riêng.",
      en: "Each accommodation offers a distinct experience.",
    },
  },
  amenities: fallbackAmenities,
};
