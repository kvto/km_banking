"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation';


const Authform = ({ type }: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            //Sign up with appwrite and create plaid token

            if(type === "sign-up"){
                
                const newUser = await signUp(data)
                setUser(newUser)
            }

            if(type === "sign-in"){
                 const response = await signIn({
                     email: data.email,
                     password: data.password
                 })

                 if(response) router.push("/")
        }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/"
            className='cursor-pointer flex items-center gap-1'>
                <Image 
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Vertical logo"/>
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                  Vertical
                </h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user
                    ? "Link Account"
                    : type === "sign-in"
                        ? "Ingresar"
                        : "Registrar"}
                <p className="text-16 font-normal text-gray-600">
                    {user
                    ? "Link en tu cuenta para comenzar"
                    : "Por favor ingresar sus detalles"}
                </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/*Plaidlink */}
            </div>
        ) : (
            <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
                {type === "sign-up" && (
                        <>
                        <div className='flex gap-4'>
                         <CustomInput control={form.control} name="firstName" label="Nombres" placeholder="Ingresa sus nombres"/>
                        <CustomInput control={form.control} name="lastName" label="Apellidos" placeholder="Ingresa sus apellidos"/>
                        </div>
                        <CustomInput control={form.control} name="address1" label="Direccion" placeholder="Ingresa su direccion"/>
                        <CustomInput control={form.control} name="city" label="Ciudad" placeholder="Ingresa su ciudad"/>
                        <div className='flex gap-4'>
                        <CustomInput control={form.control} name="state" label="Estado" placeholder="Ejemplo: PU"/>
                        <CustomInput control={form.control} name="postalCode" label="Codigo Postal" placeholder="ejemplo: 11101"/>
                        </div>
                        <div className='flex gap-4'>
                        <CustomInput control={form.control} name="dateOfBirth" label="Fecha de nacimiento" placeholder="YYYY-MM-DD"/>
                        <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Ejemplo: 1234"/>   
                        </div>
                        </>
                    )
                }
                <CustomInput control={form.control} name="email" label="Correo electronico" placeholder="Ingrese tu correo electronico"/>
                <CustomInput control={form.control} name="password" label="Contraseña" placeholder="Ingrese tu contraseña"/>
                
                <div className='flex flex-col gap-4'>
                <Button type="submit" disabled={isLoading} className='form-btn'>
                    {isLoading ? (
                       <>
                       <Loader2 size={20}
                       className='animate-spin' /> &nbsp;
                       Cargando...
                       </> 
                    ): type === "sign-in" ? "Ingresar" : "Registrarse"}
                </Button>    
                </div>
            </form>
            </Form>

            <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>
                      {type === "sign-in" ? "No tienes cuenta?" : "Ya tienes una cuenta?"}  
                    </p>
                    <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className='form-link'>
                        {type === "sign-in" ? "Registrar" : "Ingresar"}
                    </Link>
            </footer>
            </>
        )}
    </section>
  )
}

export default Authform