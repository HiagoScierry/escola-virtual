import SideMenu from "../side-menu/page";

export default function LoggedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex justify-start items-center w-screen h-screen">
            <SideMenu />
            {children}
        </main>
    );

}