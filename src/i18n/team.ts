export interface TeamMemberTranslation {
  id: string;
  name: string;
  role: string;
  experienceBadge: string;
  shortBio: string;
  fullBio: string;
  specialties: string[];
  personalHighlight: string;
}

export interface TeamSectionUI {
  badge: string;
  title: string;
  subtitle: string;
  viewBio: string;
  readBioSpecialties: string;
  callBtn: string;
  quoteBtn: string;
  quoteUrl: string;
  bioHeading: string;
  specialtiesHeading: string;
  beyondDeskHeading: string;
  closeModal: string;
}

export interface TeamDataLocale {
  ui: TeamSectionUI;
  members: TeamMemberTranslation[];
}

export const teamData: Record<'en' | 'es' | 'pt' | 'tr', TeamDataLocale> = {
  en: {
    ui: {
      badge: 'Meet Our Team',
      title: 'The People Behind Your Protection',
      subtitle: 'Our multilingual agents live and work right here in Connecticut. Click any team member to view their background, focus areas, and story.',
      viewBio: 'View Full Bio',
      readBioSpecialties: 'Read Bio & Specialties',
      callBtn: 'Call (203) 748-9272',
      quoteBtn: 'Request a Quote',
      quoteUrl: '/quote',
      bioHeading: 'Biography & Background',
      specialtiesHeading: 'Areas of Focus & Expertise',
      beyondDeskHeading: 'Beyond the Desk:',
      closeModal: 'Close modal',
    },
    members: [
      {
        id: 'ronald-boucher',
        name: 'Ronald T. Boucher',
        role: 'Founder & Commercial Insurance Specialist',
        experienceBadge: 'Agency Founder (2008)',
        shortBio: 'Founder of Associated Insurance Agency LLC in 2008, bringing deep commercial and construction market expertise.',
        fullBio: 'Ron Boucher is the founder of Associated Insurance Agency LLC in 2008 and is still an active team member. Coming from the construction field he is a major asset in the commercial market. He has grown the agency over the years to include all of the following team members. He loves working with them all. He also enjoys SCUBA Diving, working in his wood shop, and spending time at home with his family.',
        specialties: ['Commercial Lines', 'Construction Risks', 'Business Liability', 'Agency Leadership'],
        personalHighlight: 'Enjoys SCUBA diving, working in his wood shop, and family time.',
      },
      {
        id: 'yesica-ramirez',
        name: 'Yesica D. Ramirez-Mendez',
        role: 'Commercial & Personal Insurance Specialist',
        experienceBadge: '13+ Years Experience • 10+ at AIA',
        shortBio: 'Over 13 years of professional experience specializing in truckers, contractors, and comprehensive personal policies.',
        fullBio: 'My name is Yesica Ramirez, a professional insurance agent with more than 13 years of experience serving our community. I specialize in commercial and personal insurance, with a strong focus on helping truckers, contractors, and individuals find the right coverage for their needs. I am dedicated to providing personalized service, building long-term relationships, and supporting the growth and protection of the community I proudly serve. I have been a team member for over 10 years.',
        specialties: ['Truckers & Transportation', 'Contractors Insurance', 'Personal Policies', 'Commercial Coverage'],
        personalHighlight: 'Deeply committed to personalized community service and long-term client advocacy.',
      },
      {
        id: 'betania-almeida',
        name: 'Betania Almeida',
        role: 'Commercial & Personal Insurance Advisor',
        experienceBadge: '10+ Years Experience',
        shortBio: 'Over a decade of industry expertise helping business owners and individuals build reliable, tailored coverage solutions.',
        fullBio: "With over 10 years in the insurance industry, Betania is passionate about helping individuals and business owners feel confident and protected when it matters most. Her background in commercial insurance has given her the opportunity to work closely with businesses of all sizes, helping them find coverage solutions that fit their unique needs and goals. She takes pride in building lasting client relationships by being approachable, dependable, and always willing to go the extra mile. For her, it's about providing peace of mind and being a trusted resource people can count on.",
        specialties: ['Commercial Risk', 'Small Business Solutions', 'Personal Lines', 'Client Advocacy'],
        personalHighlight: 'Known for being approachable, dependable, and dedicated to client peace of mind.',
      },
      {
        id: 'camila-macedo',
        name: 'Camila Macedo de Jesus',
        role: 'Commercial & Personal Insurance Specialist',
        experienceBadge: 'AIA Team Member Since 2020',
        shortBio: 'Dedicated to helping clients feel confident, protected, and fully supported across commercial and personal coverage.',
        fullBio: 'Camila has been part of the AIA Team since 2020. She specializes in commercial and personal insurance coverage, and her expertise helps clients feel secure, confident, and well supported. She is always seeking personal growth and enjoys warm beach days and spending quality time with the people she loves.',
        specialties: ['Commercial Coverage', 'Personal Insurance', 'Coverage Consultations', 'Policy Servicing'],
        personalHighlight: 'Loves warm beach days, quality family time, and continuous self-growth.',
      },
    ],
  },
  es: {
    ui: {
      badge: 'Conozca a Nuestro Equipo',
      title: 'Las Personas Detrás de su Protección',
      subtitle: 'Nuestros agentes multilingües viven y trabajan aquí mismo en Connecticut. Haga clic en cualquier miembro del equipo para conocer su trayectoria, especialidades e historia.',
      viewBio: 'Ver Biografía Completa',
      readBioSpecialties: 'Leer Biografía y Especialidades',
      callBtn: 'Llamar al (203) 748-9272',
      quoteBtn: 'Solicitar Cotización',
      quoteUrl: '/es/quote',
      bioHeading: 'Biografía y Trayectoria',
      specialtiesHeading: 'Áreas de Enfoque y Especialidad',
      beyondDeskHeading: 'Más Allá del Escritorio:',
      closeModal: 'Cerrar ventana',
    },
    members: [
      {
        id: 'ronald-boucher',
        name: 'Ronald T. Boucher',
        role: 'Fundador y Especialista en Seguros Comerciales',
        experienceBadge: 'Fundador de la Agencia (2008)',
        shortBio: 'Fundador de Associated Insurance Agency LLC en 2008, aportando amplia experiencia en el sector comercial y de la construcción.',
        fullBio: 'Ron Boucher es el fundador de Associated Insurance Agency LLC en 2008 y continúa siendo un miembro activo del equipo. Con su trayectoria en el campo de la construcción, es un gran pilar en el mercado de seguros comerciales. Con los años, ha hecho crecer la agencia incorporando a todos los miembros actuales del equipo y disfruta enormemente trabajar con cada uno de ellos. También le apasiona el buceo submarino (SCUBA), trabajar en su taller de carpintería y pasar tiempo en casa con su familia.',
        specialties: ['Líneas Comerciales', 'Riesgos de Construcción', 'Responsabilidad Empresarial', 'Liderazgo de Agencia'],
        personalHighlight: 'Le apasiona el buceo submarino, la carpintería en su taller y compartir en familia.',
      },
      {
        id: 'yesica-ramirez',
        name: 'Yesica D. Ramirez-Mendez',
        role: 'Especialista en Seguros Comerciales y Personales',
        experienceBadge: '13+ Años de Experiencia • 10+ en AIA',
        shortBio: 'Más de 13 años de experiencia profesional asesorando a camioneros, contratistas y familias en pólizas integrales.',
        fullBio: 'Mi nombre es Yesica Ramírez, agente de seguros profesional con más de 13 años de experiencia al servicio de nuestra comunidad. Me especializo en seguros comerciales y personales, con un enfoque destacado en ayudar a transportistas, camioneros, contratistas y particulares a encontrar la cobertura adecuada para sus necesidades. Estoy dedicada a brindar una atención personalizada, construir relaciones a largo plazo y apoyar el crecimiento y la protección de la comunidad que con orgullo represento. He sido miembro del equipo de AIA por más de 10 años.',
        specialties: ['Camioneros y Transporte', 'Seguros para Contratistas', 'Pólizas Personales', 'Cobertura Comercial'],
        personalHighlight: 'Profundamente comprometida con el servicio comunitario personalizado y la defensa de sus clientes.',
      },
      {
        id: 'betania-almeida',
        name: 'Betania Almeida',
        role: 'Asesora de Seguros Comerciales y Personales',
        experienceBadge: '10+ Años de Experiencia',
        shortBio: 'Más de una década de experiencia ayudando a empresarios y familias a diseñar soluciones de cobertura confiables y a la medida.',
        fullBio: 'Con más de 10 años en la industria de seguros, a Betania le apasiona ayudar a personas y dueños de negocios a sentirse seguros y protegidos en los momentos más cruciales. Su experiencia en seguros comerciales le ha permitido colaborar estrechamente con empresas de todos los tamaños, facilitando soluciones de cobertura que se ajustan a sus metas y necesidades particulares. Se enorgullece de forjar relaciones duraderas mediante un trato cercano, confiable y siempre dispuesta a dar la milla extra. Para ella, lo fundamental es brindar tranquilidad y ser un recurso de confianza en quien siempre se puede contar.',
        specialties: ['Riesgos Comerciales', 'Soluciones para Pequeñas Empresas', 'Líneas Personales', 'Atención al Cliente'],
        personalHighlight: 'Reconocida por su accesibilidad, confiabilidad y dedicación a la tranquilidad de sus clientes.',
      },
      {
        id: 'camila-macedo',
        name: 'Camila Macedo de Jesus',
        role: 'Especialista en Seguros Comerciales y Personales',
        experienceBadge: 'En el Equipo de AIA Desde 2020',
        shortBio: 'Dedicada a que cada cliente se sienta confiado, protegido y completamente respaldado en seguros comerciales y personales.',
        fullBio: 'Camila forma parte del equipo de AIA desde 2020. Se especializa en coberturas de seguros comerciales y personales, y su experiencia ayuda a los clientes a sentirse tranquilos, seguros y bien respaldados. Siempre está en busca de crecimiento personal y disfruta de los días soleados en la playa y de pasar tiempo de calidad con sus seres queridos.',
        specialties: ['Cobertura Comercial', 'Seguros Personales', 'Consultoría de Coberturas', 'Servicio al Asegurado'],
        personalHighlight: 'Disfruta de los días de playa, el tiempo de calidad en familia y el constante desarrollo personal.',
      },
    ],
  },
  pt: {
    ui: {
      badge: 'Conheça a Nossa Equipe',
      title: 'As Pessoas por Trás da Sua Proteção',
      subtitle: 'Nossos corretores multilíngues vivem e trabalham aqui mesmo em Connecticut. Clique em qualquer membro da equipe para conhecer sua trajetória, especialidades e história.',
      viewBio: 'Ver Biografia Completa',
      readBioSpecialties: 'Ler Biografia e Especialidades',
      callBtn: 'Ligar para (203) 748-9272',
      quoteBtn: 'Solicitar Cotação',
      quoteUrl: '/pt/quote',
      bioHeading: 'Biografia e Trajetória',
      specialtiesHeading: 'Áreas de Atuação e Especialidades',
      beyondDeskHeading: 'Além do Escritório:',
      closeModal: 'Fechar janela',
    },
    members: [
      {
        id: 'ronald-boucher',
        name: 'Ronald T. Boucher',
        role: 'Fundador e Especialista em Seguros Comerciais',
        experienceBadge: 'Fundador da Agência (2008)',
        shortBio: 'Fundador da Associated Insurance Agency LLC em 2008, trazendo sólida experiência nos setores comercial e de construção civil.',
        fullBio: 'Ron Boucher fundou a Associated Insurance Agency LLC em 2008 e continua sendo um membro muito ativo da equipe. Vindo da área de construção civil, ele é uma referência fundamental no mercado de seguros comerciais. Ao longo dos anos, expandiu a agência incluindo todos os membros da equipe atual e tem grande satisfação em trabalhar com todos eles. Ele também adora mergulho autônomo (SCUBA), trabalhar em sua oficina de marcenaria e passar momentos em casa com sua família.',
        specialties: ['Linhas Comerciais', 'Riscos da Construção Civil', 'Responsabilidade Empresarial', 'Liderança de Agência'],
        personalHighlight: 'Gosta de mergulho (SCUBA), marcenaria em sua oficina e tempo com a família.',
      },
      {
        id: 'yesica-ramirez',
        name: 'Yesica D. Ramirez-Mendez',
        role: 'Especialista em Seguros Comerciais e Pessoais',
        experienceBadge: '13+ Anos de Experiência • 10+ na AIA',
        shortBio: 'Mais de 13 anos de experiência atendendo caminhoneiros, empreiteiros e famílias com coberturas completas.',
        fullBio: 'Meu nome é Yesica Ramirez, corretora profissional de seguros com mais de 13 anos de experiência servindo a nossa comunidade. Especializo-me em seguros comerciais e pessoais, com forte dedicação no suporte a caminhoneiros, motoristas de transporte, empreiteiros e indivíduos para encontrar a proteção ideal para suas necessidades. Sou dedicada a oferecer um atendimento personalizado, construir relacionamentos duradouros e apoiar a proteção e o crescimento da comunidade que tenho orgulho de servir. Faço parte da equipe AIA há mais de 10 anos.',
        specialties: ['Caminhoneiros e Transportes', 'Seguros para Empreiteiros', 'Apólices Pessoais', 'Coberturas Comerciais'],
        personalHighlight: 'Profundamente comprometida com o serviço comunitário e o apoio contínuo aos clientes.',
      },
      {
        id: 'betania-almeida',
        name: 'Betania Almeida',
        role: 'Consultora de Seguros Comerciais e Pessoais',
        experienceBadge: '10+ Anos de Experiência',
        shortBio: 'Mais de uma década de experiência ajudando empresários e famílias a encontrar soluções de cobertura confiáveis e sob medida.',
        fullBio: 'Com mais de 10 anos de atuação no mercado de seguros, Betania tem paixão por ajudar indivíduos e empresários a se sentirem seguros e protegidos quando mais precisam. Sua experiência em seguros comerciais permitiu trabalhar de perto com empresas de todos os portes, identificando coberturas alinhadas às metas e necessidades únicas de cada cliente. Ela se orgulha de construir relações duradouras sendo acessível, confiável e sempre pronta a ir além. Para ela, o objetivo é garantir tranquilidade e ser um porto seguro com quem os clientes sempre podem contar.',
        specialties: ['Riscos Comerciais', 'Soluções para Pequenas Empresas', 'Linhas Pessoais', 'Defesa do Cliente'],
        personalHighlight: 'Conhecida pela simpatia, confiabilidade e foco na tranquilidade de seus clientes.',
      },
      {
        id: 'camila-macedo',
        name: 'Camila Macedo de Jesus',
        role: 'Especialista em Seguros Comerciais e Pessoais',
        experienceBadge: 'Na Equipe AIA Desde 2020',
        shortBio: 'Dedicada a garantir que cada cliente se sinta seguro, confiante e totalmente respaldado em seguros pessoais e comerciais.',
        fullBio: 'Camila faz parte da equipe da AIA desde 2020. Ela se especializa em coberturas de seguros comerciais e pessoais, ajudando os clientes a se sentirem protegidos, confiantes e bem amparados. Está sempre em busca de desenvolvimento pessoal e adora dias ensolarados na praia e momentos de qualidade com as pessoas que ama.',
        specialties: ['Coberturas Comerciais', 'Seguros Pessoais', 'Consultoria de Apólices', 'Atendimento ao Segurado'],
        personalHighlight: 'Adora dias de praia, momentos especiais em família e constante aprendizado.',
      },
    ],
  },
  tr: {
    ui: {
      badge: 'Ekibimizle Tanışın',
      title: 'Güvencenizin Arkasındaki İsimler',
      subtitle: "Çok dilli sigorta danışmanlarımız tam burada, Connecticut'ta yaşıyor ve çalışıyor. Geçmişlerini, uzmanlık alanlarını ve hikayelerini öğrenmek için ekip üyelerimize tıklayın.",
      viewBio: 'Özgeçmişin Tamamını Gör',
      readBioSpecialties: 'Özgeçmiş ve Uzmanlık Alanları',
      callBtn: '(203) 748-9272 Numarasını Arayın',
      quoteBtn: 'Fiyat Teklifi Alın',
      quoteUrl: '/tr/quote',
      bioHeading: 'Özgeçmiş ve Deneyim',
      specialtiesHeading: 'Uzmanlık ve Odak Alanları',
      beyondDeskHeading: 'Masanın Ötesinde:',
      closeModal: 'Pencereyi Kapat',
    },
    members: [
      {
        id: 'ronald-boucher',
        name: 'Ronald T. Boucher',
        role: 'Kurucu ve Ticari Sigorta Uzmanı',
        experienceBadge: 'Acente Kurucusu (2008)',
        shortBio: "2008 yılında Associated Insurance Agency LLC'yi kuran Ron, ticari ve inşaat sektöründe derin bir pazar uzmanlığına sahiptir.",
        fullBio: "Ron Boucher, 2008 yılında Associated Insurance Agency LLC'nin kurucusudur ve halen acentede aktif bir ekip üyesidir. İnşaat sektöründen gelen deneyimiyle ticari sigorta pazarında büyük bir değer sunmaktadır. Yıllar içinde acenteyi büyüterek bugünkü tüm çalışma arkadaşlarını bünyesine katmıştır ve onlarla çalışmaktan büyük mutluluk duymaktadır. Aynı zamanda SCUBA dalışı yapmaktan, ahşap atölyesinde çalışmaktan ve ailesiyle evde vakit geçirmekten keyif almaktadır.",
        specialties: ['Ticari Sigortalar', 'İnşaat Riskleri', 'İşletme Sorumluluğu', 'Acente Liderliği'],
        personalHighlight: 'Tüplü dalış (SCUBA), ahşap atölyesi işleri ve ailesiyle vakit geçirmekten hoşlanır.',
      },
      {
        id: 'yesica-ramirez',
        name: 'Yesica D. Ramirez-Mendez',
        role: 'Ticari ve Bireysel Sigorta Uzmanı',
        experienceBadge: "13+ Yıl Deneyim • AIA'da 10+ Yıl",
        shortBio: 'Kamyoncular, müteahhitler ve bireyler için kapsamlı sigorta poliçelerinde 13 yılı aşkın uzmanlık.',
        fullBio: 'Ben Yesica Ramirez, topluluğumuza 13 yılı aşkın süredir hizmet veren profesyonel bir sigorta acentesiyim. Özellikle kamyoncuların, nakliyecilerin, müteahhitlerin ve bireylerin ihtiyaçlarına uygun teminatı bulmalarına odaklanarak ticari ve bireysel sigortalarda uzmanlaştım. Kişiselleştirilmiş hizmet sunmaya, uzun vadeli ilişkiler kurmaya ve hizmet etmekten gurur duyduğum toplumun büyümesini ve korunmasını desteklemeye kendimi adadım. 10 yılı aşkın süredir AIA ekibinin bir üyesiyim.',
        specialties: ['Kamyon & Taşımacılık', 'Müteahhit Sigortaları', 'Bireysel Poliçeler', 'Ticari Teminatlar'],
        personalHighlight: 'Toplum hizmetine ve müşterilerine uzun vadeli rehberlik sağlamaya derin bir bağlılık duyar.',
      },
      {
        id: 'betania-almeida',
        name: 'Betania Almeida',
        role: 'Ticari ve Bireysel Sigorta Danışmanı',
        experienceBadge: '10+ Yıl Deneyim',
        shortBio: 'İşletme sahipleri ve bireyler için güvenilir, özel teminat çözümleri sunan 10 yılı aşkın sektör deneyimi.',
        fullBio: 'Sigorta sektöründe 10 yılı aşkın süredir faaliyet gösteren Betania, bireylerin ve işletme sahiplerinin en çok ihtiyaç duydukları anlarda kendilerini güvende hissetmelerine yardımcı olma konusunda tutkuludur. Ticari sigorta geçmişi, her ölçekten işletmeyle yakından çalışmasına ve onların benzersiz hedeflerine uygun çözümler üretmesine olanak tanımıştır. Samimi, güvenilir ve her zaman bir adım ötesini sunan yaklaşımıyla kalıcı müşteri ilişkileri kurmaktan gurur duyar. Onun için önemli olan huzur sağlamak ve insanların güvenebileceği bir kaynak olmaktır.',
        specialties: ['Ticari Risk Yönetimi', 'Küçük İşletme Çözümleri', 'Bireysel Sigortalar', 'Müşteri Temsilciliği'],
        personalHighlight: 'Yaklaşılabilirliği, güvenilirliği ve müşterilerinin iç huzuruna verdiği önemle tanınır.',
      },
      {
        id: 'camila-macedo',
        name: 'Camila Macedo de Jesus',
        role: 'Ticari ve Bireysel Sigorta Uzmanı',
        experienceBadge: "2020'den Beri AIA Ekip Üyesi",
        shortBio: 'Müşterilerin ticari ve bireysel teminatlarda kendilerini güvende, emin ve tam desteklenmiş hissetmelerine adanmıştır.',
        fullBio: 'Camila, 2020 yılından bu yana AIA Ekibinin bir parçasıdır. Ticari ve bireysel sigorta teminatlarında uzmanlaşmıştır ve uzmanlığı müşterilerin kendilerini güvende, huzurlu ve iyi desteklenmiş hissetmelerine yardımcı olur. Her zaman kişisel gelişim peşindedir; sıcak sahil günlerini ve sevdikleriyle kaliteli vakit geçirmeyi sever.',
        specialties: ['Ticari Teminatlar', 'Bireysel Sigorta', 'Poliçe Danışmanlığı', 'Müşteri Hizmetleri'],
        personalHighlight: 'Güneşli sahil günlerini, aileyle kaliteli zaman geçirmeyi ve sürekli kişisel gelişimi sever.',
      },
    ],
  },
};
