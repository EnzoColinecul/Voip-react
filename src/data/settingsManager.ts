import clone from 'clone'
import deepmerge from 'deepmerge'
import { clearStorage, getStorage, setStorage } from './storage';

declare global {
  interface Window { SETTINGS: any }
}


const DEFAULT_SIP_DOMAIN = '192.168.1.105'

const DEFAULT_SETTINGS =
{
  'display_name': null,
  uri: null,
  password: null,
  socket:
  {
    uri: 'wss://192.168.1.105',
    'via_transport': 'auto'
  },
  'registrar_server': null,
  'contact_uri': null,
  'authorization_user': null,
  'instance_id': null,
  'session_timers': true,
  'use_preloaded_route': false,
  pcConfig:
  {
    rtcpMuxPolicy: 'negotiate',
    iceServers:
      [
        { urls: ['stun:stun.l.google.com:19302'] }
      ]
  },
  callstats:
  {
    enabled: false,
    AppID: null,
    AppSecret: null
  }
};

let settings: any;

settings = getStorage();

if (settings) {
  console.log('configuracion encontrada en localStorage');
}

if (window.SETTINGS) {
  settings = deepmerge(
    window.SETTINGS,
    settings || {},
    { arrayMerge: (destinationArray, sourceArray) => sourceArray })
}

if (!settings) {
  settings = clone(DEFAULT_SETTINGS, false)
}


export const getSettings = () => {
  return settings;
}

export const setSettings = (newSettings: object) => {
  setStorage(newSettings);
  settings = newSettings;
}

export const clearSettings = () => {
  clearStorage();
  settings = clone(DEFAULT_SETTINGS, false);
}

export const isReady = () => {
  return Boolean(settings.uri);
}

export const getDefaultDomain = () => {
  return DEFAULT_SIP_DOMAIN;
}