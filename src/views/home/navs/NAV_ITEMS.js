import { MdOutlineEco } from 'react-icons/md';
import React from 'react';

export const NAV_ITEMS = [
  {
    label: 'FrogeX',
    href: '#frogex',
    key: 'frogex',
  },
  {
    label: <>Froad<br/>Map</>,
    href: '#froadmap',
    key: 'froadmap',
  },
  {
    label: 'Resources',
    key: 'resources',
    children: [
      {
        label: 'FrogeX GreenPaper',
        subLabel: '',
        href: '/FrogeX-Green-Paper.docx',
        key: 'greenpaper',
      },
      {
        label: 'Foundation Articles',
        subLabel: '',
        href: '/FrogeX-Articles.docx',
        key: 'articles',
      },
      {
        label: 'FAQ Page',
        subLabel: 'Robust Q&A here!',
        href: '/fraq',
        key: 'fraq',
      },
    ],
  },
  {
    label: <>Team<br/>Froge</>,
    href: '/team',
    key: 'team',
  },
  {
    label: <><MdOutlineEco display="inline" color={'green'}>Eco</MdOutlineEco></>,
    href: '/eco',
    key: 'eco',
  },
  {
    label: <>Accounting</>,
    href: '/accounting',
    key: 'accounting',
  },

];
