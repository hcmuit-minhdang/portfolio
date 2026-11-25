export type Locale = "en" | "vi";

export type Localized<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "en";

export const messages = {
  en: {
    skipToContent: "Skip to content",
    homeAria: (name: string) => `${name}, back to home`,
    navAria: "Main navigation",
    mobileNavAria: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    headerStatus: "OPEN TO NEW OPPORTUNITIES",
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    theme: {
      groupAria: "Color theme",
      light: "Light",
      system: "System",
      dark: "Dark",
    },
    language: {
      groupAria: "Language",
      en: "English",
      vi: "Vietnamese",
    },
    backToTop: "Back to top",
    opensInNewTab: " (opens in new tab)",
    hero: {
      lead: "Vietnam–Japan IT junior at the University of Information Technology (UIT).",
      sub: "Interested in backend, data, and AI.",
      viewProjects: "View projects",
    },
    sky: {
      toggleHint: "Click to preview sky across the day (Vietnam time)",
      preview: "Preview",
      phases: {
        dawn: "Dawn",
        morning: "Morning",
        midday: "Midday",
        sunset: "Sunset",
        dusk: "Dusk",
        night: "Night",
      },
    },
    about: {
      heading: "About",
      leadBefore: "I enjoy ",
      leadHighlight: "everything driven by logic.",
      leadAfter:
        " Turning everyday problems into simple products that solve them.",
      highlights: [
        { value: "Year 3", label: "Vietnam–Japan IT, UIT" },
        { value: "3 tracks", label: "Backend, data, and AI" },
        { value: "1 project", label: "Scientific research, in progress" },
      ],
    },
    profileCard: {
      year: "Year 3",
      photoAlt: (name: string) => `Photo of ${name}`,
      locationTerm: "Location",
      locationValue: "Ho Chi Minh City",
      timeTerm: "Time",
      handleTerm: "Handle",
    },
    projects: {
      heading: "Projects",
      leadBefore: "Right now I'm focused on ",
      leadHighlight: "a research project.",
      privateNote:
        "Details are not public yet. I will share more once the research is complete.",
      viewPrefix: "View ",
      status: {
        done: "Completed",
        active: "In progress",
        paused: "Paused",
      },
    },
    skills: {
      heading: "Skills",
      leadBefore: "Prioritizing clarity, from ",
      leadHighlight: "thinking to code.",
      languagesHeading: "Languages",
    },
    contact: {
      heading: "Contact",
      leadBefore: "Open to new ideas, ",
      leadHighlight: "let's get in touch.",
      emailLabel: "Email",
      sendEmail: "Send email",
      copyEmail: "Copy email",
      copied: "Copied",
    },
  },
  vi: {
    skipToContent: "Bỏ qua điều hướng",
    homeAria: (name: string) => `${name}, về trang chủ`,
    navAria: "Điều hướng chính",
    mobileNavAria: "Điều hướng trên điện thoại",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    headerStatus: "SẴN SÀNG CHO CƠ HỘI MỚI",
    nav: {
      about: "Giới thiệu",
      projects: "Dự án",
      skills: "Kỹ năng",
      contact: "Liên hệ",
    },
    theme: {
      groupAria: "Chế độ giao diện",
      light: "Sáng",
      system: "Theo hệ thống",
      dark: "Tối",
    },
    language: {
      groupAria: "Ngôn ngữ",
      en: "Tiếng Anh",
      vi: "Tiếng Việt",
    },
    backToTop: "Về đầu trang",
    opensInNewTab: " (mở tab mới)",
    hero: {
      lead: "Sinh viên Công nghệ thông tin Việt – Nhật tại Trường Đại học Công nghệ Thông tin (UIT).",
      sub: "Mình quan tâm đến backend, data và AI.",
      viewProjects: "Xem dự án",
    },
    sky: {
      toggleHint: "Bấm để xem thử bầu trời các khung giờ trong ngày (giờ Việt Nam)",
      preview: "Xem thử",
      phases: {
        dawn: "Bình minh",
        morning: "Buổi sáng",
        midday: "Buổi trưa",
        sunset: "Hoàng hôn",
        dusk: "Chạng vạng",
        night: "Đêm",
      },
    },
    about: {
      heading: "Giới thiệu",
      leadBefore: "Mình thích ",
      leadHighlight: "những thứ liên quan đến logic.",
      leadAfter:
        " Biến những vấn đề trong cuộc sống thành những sản phẩm đơn giản giúp giải quyết nó.",
      highlights: [
        { value: "Năm 3", label: "Công nghệ thông tin Việt – Nhật, UIT" },
        { value: "3 hướng", label: "Backend, data và AI" },
        { value: "1 dự án", label: "Nghiên cứu khoa học, đang phát triển" },
      ],
    },
    profileCard: {
      year: "Năm 3",
      photoAlt: (name: string) => `Ảnh của ${name}`,
      locationTerm: "Nơi ở",
      locationValue: "TP HCM",
      timeTerm: "Giờ",
      handleTerm: "Handle",
    },
    projects: {
      heading: "Dự án",
      leadBefore: "Hiện mình đang tập trung vào ",
      leadHighlight: "một dự án nghiên cứu.",
      privateNote:
        "Nội dung chưa được công bố. Mình sẽ chia sẻ khi nghiên cứu hoàn thành.",
      viewPrefix: "Xem ",
      status: {
        done: "Hoàn thành",
        active: "Đang phát triển",
        paused: "Tạm dừng",
      },
    },
    skills: {
      heading: "Kỹ năng",
      leadBefore: "Ưu tiên sự rõ ràng, từ ",
      leadHighlight: "cách nghĩ đến dòng code.",
      languagesHeading: "Ngoại ngữ",
    },
    contact: {
      heading: "Liên hệ",
      leadBefore: "Sẵn sàng trao đổi, ",
      leadHighlight: "kết nối với mình nhé.",
      emailLabel: "Email",
      sendEmail: "Gửi email",
      copyEmail: "Sao chép email",
      copied: "Đã sao chép",
    },
  },
} as const;
