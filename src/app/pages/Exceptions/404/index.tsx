export default function NotFound404() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='text-center'>
				<h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
				<h2 className='text-2xl font-semibold text-gray-600 mb-4'>
					Página não encontrada
				</h2>
				<p className='text-gray-500 mb-8'>
					A página que você está procurando não existe.
				</p>
				<a
					href='/'
					className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors'
				>
					Voltar ao início
				</a>
			</div>
		</div>
	);
}
