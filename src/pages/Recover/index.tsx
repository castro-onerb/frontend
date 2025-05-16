import Logo from '@/assets/img/business/logo-horizontal-color.svg';
import { Hero } from "@/components/Hero/Hero";
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input'
import { useViewport } from '@/utils/ViewportBool';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Recouver() {
  return (
    <div className="flex items-stretch h-screen bg-primary-50">
      <Hero.Root>
        <Hero.Card className='bg-primary-600'></Hero.Card>
      </Hero.Root>
      <div className="relative flex-1 p-3 bg-primary-50 flex flex-col items-center justify-center">
                <div className="relative px-4 md:p-0 flex flex-col gap-10 sm:gap-8 w-full sm:max-h-dvh max-w-[369px]">
          <div
            className='flex'>
            <img
              src={Logo}
              className='w-40 h-15' />
          </div>
          <div
            className='relative flex flex-col gap-3'>
            <Input.Root>
              <Input.Label
                text='E-mail de recuperação' />
              <Input.Field
                placeholder='Forneça seu e-mail aqui para localizarmos seu acesso'>
              </Input.Field>
              {/* {errors.access && <Input.Message text={errors.access} />} */}
            </Input.Root>
            <div className="">
              <a href="/" className='text-primary-500 hover:text-primary-600 hover:underline transition'>Lembrou? Que tal fazer login agora?</a>
            </div>
            <Button.Root>
              <Button.Text>Entrar</Button.Text>
              {/* {loading && <Button.Loading />} */}
            </Button.Root>
            {/* {error &&
              <div className="absolute w-full top-full mt-3 p-2 py-3 border-l-2 border-red-500">
                <p className='text-sm text-red-700'>{error}</p>
              </div>} */}
          </div>
        </div>
      </div>
    </div>
  )
}
