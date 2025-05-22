import LogoSymbol from "@/assets/img/business/logo-symbol-color.svg";
import { Hero } from "@/components/Hero/Hero";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input"
import { Link, useNavigate } from "react-router-dom";
import { useRecover } from "@/hooks/auth/recover/useRecover";
import { useState } from "react";
import { Flash } from "@/components/flashMessage/Flash";
import { Container } from "@/components/ContainerForm/Container";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePassword } from "@/hooks/auth/validations/usePassword";

export default function Recover() {

  const navigate = useNavigate();
  const { step, metadata, setMetadata, loading, handleRecover, handleReset, handleResendCode } = useRecover();

  const [togglePassword, setTogglePassword] = useState<"password" | 'text'>('password');
  const [errors, setErrors] = useState<{ email?: string; code?: string; password?: string, confirmPassword?: string }>({});

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { validate, errors: passwordErrors } = usePassword();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Informe seu e-mail';
    }

    if (step === "reset") {
      if (!code.trim()) {
        newErrors.code = 'Informe o código recebido';
      }
      const isValid = validate(password);

      console.log(isValid);
      if (!isValid) {
        setErrors({ ...errors, ...passwordErrors });
        return;
      }
      if (!password.trim()) {
        newErrors.password = 'Informe a nova senha';
      } else if (password.length < 6) {
        newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      }
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirme a nova senha';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (step === "recover") {
      await handleRecover(email);
    } else if (step === "reset") {
      await handleReset(email, code, password);
    }

    if (step === "done") {
      navigate('/');
    }
  };

  return (
    <div className="flex items-stretch h-dvh bg-white">
      <Hero.Root className="md:m-5 md:rounded-3xl">
        <Hero.Card className="w-full h-full overflow-hidden bg-primary-500" />
      </Hero.Root>
      <Container.Root className="md:justify-center">
        <div className="relative flex flex-col gap-3 w-full">
          <div className="flex justify-center md:justify-end w-full max-w-[440px] mx-auto">
            <img src={LogoSymbol} />
          </div>
          <form
            onSubmit={handleSubmit}
            className="relative px-4 md:p-0 flex flex-col gap-6 w-full max-w-[440px] mx-auto"
          >
          <div
          className="flex flex-col gap-2">
          <h1
            className="px-16 md:px-0 font-semibold leading-6 md:leading-12 text-[20px] md:text-[44px] text-center md:text-right text-neutral-500">Recuperar acesso</h1>
            <div className="">
              <p
                className="text-center md:text-right font-medium text-sm md:text-xl text-neutral-500">Informe seu e-mail e nós cuidamos do resto.
              </p>
            </div>
        </div>
          <div
            className="relative flex flex-col gap-3">
          {metadata && (
            <Flash.Root onClose={() => setMetadata(null)} variant={metadata.success ? 'success' : 'error'}>
              <Flash.Text textElement={<p>{metadata.message}</p>} />
            </Flash.Root>
          )}
          {step !== "reset" && (<Input.Root>
            <Input.Label text="E-mail de recuperação" />
            <Input.Field
              name="email"
              placeholder="Insira seu e-mail aqui"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <Input.Message text={errors.email} />}
          </Input.Root>)}
          {step === "reset" && (
            <>
              <Input.Root>
                <Input.Codes
                  length={6}
                  onChange={(val) => setCode(val)}
                  name="code"
                  autoFocus
                />
                {errors.code && <Input.Message text={errors.code} />}
              </Input.Root>
              <button
                disabled={loading}
                onClick={() => handleResendCode(email)}
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Não recebi o código
              </button>

              <Input.Root>
                <Input.Label text="Nova senha" />
                <Input.Field
                  name="password"
                  type={togglePassword}
                  placeholder="Exemplo: @1Senhaforte3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                <div
                  onClick={() => setTogglePassword(prev => prev === "password" ? "text" : "password")}
                  className="mr-1 p-2 rounded-md bg-primary-500 hover:bg-primary-600 cursor-pointer transition">
                  <Icon className="text-white" style={{ fontSize: 18 }} icon={togglePassword === "password" ? "tabler:eye-off" : "tabler:eye"} /></div>
                </Input.Field>
                {errors.password && <Input.Message text={errors.password} />}
              </Input.Root>
              <Input.Root>
                <Input.Label text="Confirme a nova senha" />
                <Input.Field
                  name="password"
                  type={togglePassword}
                  placeholder="Repita a nova senha aqui"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                >
                <div
                  onClick={() => setTogglePassword(prev => prev === "password" ? "text" : "password")}
                  className="mr-1 p-2 rounded-md bg-primary-500 hover:bg-primary-600 cursor-pointer transition">
                  <Icon className="text-white" style={{ fontSize: 18 }} icon={togglePassword === "password" ? "tabler:eye-off" : "tabler:eye"} /></div>
                </Input.Field>
                {errors.confirmPassword && <Input.Message text={errors.confirmPassword} />}
              </Input.Root>
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                <p className="flex text-neutral-600 text-sm items-center gap-3">A senha deve ter no mínimo 6 caracteres, incluir pelo menos um caractere especial, uma letra maiúscula e não conter números sequenciais.</p>
              </div>
            </>
          )}
          <div className="flex justify-between flex-col md:flex-row">
            <Link to="/" className="text-primary-600 hover:text-primary-700 hover:underline transition">
              Quer fazer login agora?
            </Link>
            <Button.Root type="submit" className="w-auto md:flex-none">
              {loading && <Button.Loading />}
              <Button.Text>{step === "recover" ? "Solicitar" : "Redefinir senha"}</Button.Text>
            </Button.Root>
          </div>
          
          </div>
          </form>
        </div>
      </Container.Root>
    </div>
  )
}
