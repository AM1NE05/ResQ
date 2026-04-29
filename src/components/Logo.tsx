import logoImg from "@/assets/resq-logo.png";

export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return <img src={logoImg} alt="ResQ Najda" className={`${className} object-contain`} />;
}

export function LogoLockup({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo className="h-9 w-9" />
      <span className="text-lg font-extrabold tracking-tight text-navy-foreground">
        ResQ <span className="text-emergency">نجدة</span>
      </span>
    </div>
  );
}
