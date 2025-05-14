import Logo from '@/assets/img/business/logo-horizontal-color.svg'
import { Input } from '@/components/Input/Input'
import { useLogin } from '@/hooks/useLogin';
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
    <div
      className='bg-primary-500 h-dvh flex items-center justify-center'>
      <div
        className='p-10 bg-white sm:rounded-2xl sm:shadow-2xl w-full h-dvh sm:h-auto sm:max-h-full sm:max-w-[369px] flex items-center justify-center'>
        <div
          className='flex flex-col gap-10 sm:gap-8 w-full'>
          <div
            className='flex'>
            <img
              src={Logo}
              className='w-40 h-15' />
          </div>
          {loading && 'Carregando...'}
          <div
            className='flex flex-col gap-3'>
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
                  className="h-full px-2 py-1 rounded-md hover:bg-zinc-100 cursor-pointer transition">
                  <Icon style={{ fontSize: 18 }} icon={togglePassword === 'password' ? 'tabler:eye-off' : 'tabler:eye'} />
                </div>
              </Input.Field>
              {errors.password && <Input.Message text={errors.password} />}
            </Input.Root>
            <button
              onClick={prepareLogin}
              className='p-2 bg-primary-500 hover:bg-primary-600 rounded-lg font-medium text-white cursor-pointer transition'>
              Entrar
            </button>
            {error &&
              <div className="p-2 border-l-2 border-red-500">
                <p className='text-sm text-red-700'>{error}</p>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
