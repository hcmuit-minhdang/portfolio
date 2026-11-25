// Thông tin dùng chung cho toàn trang.
export const site = {
  name: "Đặng Lê Thanh Minh",
  shortName: "Thanh Minh",
  description:
    "Portfolio của Đặng Lê Thanh Minh, sinh viên Công nghệ thông tin Việt – Nhật tại UIT, quan tâm backend, data và AI.",
  github: "https://github.com/hcmuit-minhdang",
  // Chép ảnh vào public/ rồi điền đường dẫn, ví dụ "/photo.jpg".
  photo: null as string | null,
  nav: [
    { href: "/#gioi-thieu", label: "Giới thiệu" },
    { href: "/#du-an", label: "Dự án" },
    { href: "/#ky-nang", label: "Kỹ năng" },
    { href: "/#lien-he", label: "Liên hệ" },
  ],
};
