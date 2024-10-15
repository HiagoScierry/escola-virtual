"use client";
import LoggedLayout from "@/components/loggedLayout/page";

export default function Dashboard() {
  return (
    <LoggedLayout>
      <div className="flex flex-col w-full h-full p-8 overflow-scroll">
        <h1 className="text-3xl">Bem-vindo !</h1>
        <h2 className="text-xl">Utilize a barra lateral para navegação.</h2>

        <p className="text-base">Desenvolvido por Hiago Moreira - 2018207176</p>
      </div>
    </LoggedLayout>
  );
}
