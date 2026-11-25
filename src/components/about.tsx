import { ProfileCard } from "@/components/profile-card";

const highlights = [
  { value: "Năm 3", label: "Công nghệ thông tin Việt – Nhật, UIT" },
  { value: "3 hướng", label: "Backend, data và AI" },
  { value: "1 dự án", label: "Nghiên cứu khoa học, đang phát triển" },
];

export function About() {
  return (
    <section
      id="gioi-thieu"
      aria-labelledby="gioi-thieu-tieu-de"
      className="border-t border-line"
    >
      <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-[23rem_1fr] lg:gap-16 xl:gap-24">
        <div className="flex flex-col lg:order-last">
          <h2
            id="gioi-thieu-tieu-de"
            className="font-display text-2xl leading-none font-bold text-highlight"
          >
            Giới thiệu
          </h2>

          <p className="mt-6 text-[clamp(1.75rem,3.1vw,3.5rem)] leading-[1.22] font-medium tracking-tight text-pretty">
            Mình thích{" "}
            <span className="text-highlight">
              những thứ liên quan đến logic.
            </span>{" "}
            Gặp một vấn đề rối, mình muốn tách nó thành từng phần nhỏ, hiểu từng
            phần rồi ghép lại cho chạy đúng.
          </p>

          <ul className="mt-12 grid border-t border-line pt-6 max-sm:gap-5 sm:grid-cols-3 sm:divide-x sm:divide-line lg:mt-auto">
            {highlights.map(({ value, label }) => (
              <li key={value} className="sm:px-4 xl:px-6 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-3xl leading-tight font-bold whitespace-nowrap xl:text-5xl xl:leading-tight">
                  {value}
                </p>
                <p className="mt-1 text-sm text-pretty text-ink-2">{label}</p>
              </li>
            ))}
          </ul>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
}
