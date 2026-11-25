import { ProfileCard } from "@/components/profile-card";

export function About() {
  return (
    <section
      id="gioi-thieu"
      aria-labelledby="gioi-thieu-tieu-de"
      className="border-t border-line"
    >
      <div className="shell grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[22rem_1fr] lg:gap-16 xl:grid-cols-[26rem_1fr] xl:gap-24">
        <div className="lg:order-last">
          <h2
            id="gioi-thieu-tieu-de"
            className="font-display text-5xl leading-[1.1] font-bold md:text-7xl"
          >
            Giới thiệu
          </h2>

          <p className="mt-8 text-2xl leading-snug font-medium text-pretty md:text-3xl xl:text-4xl xl:leading-snug">
            Mình thích{" "}
            <span className="text-highlight">
              những thứ liên quan đến logic.
            </span>{" "}
            Gặp một vấn đề rối, mình muốn tách nó thành từng phần nhỏ, hiểu từng
            phần hoạt động ra sao rồi ghép lại cho chạy đúng.
          </p>

          <div className="mt-8 grid max-w-[75ch] gap-5 text-lg text-pretty xl:text-xl">
            <p>
              Vì vậy mình hướng đến backend, data và AI. Đó là những phần người
              dùng ít khi nhìn thấy, nhưng quyết định một sản phẩm có đáng tin
              hay không.
            </p>
            <p>
              Mình đang học năm 3 và thực hiện một dự án nghiên cứu khoa học.
              Mình vẫn còn nhiều điều phải học, và trang này là nơi mình ghi lại
              những gì mình làm được trên đường đi.
            </p>
          </div>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
}
