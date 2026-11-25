// Thông tin dùng chung cho toàn trang.
export const site = {
  name: "Đặng Lê Thanh Minh",
  description:
    "Portfolio of Đặng Lê Thanh Minh, Vietnam–Japan IT student at UIT, interested in backend, data, and AI.",
  email: "danglethanhminh.dtd@gmail.com",
  github: "https://github.com/hcmuit-minhdang",
  linkedin: "https://www.linkedin.com/in/thanh-minh-dang-le-295a1a450/",
  facebook: "https://www.facebook.com/minhdanguit",
  // Chép ảnh vào public/ rồi điền đường dẫn, ví dụ "/photo.jpg".
  photo: null as string | null,
  nav: [
    { href: "/#gioi-thieu", key: "about" as const },
    { href: "/#du-an", key: "projects" as const },
    { href: "/#ky-nang", key: "skills" as const },
    { href: "/#lien-he", key: "contact" as const },
  ],
};
