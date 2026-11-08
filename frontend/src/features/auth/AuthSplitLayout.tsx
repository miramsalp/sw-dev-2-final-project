import Image from "next/image";

export function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-full-bleed
      className="flex min-h-[calc(100dvh-63px)] items-center justify-center gap-16 px-4 py-4 font-plex"
    >
      <div className="relative hidden aspect-[606/902] h-[calc(100dvh-95px)] max-h-[902px] shrink-0 xl:block">
        <Image
          src="/images/register-banner.jpg"
          alt=""
          fill
          preload
          sizes="606px"
          className="object-cover"
        />
      </div>
      {children}
    </div>
  );
}
