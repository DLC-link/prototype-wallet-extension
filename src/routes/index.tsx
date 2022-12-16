import React from 'react'
import {
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { PopupHandler } from '../background/PopupHandler'
import ContractDetailPage from '../components/pages/ContractDetail'
import HomePage from '../components/pages/HomePage'
import Root from '../components/root'

const routes = (
  <Root>
    <MemoryRouter>
      <PopupHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contractdisplay/:contractId/:wallet"
          element={<ContractDetailPage />}
        />
      </Routes>
    </MemoryRouter>
  </Root>
)

export default routes
