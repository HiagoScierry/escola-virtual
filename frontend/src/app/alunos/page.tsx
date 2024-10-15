/* eslint-disable @next/next/no-img-element */
"use client";
import { faker } from "@faker-js/faker";
import LoggedLayout from "@/components/loggedLayout/page";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUsers, TGetUsersResponse } from "@/services/getUsers";

export default function Alunos() {
  const [users, setUsers] = useState<TGetUsersResponse>([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
      <LoggedLayout>
      <div className="flex flex-col w-full h-full p-8 overflow-scroll">
          <h1 className="text-3xl mb-4 border-b-2 border-gray-600">Alunos</h1>
          <ul role="list" className="divide-y divide-gray-500">
            {users?.map((person) => (
              <li
                key={person.email}
                className="flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt={person.name}
                    src={faker.image.avatar()}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{person.isAdmin ? "Administrador" : "Usuario Padrão"}</p>
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">Online</p>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </LoggedLayout>
    );
}
