/* ==========================================================================
   Athens View Maldives – site data
   Edit this ONE file to change contact details, prices, rooms and excursions.
   Everything on every page (cards, booking totals, WhatsApp messages) reads it.
   ========================================================================== */
window.AV = {
  config: {
    name: 'Athens View Maldives',
    phoneDisplay: '+960 799 8877',        // PLACEHOLDER – replace with the real number
    phoneTel: '+9607998877',
    whatsapp: '9607998877',               // digits only, with country code, no "+"
    email: 'stay@athensviewmaldives.com', // PLACEHOLDER
    instagram: 'athensviewmaldives',
    address: 'Alivaage, Lainoofaru Magu, K. Guraidhoo 08080, Republic of Maldives',
    lat: 3.9, lng: 73.46833,              // Guraidhoo, Kaafu Atoll (approx. – fine-tune for the exact property)
    transferTime: '35 min',               // speedboat from Velana Int'l Airport – confirm with your operator
    transferPrice: 35,                    // USD per person, each way
    currency: '$',
    rating: '4.9',
    rateNote: 'All rates include breakfast, tax & green fee',
    // Optional: paste a Formspree / Getform endpoint (https://formspree.io/f/xxxx) to ALSO receive
    // bookings & enquiries by email in the background. Leave '' to use WhatsApp / mailto only.
    formEndpoint: ''
  },

  rooms: [
    {
      id: 'deluxe', name: 'Deluxe Ocean View Double', badge: 'Most Popular', badgeStyle: 'magenta',
      price: 85, size: 28, maxGuests: 2, photos: 12,
      short: 'Private balcony overlooking the turquoise reef.',
      desc: 'A bright haven featuring hand-crafted teak furniture, an inviting king bed, private sunset balcony facing the outer reef lagoon, and soothing coastal aesthetics.',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCbBERHk9LAzTXOGPDK-dkg-OUo7ij7osmxcXira5ACQeRYBhxK4HKyr8VsohFDYzE3m7gQoLQuhbn_TTc10k5qX3k2GjoyFL6eFmopd8niDjix7egmhVLyI5gGtHfzYKRJhUFOR6zffTweTmvjP6f2nlB878LT_BAg3tKOS-ox8JyrEAy0ZO9MD_STgCzSGX_MGAw1J4awvl4Lwvmjl1zeWPsdfb2oQzzVtwj6WdTh', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZRIhq3wxL1QjhA3kXkV2HKiyJ3JvArfgLRpo2EJBjhGXyvLpp-g2bjBveH29LcJ82zkrMsQDReH5tHwVoDfVE5fWtmYLkGcEzddFzmYKfmLUsq1uBdjhSni_jLu-dXF8nogr6ee-rQT1frzid4xa5yUQcesqy5mnTjXZfRcKmjgSlH5B0jl1zFE5iNVvVABwcFzzSKDL8iTBvbX6RDR6HDLFh3CxQNZ_FX3S19Xqy'],
      features: [
        { icon: 'bed', label: '1 King Bed' },
        { icon: 'balcony', label: 'Private Balcony' },
        { icon: 'ac_unit', label: 'Climate Control AC' },
        { icon: 'wifi', label: 'High-speed Wi-Fi' },
        { icon: 'shower', label: 'Rainfall En-suite' },
        { icon: 'free_cancellation', label: 'Daily Breakfast', accent: true }
      ],
      chips: [['ac_unit', 'AC'], ['wifi', 'Wi-Fi'], ['balcony', 'Balcony'], ['free_breakfast', 'Breakfast']]
    },
    {
      id: 'family', name: 'Family Island Suite', badge: 'Spacious Comfort', badgeStyle: 'teal',
      price: 135, size: 45, maxGuests: 4, photos: 16,
      short: 'Two sleeping areas, double terrace, snorkel gear.',
      desc: 'Designed for families or groups desiring generous living space. Features two conjoined sleeping quarters, double terrace balconies, and complimentary snorkel gear.',
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAwfPXuJprH-nXuaeAe88B5A17c5Y8vvtxC5k_XfpSAH8Gxw7wURNgGbAnw6nf9OvXyL0vi6af_6tFBPIFpFPyt86_1sA3YLPw-6bz4UWgE7VKUlx6jrNviLhZVVq1WA6ee5LGW-xha1uaKLxp5ScVhSezjzluc5T8ZNiqQ7P7OV6XrkXF6dq1cLO0hx3a4HWka72V1iOiLZlVux7PUCo3pmOGs2OWIL-g92nW80r-1', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDWIz2mg70qkpSdl-fTgxeBEn2cRxn76KT37i3t6AjhJRg57_X8Fjsv8mKfNWT2Vy6kKskyVKRIL75nS9weJ9MNS9kvGMeqsQLkxwtdjlHDGL3KytSzd1sIaOfmWQk1LiiODNEX17vOKb_Ig_8jKtcmz0FYSXxYgwT4upBAeoJAKJIvYfF8O3gGP6IfYinT6iqB2F-nFI99jheOt7I-DaXBx3Ltni7jvHxfErOYhPF'],
      features: [
        { icon: 'group', label: 'Up to 4 Guests' },
        { icon: 'deck', label: 'Double Balcony' },
        { icon: 'coffee', label: 'Espresso Machine' },
        { icon: 'kitchen', label: 'Mini-bar & Fridge' },
        { icon: 'surfing', label: 'Beach Gear Set' },
        { icon: 'free_cancellation', label: 'Daily Breakfast', accent: true }
      ],
      chips: [['ac_unit', 'AC'], ['wifi', 'Wi-Fi'], ['deck', 'Terrace'], ['free_breakfast', 'Breakfast']]
    }
  ],

  excursions: [
    {
      id: 'shark', name: 'Nurse Shark Snorkeling', price: 65, duration: 'Half Day', hours: '2.5 hrs', area: 'Vaavu Atoll',
      category: 'snorkel', tag: 'Top Pick', sub: 'Gear & Go-Pro', depart: 'Daily, 09:30',
      short: 'Safe, thrilling close encounters with peaceful nurse sharks in azure lagoons.',
      desc: 'Join our local captains for a calm, guided swim alongside friendly nurse sharks and gliding stingrays in shallow, crystal-clear water. Perfect for confident beginners.',
      includes: ['Certified snorkel gear', 'Life-jackets', 'Go-Pro photos', 'Local guide & captain', 'Drinking water'],
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBCaN2fJuhzJblBhKtjHgcjnV-jgPiAxT_1L5RWwQD6sl8d8PDCqPy7-xDY9eQipCO_-9ns3oHHKDRHeOrrznTd1MImBiOGXbZwLSBHGm0lviMfTkAcCEt4NNohD-yNyXiIjDDUc0c7tROs-lPelg8PXUgZ6iByYvQ8TwiSGJHZht_SiHOygqEwkh_mhHGye0XATwU51QY5vm-YyP8sY_jFaVveiuu27A3V4cvTPG_j', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCC5KtSjuLLqQ4p5aYuNUF4y3xb9wcwO40bi-HFdCCSa4NkEKatlaUBoARFU5EIRhe8xf5Fix9y92PLdUUSTSPaWhtRsL1ixgkjCtf3D8ABIBVaSlmVNpxMu6zulcMgUfLR6-Xzn07GUXEbqHvL-MHpEjgT37vpkKum3h6mG0KLt_AAfITuVAKFT-_2P55ACSlDE8vfuBoBLCdIp3qwkfYCe7xahe0v-4CpChk35dZ']
    },
    {
      id: 'sandbank', name: 'Deserted Sandbank Picnic', price: 45, duration: '3 Hours', hours: '3 hrs', area: 'Castaway',
      category: 'picnic', tag: '', sub: 'Picnic Lunch & Shades', depart: 'Daily, 11:00',
      short: 'Cast away on pure white sands surrounded by 360-degree turquoise horizons.',
      desc: 'Step onto a pure-white sandbank in the middle of the lagoon with shade, a fresh picnic lunch and a private swim in impossibly clear water.',
      includes: ['Return boat transfer', 'Picnic lunch', 'Beach umbrellas & mats', 'Fresh coconuts', 'Snorkel gear'],
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCeZf-Z5F_7daa7JC61pcQf6sXVW1DGjlFEuslzxfK00DuzJmpCbUnJIGqbWfRtZyUzMF1kLYnYQ73QPgnCaFpcyvKVLVW7ZAxtHJ5kfR1nIHHP1jE-9GTXaJa6jVmroxLER5fduT01yUmJbSyW8Tm-Q27Kk2jZDfYaSNE6ccwoUTS7tpkjb_7k7NVNpaVTTH_z6Kb45ujbeLNHde-as4hph69zKWQ-riVQkQ-_0w3C', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_aj_LoClbpujFDhYGlILo2OcjLu24tuW142QvSLR53wFECkrP8hz25C_Abb48zLfF-naxMjbeJrOTv1VqSpoxZrdg8o4VzPzF68NjZenl9TjX2dJU1gkdsB2TAJjLmK87zSPuvxtBsHfR5gcjUhcm75bX1IVRvIVwBV0LoUmkja_HRf-ASWnQMCpFV3fx-ZX8lQyXtxD-1RBsElnVSz8Z33UlenWrDihm0fyCFa7l', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTXe8sERmOLYRdmItBZug1wBvmv6DZy7u-NR8vVDYeWJqDefP7gW8HbBH1zWzQa7VMJPDdCqnrvD8nUNce8elZuUD1qQenME7bLoLpl9QqrDNvqpARRKon3t2tJi1uuk9JXRj_4KAaOkdvt2gweAJksvRrF89XkPXblFDweXrCScdatKXecaOnDlHVbHjSbyZWGn8p3LWsOX_eAeqAXw-FuOSBu2wJgwDhOX7aIzND']
    },
    {
      id: 'wreck', name: 'Shipwreck Exploration', price: 55, duration: '3.5 Hours', hours: '3.5 hrs', area: 'Reef Diving',
      category: 'dive', tag: '', sub: 'Coral & Tropical Fish', depart: 'Daily, 08:30',
      short: 'Marvel at a historic sunken ship enveloped in kaleidoscopic sea life.',
      desc: 'Explore a shallow shipwreck draped in soft coral and ringed by schools of yellow snapper. Suitable for snorkelers and certified divers alike.',
      includes: ['Dive / snorkel guide', 'All safety equipment', 'Boat transfer', 'Refreshments'],
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBfhBqUyKIuT8pSZp2fyzsw7C46oIo_n1ae0isQ-geKZdHjxJ2TVN1viSNC61P2GMLpT5jWzXLnvtg6WrRTE_SRqr5kqOxlTEY6gVKKzJvyn0oH2682lZYFERQYqgiVBW2hzNKmptYlj5iiMbHiyHe_XR-CQ0BDNUc1vc8BaI77FrXAY-ppxHo1N-Hjh_NwgcHXY5GD158uvzZclpgi0NaSQzk6c-lCNBKzlNQX-H48', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiTutvwq8qu36bWJrgQM1u3tXdBVv2GFxvrmzvodbvsh_Y900F2C6Wj33KmwcvjE7HwKnw4AU_OTlQMh7r87Ri158eiNDxPd7JzxOeNXzkNO1H9cLVThdddXizG2S5_zuw8ibjPUY9G-9LwEgYi5KAuAZnmODdUveOKxOvEV9001FbYP3Rtw76uD8GygNM1GnYzh9y5QAH6a_yJeg82jviVkK06ncDfwNnrh-6JqCX']
    },
    {
      id: 'dolphin', name: 'Sunset Dolphin Cruise', price: 40, duration: '2 Hours', hours: '2 hrs', area: 'Traditional Dhoni',
      category: 'cruise', tag: '', sub: 'Fresh Coconuts Included', depart: 'Daily, 16:30',
      short: 'Sail into vibrant dusk waters accompanied by wild spinner dolphin pods.',
      desc: 'Board a traditional Maldivian dhoni at golden hour and search for playful spinner dolphins while the sky turns magenta and gold.',
      includes: ['Traditional dhoni cruise', 'Fresh coconuts', 'Soft drinks & water', 'Local captain & crew'],
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDSbJMxajK3-TcFBXzSQjenOm5Qih6m_-xewKcvuu4waPis9qO-zeAYPnrBdxZjQGA00r_FlEbvFpuTH9DFyZIPLPxnLbBWVrzh5KILc_pH-MUviadZTJzPL1baVq1OESJBBWDS49u6saREahqz2ujEBKHO-7bwzlWXUpn_JB1ih-YCEiITSKRl1SAdXH3gbjwJTI9BivqrnactGKU6LUkORxE1vS-bGhEn4KgtAiTU', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC--7CLnMvPdZcLjN8cNzAYUvKY11U-j7XWAInOh2zA2FXnO3z5CZ3qhqos9VFr8JZ13KZoNmQMWFmnahGWV0M4rXafXndHRfQf0G78RrK3qtORJxyrjsVpUlC5IEjvJ5QM8AZb8HduXg32q--nkPczg9HrZT3oJJIxLYO657-j2Rr_HUWE9Yom8D42oTrapHHwAjvPsYDoHmsstFbbszf-w3EsBVO_ExZJocxEpGPL', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzxJyBPJu8j9526Sy41q9T-Z74tbCVQffQtKHy5Sk3IvFkH5MisdYVoj6Wy8RScEEiVxsVPRBNHfkvCF-Tq14-9iKjCUHR8zhZX_mw_vG4AU30UKF8sD4WrAoZFjwHQzLbKfhpRkvyxTbdYzFqYHz2EhmZF_YDw71a_O_g_VpeqWVWBkFEqa2zTyAbfeW_6TRbpKG_EAEatS0QTjeV-QEotJDOMJMq4LTr7LTby1yc']
    },
    {
      id: 'turtle', name: 'Turtle Reef Snorkeling', price: 50, duration: '2.5 Hours', hours: '2.5 hrs', area: 'House Reef',
      category: 'snorkel', tag: 'New', sub: 'Gear & Go-Pro', depart: 'Daily, 14:00',
      short: 'Float beside gentle sea turtles gliding over a healthy coral garden.',
      desc: 'A relaxed reef snorkel where green and hawksbill turtles are regularly spotted grazing over the coral. A favourite for families.',
      includes: ['Snorkel gear', 'Life-jackets', 'Go-Pro photos', 'Local guide'],
      images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAVjwwYFPTG9lwT8P8NsPCJXGa_atB6YQFZLaNGW32k-vcfW42CDdiWO1fw2oIHncLrH_NiQOy8d8BrnpoxyCtFLXpwVmatYgqkbcFGNJ9LVBTX2kUjSOEGwm11IB81Zy4dO6vClP0X_Trs0ZSL98zrEyyUfIv2Ial-P3aN6nMsTbwcCYNRzJxahgvjRoDbszQRKjtC1diPl8U_X5ENrYiYcfaJu5I5defGG9j6fhuQ', 'https://lh3.googleusercontent.com/aida-public/AB6AXuABkTYhAFbw_A_U90bGe5vIbDa-4pdENiCUdh5QnhC4i7LYaWssHRrPpKnwLmG9mijdfQ4NX13k-9-pH62nosVtftaKPgAEmP_e_5AfYu_h5LWmh9ZpbF4Dp7tHicC59Ne7JdpccjzZ03QVH6qGCTF1kDxhQTbGnHbA8BU-cYZ6A0vbtDS1RQhP80gBrV2uWOMAiJ5WZebiyyukKaG7tcrTDxJnRQ8zAM5LR1Nuu4Bx']
    }
  ],

  categories: [
    { id: 'all', label: 'All Excursions', icon: 'explore' },
    { id: 'snorkel', label: 'Snorkeling', icon: 'scuba_diving' },
    { id: 'dive', label: 'Diving', icon: 'diving' },
    { id: 'cruise', label: 'Cruises', icon: 'sailing' },
    { id: 'picnic', label: 'Sandbank', icon: 'beach_access' }
  ],

  gallery: [
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABkTYhAFbw_A_U90bGe5vIbDa-4pdENiCUdh5QnhC4i7LYaWssHRrPpKnwLmG9mijdfQ4NX13k-9-pH62nosVtftaKPgAEmP_e_5AfYu_h5LWmh9ZpbF4Dp7tHicC59Ne7JdpccjzZ03QVH6qGCTF1kDxhQTbGnHbA8BU-cYZ6A0vbtDS1RQhP80gBrV2uWOMAiJ5WZebiyyukKaG7tcrTDxJnRQ8zAM5LR1Nuu4Bx', alt: 'Couple snorkeling with nurse sharks', likes: 248, comments: 19 },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxvZ-viqNKM2D919egWt4ownxKXSESTf7AlaUMpmQ0n_4nIgFg5pnUpm24fflw6GSjPQNvE1WV7P9_tlXFtaicnTj6mitF5-niFC49ao_5T6CMqqyryYqAO2MNN2bPUOoFz69r0YPNKVpdtOqXFPwlWyN1qJMMDiNxs8CbGtJchrM5JyXs0mb-3BMhEQjG5L79lEuwD6rCwaDrRu5CZShqdrFzHb7OjjiqHH9s3CJD', alt: 'Tropical breakfast on the rooftop terrace', likes: 312, comments: 27 },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTXe8sERmOLYRdmItBZug1wBvmv6DZy7u-NR8vVDYeWJqDefP7gW8HbBH1zWzQa7VMJPDdCqnrvD8nUNce8elZuUD1qQenME7bLoLpl9QqrDNvqpARRKon3t2tJi1uuk9JXRj_4KAaOkdvt2gweAJksvRrF89XkPXblFDweXrCScdatKXecaOnDlHVbHjSbyZWGn8p3LWsOX_eAeqAXw-FuOSBu2wJgwDhOX7aIzND', alt: 'Aerial view of a sandbank', likes: 450, comments: 42 },
    { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzxJyBPJu8j9526Sy41q9T-Z74tbCVQffQtKHy5Sk3IvFkH5MisdYVoj6Wy8RScEEiVxsVPRBNHfkvCF-Tq14-9iKjCUHR8zhZX_mw_vG4AU30UKF8sD4WrAoZFjwHQzLbKfhpRkvyxTbdYzFqYHz2EhmZF_YDw71a_O_g_VpeqWVWBkFEqa2zTyAbfeW_6TRbpKG_EAEatS0QTjeV-QEotJDOMJMq4LTr7LTby1yc', alt: 'Sunset at Guraidhoo harbour', likes: 520, comments: 35 }
  ],

  faq: [
    ['How do I get to Athens View from Velana International Airport?', 'Take a speedboat from the Velana airport jetty straight to Guraidhoo harbour (around 35 minutes). Our team greets you at the jetty and helps with your luggage. Transfers are about $35 per person each way – add them in the booking form.'],
    ['What is included in the room rate?', 'All rooms include daily tropical breakfast, taxes and the green tax. Snorkel gear is free to borrow for in-house reef swimming.'],
    ['Do you accept children?', 'Yes. The Family Island Suite sleeps up to four guests and is ideal for families. Tell us the ages of children in your booking notes.'],
    ['How do I confirm and pay for my stay?', 'Send your booking request here – it opens a pre-written WhatsApp message to our reception. We confirm availability, share payment options and send your final confirmation.'],
    ['Is alcohol available?', 'Guraidhoo is a local island, so alcohol is not served on the island. We offer fresh mocktails, coconut blends and barista coffee on the rooftop terrace.'],
    ['What should I pack?', 'Light cotton clothing, reef-safe sunscreen, a hat, swimwear, and modest cover-ups for walking through the village. Snorkel gear is provided.']
  ]
};
