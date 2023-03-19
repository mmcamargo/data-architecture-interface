import { Access, Home } from '@/pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppRoutes(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Access />}></Route>
				<Route path='/home' element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
