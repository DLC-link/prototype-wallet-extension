import React, { FC, useEffect, useState } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import {
  MemoryRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSnackbar } from '../../providers/Snackbar'
import { dlcActionError, offerRequest } from '../../store/dlc/actions'
import { ApplicationState } from '../../store'
import { RequestInterface } from '../background';


const useSelector: TypedUseSelectorHook<ApplicationState> = useReduxSelector;

export const PopupHandler: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dlcError = useSelector((state) => state.dlc.error);
  const success = useSelector((state) => state.dlc.actionSuccess);
  const curContractId = useSelector((state) => state.dlc.currentId);
  const [displayError, setDisplayError] = useState(true);
  const [processRequested, setProcessRequested] = useState(false);
  const snackbar = useSnackbar();

  useEffect(() => {
    if (displayError && dlcError) {
      snackbar.createSnack(dlcError, 'error');
      setDisplayError(false);
    }
    dispatch(dlcActionError({ error: '' }))
  }, [displayError, dlcError, snackbar, dispatch]);

  useEffect(() => {
    if (processRequested && success) {
      navigate(`/contractdisplay/${curContractId}`);
      setProcessRequested(false);
    }
  })

  const handleProcessClicked = (message: string): void => {
    setProcessRequested(true);
    dispatch(offerRequest(message));
  }

  chrome.runtime.onMessage.addListener((request: RequestInterface, sender, sendResponse) => {
    if (request.action == 'get-offer-internal') {
      handleProcessClicked(JSON.stringify(request.data));
      sendResponse('[PopUpHandler]: Heard get-offer-internal')
    }
    sendResponse('[PopUpHandler]: Invalid request.action')
  })

  return <></>
}
