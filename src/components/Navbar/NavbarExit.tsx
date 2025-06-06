import { useLogout } from '@/hooks/auth/logout/useLogout';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { useViewport } from '@/utils/ViewportBool';

export function NavbarExit({ label } : { label?: string }) {

  const { viewer } = useViewport(1240);
  const { handleLogout, loading } = useLogout();

  return (
    <Button.Root
      onClick={() => void handleLogout()}
      className='relative flex w-full justify-between'
      variant='outlined'
      color='red'>
      {!viewer[0] && (
        <div className="flex items-center gap-2">
          {loading && <Button.Loading />}
          <Button.Text>
            {label}
          </Button.Text>
        </div>
      )}
      <Icon
        name='exit'
        size={20}
      />
    </Button.Root>
  );
}
