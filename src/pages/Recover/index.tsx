import Logo from '@/assets/img/business/logo-horizontal-color.svg';
import { Hero } from "@/components/Hero/Hero";
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input'
import { Link } from 'react-router-dom';
import { useRecover } from '@/hooks/auth/recover/useRecover';
import { useState } from 'react';
import { Flash } from '@/components/flashMessage/Flash';
import { useViewport } from '@/utils/ViewportBool';

export default function Recouver() {

  const { step, error, loading, handleRecover, handleReset, handleResendCode } = useRecover();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const { viewer } = useViewport(920);

  const handleSubmit = async () => {
    if (step === 'recover') {
      await handleRecover(email);
    } else if (step === 'reset') {
      await handleReset(email, code, password);
    }
  };

  return (
    <div className="flex items-stretch h-dvh bg-primary-50">
      {!viewer[0] && (
      <Hero.Root>
        <Hero.Card className="bg-primary-600" />
      </Hero.Root>
      )}
      <div className="relative flex-1 p-3 bg-primary-50 flex flex-col items-center justify-center">
        <div className="relative px-4 md:p-0 flex flex-col gap-10 sm:gap-8 w-full sm:max-h-dvh max-w-[369px]">
          <div className="flex">
            <img src={Logo} className="w-40 h-15" />
          </div>

          <div className="relative flex flex-col gap-3">
            {/* EMAIL */}
            {step !== 'reset' && (<Input.Root>
              <Input.Label text="E-mail de recuperação" />
              <Input.Field
                placeholder="Insira seu e-mail aqui"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input.Root>)}

            {/* RESET CODE + PASSWORD */}
            {step === 'reset' && (
              <>
                <Input.Root>
                  <Input.Codes length={6} onChange={(val) => setCode(val)} />
                </Input.Root>

                <Input.Root>
                  <Input.Label text="Nova senha" />
                  <Input.Field
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Input.Root>
              </>
            )}

            {/* LINK */}
            <div>
              <Link to="/" className="text-primary-600 hover:text-primary-700 hover:underline transition">
                Quer fazer login agora?
              </Link>
            </div>  

            {/* BOTÃO */}
            <Button.Root onClick={handleSubmit}>
              {loading && <Button.Loading />}
              <Button.Text>{step === 'recover' ? 'Solicitar' : 'Redefinir senha'}</Button.Text>
            </Button.Root>

            {step === 'reset' && (
              <button
                disabled={loading}
                onClick={() => handleResendCode(email)}
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Não recebi o código
              </button>
            )}

            {/* ERRO */}
            {error && (
              <Flash.Root className='absolute top-full mt-3' variant="error">
                <Flash.Text textElement={<p>{error}</p>} />
              </Flash.Root>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
