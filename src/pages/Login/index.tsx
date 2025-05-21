import Logo from '@/assets/img/business/logo-horizontal-color.svg';
import { Button } from '@/components/Button/Button';
import { Flash } from '@/components/flashMessage/Flash';
import { Hero } from '@/components/Hero/Hero';
import { Input } from '@/components/Input/Input'
import { useLogin } from '@/hooks/auth/login/useLogin';
import { useViewport } from '@/utils/ViewportBool';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login () {

  const [access, setAccess] = useState('');
  const [password, setPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState<'password' | 'text'>('password');
  const [selectedType, setSelectedType] = useState('');
  const [errors, setErrors] = useState<{ access?: string; password?: string }>({});
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { viewer } = useViewport(920);

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
    if (e) e.preventDefault(); // previne reload da página no submit
    
    const newErrors: typeof errors = {};

    if (!access.trim()) newErrors.access = 'É necessário informar um acesso';
    if (!password.trim()) newErrors.password = 'Por favor, preencha sua senha';
    if (isCrm && !selectedType) newErrors.access = 'É necessário informar a UF do CRM';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const success = await login(isCrm ? `${access}-${selectedType}` : access, password);
    
    if (success) {
      navigate('/home');
    }

    if (error) {
      setLoginError(error);
    }
  };

  return (
    <div className="flex items-stretch h-dvh bg-primary-50">
      {!viewer[0] && (
      <Hero.Root>
        <Hero.Card className='bg-primary-600'></Hero.Card>
        <Hero.Card className='bg-primary-700'></Hero.Card>
        <Hero.Card className='bg-primary-800'></Hero.Card>
      </Hero.Root>
      )}
      <div className="relative flex-1 p-3 bg-primary-50 flex flex-col items-center justify-between">
        <div className="p-5"></div>
        <form
          onSubmit={prepareLogin}
          className="relative px-4 md:p-0 flex flex-col gap-10 sm:gap-8 w-full sm:max-h-dvh max-w-[369px]"
        >
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
                text='Acesso' />
              <Input.Field
                value={access}
                onChange={handleInputAccess}
                placeholder='Insira seu CRM ou usuário'>
                {isCrm && (
                  <Input.Slot>
                    <Input.SelectTrigger
                      value={selectedType}
                      onChange={setSelectedType}
                      placeholder='UF'>
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
                text='Senha' />
              <Input.Field
                value={password}
                type={togglePassword}
                onChange={handleInputPassword}
                placeholder='Sua senha aqui'>
                <div
                  onClick={() => setTogglePassword(prev => prev === 'password' ? 'text' : 'password')}
                  className="p-2 rounded-md hover:bg-zinc-100 cursor-pointer transition">
                  <Icon style={{ fontSize: 18 }} icon={togglePassword === 'password' ? 'tabler:eye-off' : 'tabler:eye'} />
                </div>
              </Input.Field>
              {errors.password && <Input.Message text={errors.password} />}
            </Input.Root>
            <div className="">
              <Link to="/recover" className='text-primary-500 hover:text-primary-600 hover:underline transition'>Esqueceu sua senha?</Link>
            </div>
            <Button.Root type="submit">
              {loading && <Button.Loading />}
              <Button.Text>{loading ? 'Entrando...' : 'Entrar'}</Button.Text>
            </Button.Root>
            {loginError &&
              <Flash.Root onClose={() => setLoginError(null)} className='absolute top-full mt-3' variant="error">
                <Flash.Text textElement={<p>{error}</p>} />
              </Flash.Root>}
          </div>
        </form>
        <div className="p-5"></div>
      </div>
    </div>
  );
}
