import LogoSymbol from '@/assets/img/business/logo-symbol-color.svg';
import { Button } from '@/shared/components/Button/Button';
import { Container } from '@/shared/components/ContainerForm/Container';
import { Flash } from '@/shared/components/flashMessage/Flash';
import { Hero } from '@/shared/components/Hero/Hero';
import { Icon } from '@/shared/components/Icon/Icon';
import { Input } from '@/shared/components/Input/Input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';

export default function Login () {

  const [access, setAccess] = useState('');
  const [password, setPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState<'password' | 'text'>('password');
  const [crmUF, setCrmUF] = useState('');
  const [errors, setErrors] = useState<{ access?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const ufs = [
    'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RO', 'RR', 'RS', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleInputAccess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccess(e.target.value);
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isCrm = /^[0-9]/.test(access);
  const { login, loading, error } = useLogin(isCrm ? 'medical' : 'operator');

  const prepareLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setLoginError(null);

    const newErrors: typeof errors = {};

    if (!access.trim()) newErrors.access = 'É necessário informar um acesso';
    if (!password.trim()) newErrors.password = 'Por favor, preencha sua senha';
    if (isCrm && !crmUF) newErrors.access = 'É necessário informar a UF do CRM';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const success = await login(isCrm ? `${access}-${crmUF}` : access, password);

    if (success) {
      void navigate('/');
    }

    if (!success) {
      setLoginError(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-stretch h-dvh bg-white">
      <Hero.Root className='md:m-5 md:rounded-3xl'>
        <Hero.Card className="w-full h-full overflow-hidden bg-primary-500"></Hero.Card>
        <Hero.Card className="w-full h-full overflow-hidden bg-primary-600"></Hero.Card>
        <Hero.Card className="w-full h-full overflow-hidden bg-primary-700"></Hero.Card>
      </Hero.Root>
      <Container.Root className="justify-center">
        <div className="flex justify-center md:justify-end w-full max-w-[440px] mx-auto">
          <img
            src={LogoSymbol} />
        </div>
        <form
          onSubmit={(e) => void prepareLogin(e)}
          className="relative px-4 md:p-0 flex flex-col gap-10 sm:gap-8 w-full max-w-[440px] mx-auto"
        >
          <div
            className="flex flex-col gap-2">
            <h1
              className="px-16 md:px-0 font-semibold leading-6 md:leading-12 text-[20px] md:text-[44px] text-center md:text-right text-neutral-500">Bem-vindo ao seu espaço de cuidado</h1>
            <p
              className="text-center md:text-right font-medium text-sm md:text-xl text-neutral-500">Conecte-se para continuar sua jornada
            </p>
          </div>
          <div
            className="relative flex flex-col gap-3">
          {loginError &&
            <Flash.Root onClose={() => setLoginError(null)} className="" variant="error">
              <Flash.Text textElement={<p>{error}</p>} />
            </Flash.Root>}
            <Input.Root>
              <Input.Label
                text="Acesso" />
              <Input.Field
                value={access}
                onChange={handleInputAccess}
                placeholder="Insira seu CRM ou usuário">
                {isCrm && (
                  <Input.Slot>
                    <Input.SelectTrigger
                      value={crmUF}
                      onChange={setCrmUF}
                      placeholder="UF">
                      <Input.SelectBox>
                        {ufs.map(uf => (
                          <Input.SelectItem
                          key={uf}
                          value={uf}>{uf}</Input.SelectItem>
                        ))}
                      </Input.SelectBox>
                    </Input.SelectTrigger>
                  </Input.Slot>
                )}
              </Input.Field>
              {errors.access && <Input.Message text={errors.access} />}
            </Input.Root>
            <Input.Root>
              <Input.Label
                text="Senha" />
              <Input.Field
                value={password}
                type={togglePassword}
                onChange={handleInputPassword}
                placeholder="Sua senha aqui">
                <div
                  onClick={() => setTogglePassword(prev => prev === 'password' ? 'text' : 'password')}
                  className="mr-1 p-2 rounded-md bg-primary-500 hover:bg-primary-600 cursor-pointer transition">
                  <Icon
                    className="text-white"
                    size={18}
                    name={togglePassword === 'password' ? 'eye-off' : 'eye'} />
                </div>
              </Input.Field>
              {errors.password && <Input.Message text={errors.password} />}
            </Input.Root>
            <div className="flex justify-between flex-col md:flex-row">
              <Link to="/recover" className="text-primary-500 hover:text-primary-600 hover:underline transition">Esqueceu sua senha?</Link>
              <Button.Root type="submit" className="flex-1 md:flex-none" loading={loading}>
                <Button.Text>{loading ? 'Entrando...' : 'Entrar'}</Button.Text>
              </Button.Root>
            </div>
          </div>
        </form>
        <div className="p-5"></div>
      </Container.Root>
    </div>
  );
}
