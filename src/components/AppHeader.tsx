import { LogoLockup } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NotificationsBell } from "./NotificationsBell";
import { useAuth } from "@/lib/auth";

export function AppHeader() {
  const { user } = useAuth();
  return (
    <header className="bg-navy-gradient">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <LogoLockup />
        <div className="flex items-center gap-1">
          <LanguageSwitcher variant="dark" />
          {user && <NotificationsBell />}
        </div>
      </div>
    </header>
  );
}
