import Image from "next/image";
import Link from "next/link";

export default function SideMenu(){
    return (
        <div className="flex flex-col w-1/4 h-screen bg-sky-900 overflow-auto">
            <div className="flex items-center justify-center h-28 bg-sky-950">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Marca_Ufes_SVG.svg/400px-Marca_Ufes_SVG.svg.png"
                    alt="LogoUFES"
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex flex-col items-center justify-start h-full mt-4 gap-4 text-white m-2">
                <Link href="/dashboard" className="border-b-2 w-11/12 hover:bg-sky-950 p-4">
                    Inicio
                </Link>
                <Link href="/alunos" className="border-b-2 w-11/12 hover:bg-sky-950 p-4">
                    Alunos
                </Link>
                <Link href="/cursos" className="border-b-2 w-11/12 hover:bg-sky-950 p-4">
                    Cursos
                </Link>
                <Link href="/meuscursos" className="border-b-2 w-11/12 hover:bg-sky-950 p-4">
                    Meus Cursos
                </Link>
            </div>

            <div className="flex flex-col items-center justify-end h-full mt-4 gap-4 text-white m-2">
                <Link href="/login" className="text-white border-b-2 w-11/12 hover:bg-sky-950 p-4">
                    Sair
                </Link>
            </div>
        </div>
    );
}