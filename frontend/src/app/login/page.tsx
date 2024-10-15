'use client'
import { makeLogin } from '@/services/makeLogin';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  localStorage.clear();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handlerLogin = async () => {
    try {
        const data = loginSchema.parse(form);

        const response = await makeLogin(data.email, data.password);

        if(response.id){
          localStorage.setItem('user', JSON.stringify(response));
          window.location.href = '/dashboard';
        }

    } catch (error) {
        alert('Email ou senha inválidos');
    }

  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Marca_Ufes_SVG.svg/400px-Marca_Ufes_SVG.svg.png"
          alt="LogoUFES"
          width={200}
          height={200}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
                </label>
                <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-800 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                </label>

                </div>
                <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-800 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div>
                <button
                  onClick={() => handlerLogin()}
                  className="flex w-full justify-center rounded-md bg-cyan-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
                  >
                  Entrar
                  </button>
            </div>
            </div>
      </div>
    </div>
  );
}