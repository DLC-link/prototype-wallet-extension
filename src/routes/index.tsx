import React, { FC, useEffect, useState } from 'react'
import {
  MemoryRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import ContractDetailPage from '../components/pages/ContractDetail'
import HomePage from '../components/pages/HomePage'
import AcceptOfferPage from '../components/pages/OfferInput'
import SignInputPage from '../components/pages/SignInput'
import Root from '../components/root'
import { LocalRepository } from '../persistence/localRepository'

const locationStore = new LocalRepository()

// When the extension loses focus, the navigation is lost which is impractical.
// To circumvent that this component saves the location and reloads it.
const LocationHandler: FC = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const [isInit, setIsInit] = useState(false)
  useEffect(() => {
    async function locationCb() {
      if (!isInit) {
        const savedLocation = await locationStore.getLocation()
        if (savedLocation && savedLocation !== location.pathname) {
          navigate(savedLocation)
        }
        setIsInit(true)
      }
      locationStore.saveLocation(location.pathname)
    }
    locationCb()
  }, [location, navigate, isInit])
  return <></>
}

const routes = (
  <Root>
    <MemoryRouter>
      <LocationHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/acceptoffer" element={<AcceptOfferPage />} />
        <Route
          path="/contractdisplay/:contractId"
          element={<ContractDetailPage />}
        />
        <Route path="/signinput" element={<SignInputPage />} />
      </Routes>
    </MemoryRouter>
  </Root>
)

export default routes
