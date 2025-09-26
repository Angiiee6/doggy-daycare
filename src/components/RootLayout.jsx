import Header from './header.jsx'
import { Outlet } from 'react-router'

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
)

export default RootLayout