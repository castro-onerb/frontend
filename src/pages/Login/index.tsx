import Logo from '@/assets/img/business/logo-horizontal-color.svg';
import { Button } from '@/components/Button/Button';
import { Hero } from '@/components/Hero/Hero';
import { Input } from '@/components/Input/Input'
import { useLogin } from '@/hooks/useLogin';
import { useViewport } from '@/utils/ViewportBool';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login () {

  const [access, setAccess] = useState('');
  const [password, setPassword] = useState('');
  const [togglePassword, setTogglePassword] = useState<'password' | 'text'>('password');
  const [selectedType, setSelectedType] = useState('');
  const [errors, setErrors] = useState<{ access?: string; password?: string }>({});
  const navigate = useNavigate();

  const { viewer } = useViewport(900);

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

  const prepareLogin = async () => {
    const newErrors: typeof errors = {};

    if (!access.trim()) newErrors.access = 'É necessário informar um acesso';
    if (!password.trim()) newErrors.password = 'Por favor, preencha sua senha';
    if (isCrm && !selectedType) newErrors.access = 'É necessário informar o UF do CRM';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const success = await login(isCrm ? `${access}-${selectedType}` : access, password);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="flex items-stretch h-screen bg-primary-50">
      {!viewer[0] && (
      <Hero.Root>
        <Hero.Card className='bg-primary-600'></Hero.Card>
        <Hero.Card className='bg-primary-700'></Hero.Card>
        <Hero.Card className='bg-primary-800'></Hero.Card>
      </Hero.Root>
      )}
      <div className="relative flex-1 p-3 bg-primary-50 flex flex-col items-center justify-between">
        <div className="p-5"></div>
        <div className="relative flex flex-col gap-10 sm:gap-8 w-full sm:max-h-full max-w-[369px]">
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
              <a href="#" className='text-primary-500 hover:text-primary-600 hover:underline transition'>Esqueceu sua senha?</a>
            </div>
            <Button.Root onClick={prepareLogin}>
              <Button.Text>{loading ? 'Entrando...' : 'Entrar'}</Button.Text>
              {loading && <Button.Loading />}
            </Button.Root>
            {error &&
              <div className="absolute w-full top-full mt-3 p-2 py-3 border-l-2 border-red-500">
                <p className='text-sm text-red-700'>{error}</p>
              </div>}
          </div>
        </div>
        <div className="p-5"></div>
      </div>
    </div>
  );
}
