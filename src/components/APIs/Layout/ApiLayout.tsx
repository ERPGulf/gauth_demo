
import { Outlet } from 'react-router-dom';
import { useTheme } from "@/components/theme-provider";
import LogoDark from "@/assets/Claudion Reverse Logo-DARK.png";
import LogoLight from "@/assets/Claudion Main Logo-LIGHT.png";
import swirl from "@/assets/Swerl.svg";
import ThemeToggle from "@/components/ThemeToggle";

function ApiLayout() {

    const { theme } = useTheme();
    const _logo = theme === "dark" ? LogoDark : LogoLight;

    return (
        <main className="no_scrollbar flex h-screen w-screen flex-1 flex-col items-center gap-4 overflow-y-scroll bg-white py-10 dark:bg-primary">
            <div className="absolute right-10 top-10 z-20 hidden md:block">
                <ThemeToggle />
            </div>
            <div className="relative flex min-h-28 w-11/12 items-center justify-center md:w-[525px]">
                {/* swirl */}
                <img
                    src={swirl}
                    alt="logo"
                    className="absolute left-36 -z-0 min-w-[900px] -translate-x-1/2"
                />
                {/* logo */}
                <img
                    src={_logo}
                    alt="logo"
                    className="absolute left-1/2 size-44 z-10 -translate-x-1/2 object-contain md:left-32"
                />

                <div className="absolute right-0 md:hidden">
                    <ThemeToggle />
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </main>
    );

}

export default ApiLayout;