import React, { FC, useEffect, useState } from 'react';
import {
  MemoryRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export const PopupHandler: FC = () => {
  const navigate = useNavigate();

  console.log('adding listener inside popuphdnaler:')
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender);
    if (request.action == 'get-offer') navigate('/acceptoffer')
    sendResponse('ok')
  })

  return <></>
}
