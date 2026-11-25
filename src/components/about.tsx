const facts = [
  { term: "Năm học", detail: "Sinh viên năm 3" },
  { term: "Ngành", detail: "Công nghệ thông tin Việt – Nhật" },
  { term: "Trường", detail: "Đại học Công nghệ Thông tin (UIT)" },
  { term: "Hướng quan tâm", detail: "Backend, data, AI" },
  { term: "Nơi ở", detail: "TP Hồ Chí Minh" },
];

export function About() {
  return (
    <section
      id="gioi-thieu"
      aria-labelledby="gioi-thieu-tieu-de"
      className="border-t border-line px-6 py-20 md:px-16 md:py-28"
    >
      <h2
        id="gioi-thieu-tieu-de"
        className="font-display text-5xl leading-[1.1] font-bold md:text-7xl"
      >
        Giới thiệu
      </h2>

      <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="grid max-w-[62ch] content-start gap-5 text-lg text-pretty md:text-xl">
          <p>
            Mình thích những thứ liên quan đến logic. Gặp một vấn đề rối, mình
            muốn tách nó thành từng phần nhỏ, hiểu từng phần hoạt động ra sao
            rồi ghép lại cho chạy đúng.
          </p>
          <p>
            Vì vậy mình hướng đến backend, data và AI. Đó là những phần người
            dùng ít khi nhìn thấy, nhưng quyết định một sản phẩm có đáng tin hay
            không.
          </p>
          <p>
            Mình đang học năm 3 và thực hiện một dự án nghiên cứu khoa học. Mình
            vẫn còn nhiều điều phải học, và trang này là nơi mình ghi lại những
            gì mình làm được trên đường đi.
          </p>
        </div>

        <dl className="divide-y divide-line rounded-2xl border border-line bg-surface px-6">
          {facts.map(({ term, detail }) => (
            <div
              key={term}
              className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4"
            >
              <dt className="text-ink-2">{term}</dt>
              <dd className="font-medium">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
